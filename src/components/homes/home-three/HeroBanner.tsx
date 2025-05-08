"use client";
import { useState, useEffect, useRef } from "react";
import Lottie from "lottie-react";
import animationData from "../../../../public/speech.json";
import loaderAnimationData from "../../../../public/loader.json";
import phone from "../../../../public/phone.mp3";
import { motion } from "framer-motion";

export default function Home() {
  const [messages, setMessages] = useState<
    { user: string; bot: string | null }[]
  >([]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("en");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const [isCalling, setIsCalling] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const ringToneRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<any>(null);
  const recognitionRunningRef = useRef(false);

  useEffect(() => {
    initializeSession();
  }, []);

  useEffect(() => {
    if (sessionId) connectWebSocket();
    return () => wsRef.current?.close();
  }, [sessionId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const initializeSession = async () => {
    let storedSessionId: any = localStorage.getItem("session_id");
    if (!storedSessionId) {
      const userId = localStorage.getItem("user_id") || crypto.randomUUID();
      localStorage.setItem("user_id", userId);

      const res = await fetch("https://nanobk.onrender.com/new_chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId }),
      });

      const data = await res.json();
      if (data.status === "success") {
        storedSessionId = data.session_id;
        localStorage.setItem("session_id", storedSessionId);
        setMessages([]);
      }
    }
    setSessionId(storedSessionId);
  };

  const connectWebSocket = () => {
    const storedSessionId = localStorage.getItem("session_id");
    if (!storedSessionId) return;

    const socket = new WebSocket("wss://nanobk.onrender.com/ws");

    socket.onopen = () => {
      console.log("✅ Connected to WebSocket with session:", storedSessionId);
      socket.send(JSON.stringify({ session_id: storedSessionId }));
    };

    socket.onmessage = (event) => {
      const { response } = JSON.parse(event.data);
      if (response) {
        setIsTyping(false); // ✅ Hide loader when bot response arrives
        animateTyping(response);
        speak(response);
      }
    };

    socket.onclose = () => {
      console.log("❌ WebSocket Disconnected. Reconnecting...");
      setTimeout(connectWebSocket, 2000);
    };

    wsRef.current = socket;
    setWs(socket);
  };

  const sendMessage = (voiceInput?: string) => {
    const messageToSend = voiceInput || input.trim();
    if (!messageToSend || !ws || !sessionId) return;

    speechSynthesis.cancel();

    setMessages((prev) => [
      ...prev,
      { user: messageToSend, bot: null }, // Add user message with empty bot response
    ]);
    setIsTyping(true); // ✅ Show loader immediately after user sends a message
    setInput(""); // Clear input field after sending

    const checkAndSendMessage = () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(
          JSON.stringify({
            session_id: sessionId,
            message: messageToSend,
            language,
          })
        );
      } else {
        console.log("WebSocket is not open yet. Retrying...");
        setTimeout(checkAndSendMessage, 1000);
      }
    };

    checkAndSendMessage();
  };

  const animateTyping = (text: string) => {
    const words = text.split(" ");
    let index = 0;

    setMessages((prev) => [
      ...prev.slice(0, -1),
      { user: prev[prev.length - 1]?.user || "", bot: words[0] }, // Ensure first word is set immediately
    ]);

    index++; // Move to next word

    const interval = setInterval(() => {
      setMessages((prev) => {
        if (index < words.length) {
          return [
            ...prev.slice(0, -1),
            {
              user: prev[prev.length - 1]?.user || "",
              bot: prev[prev.length - 1]?.bot + " " + words[index], // Append words correctly
            },
          ];
        } else {
          clearInterval(interval);
          setIsTyping(false);
          return prev;
        }
      });
      index++;
    }, 50); // Adjust speed if needed
  };

  // const startListening = () => {
  //   if (!("webkitSpeechRecognition" in window)) {
  //     alert("Your browser does not support speech recognition.");
  //     return;
  //   }

  //   if (recognitionRef.current) {
  //     recognitionRef.current.stop(); // Ensure any existing recognition stops
  //   }

  //   const recognition = new (window as any).webkitSpeechRecognition();
  //   recognition.lang = language === "en" ? "en-US" : "ta-IN";
  //   recognition.continuous = true; // 🔹 Keep listening continuously
  //   recognition.interimResults = false;
  //   recognitionRef.current = recognition; // Store globally

  //   setIsListening(true);

  //   recognition.onstart = () => {
  //     speechSynthesis.cancel(); // 🔹 Stop AI speech immediately
  //   };

  //   recognition.onresult = (event: any) => {
  //     const spokenText =
  //       event.results[event.results.length - 1][0].transcript.trim();

  //     if (spokenText) {
  //       speechSynthesis.cancel();
  //       setInput(spokenText);
  //       sendMessage(spokenText); // 🔹 Send only after user finishes speaking
  //     }
  //   };

  //   // recognition.onerror = () => {
  //   //   if (isCalling) {
  //   //     setTimeout(startListening, 1000); // 🔹 Restart if error occurs
  //   //   } else {
  //   //     setIsListening(false);
  //   //   }
  //   // };

  //   // recognition.onend = () => {
  //   //   if (isCalling) {
  //   //     recognition.start(); // 🔹 Keep listening as long as the call is active
  //   //   } else {
  //   //     setIsListening(false);
  //   //   }
  //   // };

  //   recognition.onerror = (event: any) => {
  //     console.warn("Speech recognition error:", event.error);
  //     if (isCalling) {
  //       setTimeout(() => recognition.start(), 1000); // Retry after short delay
  //     } else {
  //       setIsListening(false);
  //     }
  //   };

  //   recognition.onend = () => {
  //     if (isCalling) {
  //       setTimeout(() => recognition.start(), 500); // Keeps listening loop alive
  //     } else {
  //       setIsListening(false);
  //     }
  //   };

  //   recognition.start();
  // };

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    if (recognitionRunningRef.current) {
      console.log("🔁 Already listening. Skipping start.");
      return;
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop(); // Stop old recognition
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = language === "en" ? "en-US" : "ta-IN";
    recognition.continuous = true;
    recognition.interimResults = false;
    recognitionRef.current = recognition;

    recognition.onstart = () => {
      recognitionRunningRef.current = true;
      setIsListening(true);
    };

    recognition.onend = () => {
      recognitionRunningRef.current = false;
      setIsListening(false);

      if (isCalling) {
        setTimeout(() => {
          if (!recognitionRunningRef.current) {
            recognition.start(); // Restart if needed
          }
        }, 500);
      }
    };

    recognition.onerror = (event: any) => {
      console.warn("🎙️ Speech error:", event.error);
      recognitionRunningRef.current = false;
      setIsListening(false);

      if (isCalling) {
        setTimeout(() => {
          if (!recognitionRunningRef.current) {
            recognition.start(); // Retry
          }
        }, 1000);
      }
    };

    recognition.onresult = (event: any) => {
      const spokenText =
        event.results[event.results.length - 1][0].transcript.trim();

      if (spokenText) {
        speechSynthesis.cancel();
        setInput(spokenText);
        sendMessage(spokenText);
      }
    };

    recognition.start();
  };

  const endCall = () => {
    setIsCalling(false);
    setIsListening(false);
    recognitionRunningRef.current = false;

    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }

    speechSynthesis.cancel();

    setMessages((prev) => [
      ...prev,
      { user: "📞 Call ended.", bot: "Call ended. Have a great day!" },
    ]);

    speak("Call ended. Have a great day!");
  };

  const speak = (text: string) => {
    return new Promise((resolve) => {
      // 🔹 Stop any ongoing speech immediately
      speechSynthesis.cancel();
      const sanitizedText = text.replace(/[^\w\s.,!?]/g, "");

      if (!sanitizedText.trim()) {
        resolve(undefined); // 🔹 Don't speak if only emojis/symbols remain
        return;
      }
      // 🔹 Ensure voices are loaded before selecting
      const loadVoices = () => {
        const voices = speechSynthesis.getVoices();
        if (voices.length === 0) {
          setTimeout(loadVoices, 100); // Wait for voices to load
          return;
        }

       
       // Define preferred male voice names (cross-browser, cross-device)
  const preferredMaleVoices = {
    en: [
      "Google US English",            // Chrome (desktop & mobile)
      "Microsoft David Desktop - English (United States)", // Windows
      "en-US-language",              // Android generic
      "English Male"                 // Generic fallback
    ],
    ta: [
      "Google தமிழ்",               // Google Tamil voice
      "ta-IN-language",              // Android generic Tamil
      "Tamil Male"
    ]
  };

  const languageCode = language === "en" ? "en-US" : "ta-IN";

  // Try to find a voice by preferred male name
  const selectedVoice =
    voices.find(
      (v) =>
        v.lang === languageCode &&
        preferredMaleVoices[language].some((name) => v.name.includes(name))
    ) ||
    // Fallback to any voice with matching lang
    voices.find((v) => v.lang === languageCode) ||
    voices[0]; // Final fallback

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = selectedVoice;
        utterance.lang = language === "en" ? "en-US" : "ta-IN";

        utterance.onend = resolve;
        speechSynthesis.speak(utterance);
      };

      loadVoices(); // Start voice loading & speaking process
    });
  };

  const startCall = async () => {
    setIsCalling(true);
    ringToneRef.current = new Audio(phone);
    ringToneRef.current.loop = true;
    ringToneRef.current.play();
    setTimeout(async () => {
      ringToneRef.current?.pause();
      ringToneRef.current = null;

      setMessages((prev) => [
        ...prev,
        {
          user: "📞 Call started...",
          bot: "Hi! I'm Alto, your AI Logistics Assistant.",
        },
      ]);

      await speak(
        "Hi! I'm Alto, your AI Logistics Assistant. How can I assist you?"
      );
      startListening();
    }, 3000);
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}></div>

      {/* GREETING */}
      <div style={styles.greeting}>
        <p style={styles.greetingText}>
          Hi! I&apos;m Alto – your AI Logistics Assistant
        </p>
      </div>

      {/* CURRENT MESSAGE DISPLAY */}
      <div style={styles.chatContainer} ref={chatContainerRef}>
        {messages.length > 0 &&
          (() => {
            const latestMessage = messages[messages.length - 1]; // ✅ Get the last message

            return (
              <motion.div
                key={messages.length - 1}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={styles.messageBlock}
              >
                {/* USER MESSAGE (Centered) */}
                <motion.div
                  style={styles.userMessageContainer}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  <p style={styles.userMessage}>{latestMessage.user}</p>
                </motion.div>

                {/* BOT RESPONSE OR LOADER */}
                <motion.div
                  style={styles.botMessageContainer}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  {isTyping ? (
                    <div style={styles.loaderContainer}>
                      <Lottie
                        animationData={loaderAnimationData}
                        loop={true}
                        autoplay={true}
                        style={{ height: 100, width: 100 }}
                      />
                    </div>
                  ) : (
                    <p style={styles.botMessage}>{latestMessage.bot}</p>
                  )}
                </motion.div>
              </motion.div>
            );
          })()}
      </div>

      {isCalling && (
        <div style={styles.callContainer}>
          {isListening ? (
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
              style={{ height: 60, width: 60 }}
            />
          ) : (
            <motion.button
              style={styles.voiceButton}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={startListening}
            >
              <i className="bi bi-mic" style={{ fontSize: "20px" }}></i>
            </motion.button>
          )}
        </div>
      )}
      <div style={styles.callContainer}>
        {!isCalling ? (
          <motion.button
            style={styles.callButton}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={startCall}
          >
            <i
              className="bi bi-telephone-fill"
              style={{ marginRight: "8px" }}
            ></i>
            Start Call
          </motion.button>
        ) : (
          <button style={styles.endCallButton} onClick={endCall}>
            <i
              className="bi bi-telephone-x-fill"
              style={{ marginRight: "8px" }}
            ></i>
            End Call
          </button>
        )}
      </div>
      {/* INPUT & BUTTONS */}
      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask about your shipment..."
        />
        <button style={styles.sendButton} onClick={() => sendMessage()}>
          <i className="bi bi-arrow-up-right"></i>
        </button>
      </div>
    </div>
  );
}

// 🔹 STYLES
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    marginTop: "100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    color: "#333",
    padding: "10px",
    textAlign: "center",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "600px",
    alignItems: "center",
  },
  backButton: {
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
  },
  title: { fontSize: "20px", fontWeight: "bold" },
  infoButton: {
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
  },
  greeting: { marginTop: "10px" },
  greetingText: { fontSize: "16px", color: "#666" },
  subTitle: { fontSize: "22px", fontWeight: "bold" },
  chatContainer: {
    width: "100%",
    maxWidth: "600px",
    height: "400px",
    padding: "15px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  messageBlock: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
  userMessageContainer: {
    backgroundColor: "#fff",
    color: "#D1FFBD",
    padding: "10px 15px",
    borderRadius: "20px",
    fontSize: "16px",
    maxWidth: "80%",
    textAlign: "center",
  },
  botMessageContainer: {
    // backgroundColor: "#f1f1f1",
    padding: "10px 15px",
    borderRadius: "20px",
    fontSize: "16px",
    maxWidth: "80%",
    textAlign: "center",
  },
  loaderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  // chatContainer: {
  //   width: "100%",
  //   maxWidth: "600px",
  //   height: "400px",
  //   padding: "15px",
  //   overflowY: "auto",
  //   textAlign: "left", // Align text to left
  //   display: "flex",
  //   flexDirection: "column",
  //   /*  backgroundImage:"url('https://homy-next.vercel.app/_next/static/media/ils_01.cffd5363.svg')",
  //   backgroundSize: "cover" */
  // },
  // messageBlock: { marginBottom: "12px" },

  // User Message
  // userMessageContainer: {
  //   alignSelf: "flex-end",
  //   maxWidth: "80%",
  //   backgroundColor: "#fff",
  //   color: "#D1FFBD",
  //   padding: "10px",
  //   borderRadius: "40px",
  //   textAlign: "left",
  // },
  userMessage: { fontWeight: "400", margin: 0 },

  // Bot Message
  // botMessageContainer: {
  //   alignSelf: "flex-start",
  //   maxWidth: "100%",
  //   color: "#000",
  //   padding: "10px",
  //   borderRadius: "10px",
  //   textAlign: "left",
  //   fontSize: "13px",
  // },
  botMessage: { fontWeight: "400", margin: 0 },

  emptyChat: { color: "#666", fontStyle: "italic", textAlign: "center" },
  typingIndicator: { animation: "pulse 1s infinite" },

  // Input Container
  inputContainer: {
    display: "flex",
    width: "100%",
    maxWidth: "600px",
    gap: "10px",
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "50px",
    border: "1px solid #ccc",
    outline: "none",
  },
  sendButton: {
    backgroundColor: "#D1FFBD",
    color: "#fff",
    padding: "10px",
    borderRadius: "70px",
    border: "none",
    cursor: "pointer",
    width: "44px",
  },
  voiceButton: {
    backgroundColor: "#555",
    color: "#fff",
    padding: "10px",
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
  },
  callContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginTop: "10px",
    marginBottom: "10px",
  },
  callButton: {
    backgroundColor: "#212529",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: "30px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    transition: "background 0.3s ease-in-out",
  },
  endCallButton: {
    backgroundColor: "#D32F2F",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: "30px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    transition: "background 0.3s ease-in-out",
  },
  callButtonHover: {
    backgroundColor: "#388E3C", // Darker green on hover
  },
  endCallButtonHover: {
    backgroundColor: "#B71C1C", // Darker red on hover
  },
};

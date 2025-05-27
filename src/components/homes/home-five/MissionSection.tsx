"use client";

import { useEffect, useState } from "react";

export default function MissionSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const tags = [
    { label: "Balance", icon: "⚖️", rotation: "-10deg", top: 10, left: 30 },
    {
      label: "Natural Skin Care",
      icon: "🌿",
      rotation: "5deg",
      top: 60,
      left: 10,
    },
    {
      label: "Nutritionist support",
      icon: "🥑",
      rotation: "-4deg",
      top: 110,
      left: 40,
    },
    {
      label: "Nutrition and Lifestyle",
      icon: "🍎",
      rotation: "8deg",
      top: 170,
      left: 20,
    },
    { label: "Meditation", icon: "🧘", rotation: "-6deg", top: 230, left: 5 },
    { label: "Help women", icon: "♀️", rotation: "4deg", top: 290, left: 25 },
  ];

  return (
    <section style={styles.section}>
      <div style={styles.missionBlock}>
        <h1 style={styles.title}>
          Our mission it to
          <br />
          Advance the quality of
          <br />
          nutrition for everyone
        </h1>
      </div>

      <div style={styles.card}>
        <div
          style={{
            ...styles.cardContent,
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "center" : "flex-start",
          }}
        >
          {/* Left Section */}
          <div style={styles.left}>
            <h2 style={styles.subTitle}>
              Your personalized nutrition and body care plan is waiting for you!
            </h2>
            <p style={styles.description}>
              Make an appointment with me for a trial consultation and I will
              identify the issues and put together the best plan for you.
            </p>
            <form style={styles.form}>
              <input type="text" placeholder="Your name" style={styles.input} />
              <input
                type="email"
                placeholder="Email address"
                style={styles.input}
              />
              <button type="submit" style={styles.button}>
                TRY FREE
              </button>
              <label style={styles.privacy}>
                <input type="checkbox" /> Accept Privacy Policy
              </label>
            </form>
          </div>

          {/* Right Floating Labels */}
          <div
            style={{
              ...styles.right,
              flexDirection: isMobile ? "row" : "unset",
              flexWrap: isMobile ? "wrap" : "unset",
              justifyContent: isMobile ? "center" : "flex-start",
              gap: isMobile ? "0.5rem" : "1rem",
            }}
          >
            {tags.map((tag, idx) => (
              <div
                key={idx}
                style={{
                  ...styles.tag,
                  transform: isMobile ? "none" : `rotate(${tag.rotation})`,
                  position: isMobile ? "static" : "absolute",
                  top: isMobile ? "auto" : `${tag.top}px`,
                  left: isMobile ? "auto" : `${tag.left}%`,
                }}
              >
                <span style={{ marginRight: "8px" }}>{tag.icon}</span>
                {tag.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  section: {
    fontFamily: "sans-serif",
    padding: "4rem 1rem",
    backgroundColor: "#fdfdfd",
  },
  missionBlock: {
    textAlign: "center",
    marginBottom: "2.5rem",
  },
  title: {
    fontSize: "2.2rem",
    fontWeight: 600,
    lineHeight: "1.5",
  },
  card: {
    backgroundColor: "rgb(72 187 147)",
    borderRadius: "20px",
    padding: "3rem 2rem",
    color: "#fff",
    maxWidth: "1200px",
    margin: "0 auto",
    position: "relative",
  },
  cardContent: {
    display: "flex",
    gap: "2.5rem",
    justifyContent: "space-between",
    position: "relative",
    flexWrap: "wrap",
  },
  left: {
    flex: "1 1 360px",
    minWidth: "300px",
    zIndex: 2,
  },
  subTitle: {
    fontSize: "1.7rem",
    fontWeight: 600,
  },
  description: {
    margin: "1.2rem 0",
    fontSize: "1rem",
    lineHeight: "1.6",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.9rem 1.2rem",
    borderRadius: "30px",
    border: "none",
    fontSize: "1rem",
  },
  button: {
    backgroundColor: "#fff",
    color: "#1C5944",
    padding: "0.8rem",
    borderRadius: "50%",
    width: "100px",
    height: "100px",
    alignSelf: "center",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
    fontSize: "0.9rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    lineHeight: "1.1",
  },
  privacy: {
    fontSize: "0.85rem",
    textAlign: "left",
  },
  right: {
    flex: "1 1 360px",
    minHeight: "350px",
    position: "relative",
    marginTop: "2rem",
    display: "flex",
  },
  tag: {
    border: "1px solid #fff",
    borderRadius: "30px",
    padding: "0.5rem 1rem",
    fontSize: "0.85rem",
    backgroundColor: "transparent",
    color: "#fff",
    fontWeight: 500,
    whiteSpace: "nowrap",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    display: "inline-flex",
    alignItems: "center",
    margin: "0.3rem",
  },
};

"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBalanceScale,
  faLeaf,
  faUserDoctor,
  faAppleAlt,
  faSpa,
  faVenus,
} from "@fortawesome/free-solid-svg-icons";
export default function MissionSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const tags = [
    {
      label: "Balance",
      icon: faBalanceScale,
      rotation: "-10deg",
      top: 10,
      left: 30,
    },
    {
      label: "Natural Skin Care",
      icon: faLeaf,
      rotation: "5deg",
      top: 60,
      left: 10,
    },
    {
      label: "Nutritionist support",
      icon: faUserDoctor,
      rotation: "-4deg",
      top: 110,
      left: 40,
    },
    {
      label: "Nutrition and Lifestyle",
      icon: faAppleAlt,
      rotation: "8deg",
      top: 170,
      left: 20,
    },
    { label: "Meditation", icon: faSpa, rotation: "-6deg", top: 230, left: 5 },
    {
      label: "Help women",
      icon: faVenus,
      rotation: "4deg",
      top: 290,
      left: 25,
    },
  ];

  return (
    <section style={styles.section}>
      <div style={styles.missionBlock}>
        <h1 style={styles.title}>
          Our mission is to advance the quality of
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
                <FontAwesomeIcon
                  icon={tag.icon}
                  style={{ marginRight: "8px" }}
                />
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
    padding: "4rem 1rem",
    backgroundColor: "#fdfdfd",
  },
  missionBlock: {
    textAlign: "center",
    marginBottom: "2.5rem",
  },
  title: {
    fontSize: "4.2rem",
    fontWeight: 400,
    lineHeight: "1.5",
  },
  card: {
    backgroundColor: "rgb(72 187 147)",
    borderRadius: "20px",
    padding: "3rem 2rem",
    color: "#fff",
    maxWidth: "auto",
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
    fontSize: "3rem",
    color: "#fff",
    fontWeight: 400,
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
    fontSize: "1.25rem",
    backgroundColor: "transparent",
    color: "#fff",
    fontWeight: 400,
    whiteSpace: "nowrap",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    display: "inline-flex",
    alignItems: "center",
    margin: "0.3rem",
  },
};

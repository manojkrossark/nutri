"use client";
import { useState } from "react";

interface Item {
  title: string;
  description?: string[];
}

const items: Item[] = [
  {
    title: "Meet Your Nutrition Support Team",
    description: [
      "AI-powered guidance combined with certified nutrition experts and lifestyle coaches",
      "Get personalized advice to build sustainable healthy habits",
    ],
  },
  {
    title: "Get Smart AI Recommendations",
    description: [
      "Our AI analyzes your inputs to offer personalized nutrition advice instantly",
      "No need for manual tracking—just answer a few questions and get tailored guidance",
    ],
  },
  {
    title: "Create Your Tailored Nutrition Plan",
    description: [
      "Personalized daily meal plans based on your preferences and dietary needs",
      "Plans adjust dynamically as you track progress and update goals",
    ],
  },
  {
    title: "Get Daily Meal & Wellness Recommendations",
    description: [
      "Enjoy easy recipes, hydration reminders, and wellness tips every day",
      "Stay balanced with nutrition and lifestyle advice designed for you",
    ],
  },
  {
    title: "Stay Motivated with Ongoing Expert Support",
    description: [
      "Monitor your progress with easy-to-use tracking tools",
      "Access expert check-ins and join community challenges for extra motivation",
    ],
  },
];

export default function ProcessSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="section">
      <div className="process-header">
        <h2 className="heading">
          Your Nutrition <strong>Journey Includes ?</strong>
        </h2>
      </div>
      <div className="accordion">
        {items.map((item, index) => (
          <div className="accordion-items" key={index}>
            <div className="accordion-title" onClick={() => toggle(index)}>
              <span>{item.title}</span>
              {/* <span className="icon">{activeIndex === index ? "▲" : "▼"}</span> */}
              <i
                className={`fas ${
                  activeIndex === index ? "fa-chevron-up" : "fa-chevron-down"
                }`}
              ></i>
            </div>
            {activeIndex === index && item.description && (
              <div className="accordion-content">
                {item.description.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        .section {
          padding: 60px 20px;
          text-align: center;
        }
        .process-header {
          padding: 60px 20px;
          background: #fafafa;
          text-align: center;
        }

        .heading {
          font-size: 2rem;
          font-weight: 300;
          color: #222;
        }

        .heading strong {
          font-weight: 600;
        }

        .accordion {
          max-width: 700px;
          margin: 40px auto 0;
          text-align: left;
          color: #000;
        }

        .accordion-items {
          border-top: 1px solid #ddd;
          padding: 20px 40px;
        }

        .accordion-title {
          font-size: 1.1rem;
          font-weight: 500;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
        }

        .accordion-title .icon {
          color: #666;
        }

        .accordion-content {
          margin-top: 10px;
          color: #666;
          font-size: 0.95rem;
        }

        .accordion-content p {
          margin: 4px 0;
        }
      `}</style>
    </section>
  );
}

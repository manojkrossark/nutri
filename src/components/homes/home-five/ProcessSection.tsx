"use client";
import { useState } from "react";

interface Item {
  title: string;
  description?: string[];
}

const items: Item[] = [
  {
    title: "Meet Your Wellness Team",
    description: [
      "Expert physicians specialized in holistic and preventive care",
      "Certified lifestyle coaches with deep expertise in nutrition and behavior change",
    ],
  },
  {
    title: "Get a Deep Health Assessment",
    description: [
      "Comprehensive review of your lifestyle, habits, and medical history",
      "Advanced diagnostics to uncover hidden imbalances and health risks",
    ],
  },
  {
    title: "Define Your Personalized Path",
    description: [
      "Tailored recommendations based on your health priorities and test results",
      "Step-by-step roadmap to achieve lasting lifestyle transformation",
    ],
  },
  {
    title: "Craft Your Daily Wellness Plan",
    description: [
      "Custom meal plans, movement routines, and mindfulness practices",
      "All plans aligned with your biology, preferences, and goals",
    ],
  },
  {
    title: "Stay on Track with Expert Support",
    description: [
      "Ongoing guidance and accountability from your health team",
      "Regular reviews to adapt your plan and celebrate progress",
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
          What Will <strong>You Get?</strong>
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

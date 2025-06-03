"use client";
import Image from "next/image";
import DropdownFive from "@/components/search-dropdown/home-dropdown/DropdownFive";

import bannerImg_2 from "@/assets/images/assets/ils_05.svg";
import bottomImg from "@/assets/images/image 1.png"; // Replace with your actual image

const HeroBanner = () => {
  return (
    <>
      <style jsx>{`
        .hero-banner-five {
          position: relative;
          overflow: hidden;
          height: 100vh;
          width: 100vw;
        }

        .small-heading {
          font-size: 38px;
          font-weight: 400;
          margin-bottom: 10px;
        }

        .background-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }

        .video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.3);
          z-index: 1;
        }

        .hero-banner-five > *:not(video):not(.video-overlay) {
          position: relative;
          z-index: 2;
        }

        .content-wrapper {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          height: 100vh;
          z-index: 2;
          padding-bottom: 50px;
        }

        .get-started-section {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-top: 30px;
        }

        .get-started-button {
          font-size: 16px;
          padding: 5px 50px;
          border-radius: 50px;
          color: white;
          background: black;
          border: none;
          height: 60px;
        }

        .circle-icon-button {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 2px solid #444;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
        }

        .circle-icon-button:hover {
          background: #f0f0f0;
        }

        .circle-icon-button i {
          font-size: 16px;
          color: #444;
        }

        .bottom-image {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-height: 150px;
          object-fit: contain;
          z-index: 2;
          pointer-events: none;
        }

        @media (max-width: 600px) {
          .get-started-section {
            flex-direction: column;
            align-items: flex-start;
          }

          .get-started-button {
            width: 100%;
            text-align: center;
          }

          .circle-icon-button {
            align-self: flex-end;
          }

          .content-wrapper {
            padding-bottom: 30px;
          }
        }
      `}</style>

      <div className="hero-banner-five">
        {/* Background Video */}
        <video className="background-video" autoPlay muted loop playsInline>
          <source src="/assets/nutri.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="video-overlay" />

        {/* Main Content */}
        <div className="container container-large content-wrapper">
          <div className="row">
            <div className="col-lg-7">
              <p className="wow fadeInUp mb-30 text-white small-heading">
                Your Smart Nutrition Partner — Powered by AI, Guided by Human
                Care
              </p>
              <p className="fs-16 m0 lg-pb-20 wow fadeInUp text-white">
                Get personalized nutrition guidance with our AI-powered
                planner—tailored <br /> to your health goals, preferences, and
                dietary needs. Need help? <br /> Consult with us and take
                control of your nutrition, every day.
              </p>

              <div className="get-started-section">
                <button className="get-started-button">Get Started</button>
                <button className="circle-icon-button">
                  <i className="bi bi-arrow-up-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Shapes */}
        <Image
          src={bannerImg_2}
          alt="illustration"
          className="lazy-img shapes illustration"
        />
       {/*  <Image
          src={bottomImg}
          alt="bottom illustration"
          style={{
            position: "absolute",
            bottom: 0,
            left: "70%",
            transform: "translateX(-50%)",
            width: "auto",
            height: "auto",
            backgroundColor: "white",
            zIndex: 2,
            top: "36%",
            borderRadius: "8px",
          }}
        /> */}
        {/* Bottom Image */}
      </div>
    </>
  );
};

export default HeroBanner;

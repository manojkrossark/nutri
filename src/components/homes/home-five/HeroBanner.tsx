"use client";
import Image from "next/image";
import DropdownFive from "@/components/search-dropdown/home-dropdown/DropdownFive";

import bannerShape from "@/assets/images/shape/shape_54.svg";
import bannerImg_1 from "@/assets/images/assets/screen_06.png";
import bannerImg_2 from "@/assets/images/assets/ils_05.svg";

const HeroBanner = () => {
  return (
    <>
      <style jsx>{`
        .get-started-section {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
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

        .image-container {
          display: flex;
          justify-content: center;
          align-items: center;
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
        }
      `}</style>
      <div className="hero-banner-five bg-white z-2 position-relative pt-150 md-pt-150">
        <div className="container container-large">
          <div className="position-relative">
            <div className="row">
              <div className="col-lg-7">
              <h6 className="wow fadeInUp mb-50">
              Your Smart Nutrition AI Assistant
                  </h6>
                <div className="position-relative z-1">
                  <h1 className="hero-heading wow fadeInUp mb-50">
                    We Take Care About Your Health
                  </h1>
                  <Image
                    src={bannerShape}
                    alt=""
                    className="lazy-img shape_01 shapes d-none d-lg-block"
                  />
                  <div className="row">
                    <div className="col-xl-7 col-lg-12 col-md-7">
                      <p
                        className="fs-16 color-light m0 lg-pb-20 wow fadeInUp"
                        data-wow-delay="0.1s"
                      >
                       Get personalized nutrition guidance with our AI-powered planner—tailored to your health goals, preferences, and dietary needs.
                       Need help? Consult with us and take control of your nutrition, every day.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="get-started-section">
              <button className="get-started-button">Get Started</button>

              <div className="image-container">
                <Image src={bannerImg_1} alt="banner" className="lazy-img" />
              </div>

              <button className="circle-icon-button">
                <i className="bi bi-arrow-up-right"></i>
              </button>
            </div>
          </div>
        </div>
        <Image
          src={bannerImg_2}
          alt=""
          className="lazy-img shapes illustration"
        />
        <div className="media-wrapper">
          <div className="bg"></div>
        </div>
      </div>
    </>
  );
};

export default HeroBanner;

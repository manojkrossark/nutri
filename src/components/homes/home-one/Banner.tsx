"use client";
import Image from "next/image";
import DropdownOne from "@/components/search-dropdown/home-dropdown/DropdownOne";
import titleShape from "@/assets/images/shape/shape_01.svg";
import bannerThumb from "@/assets/images/assets/ils_01.svg";
import bannerShape from "@/assets/images/shape/shape_54.svg";
import bannerImg_1 from "@/assets/images/assets/screen_06.png";
import bannerImg_2 from "@/assets/images/assets/ils_05.svg";

const Banner = () => {
  return (
    <div className="hero-banner-one bg-white z-1 pt-225 xl-pt-150 pb-250 xl-pb-150 lg-pb-100 position-relative">
      <div className="container position-relative">
        <div className="row">
          <div className="col-xxl-10 col-xl-9 col-lg-10 col-md-10 m-auto">
            <div className="position-relative z-1">
              <h1 className="hero-heading text-center wow fadeInUp">
                Your Personalized Nutrition Journey
                {/* <Image src={titleShape} alt="" className="lazy-img" /> */}
              </h1>
              {/* <Image
                src={bannerShape}
                alt=""
                className="lazy-img shape_01 shapes d-none d-lg-block"
              /> */}
              <div className="row">
                <div className="col-xl-7 col-lg-12 col-md-7">
                  <p
                    className="fs-24 color-dark m0 lg-pb-20 wow fadeInUp"
                    data-wow-delay="0.1s"
                  >
                    Get custom diet plans, AI-powered insights, and real-time
                    meal recommendations to help you stay on track.
                  </p>
                </div>
                <div className="col-xl-5 col-lg-12 col-md-5">
                  <div className="d-flex flex-column justify-content-center align-items-start">
                    <Image
                      src={bannerImg_1}
                      alt="NutriPath Dashboard"
                      className="lazy-img"
                    />
                    {/* <p className="m0 pt-10 rating">
                                 <span className="fw-500 color-dark">20k+ happy users</span> (4.9 avg rating)
                              </p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xxl-10 m-auto">
            <div className="search-wrapper-one layout-one bg position-relative">
              <div className="bg-wrapper">
                <DropdownOne style={false} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Image
        src={bannerThumb}
        alt="Nutrition Illustration"
        className="lazy-img shapes w-100 illustration"
      />
    </div>
  );
};

export default Banner;

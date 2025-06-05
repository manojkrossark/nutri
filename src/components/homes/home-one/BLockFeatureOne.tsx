import Image from "next/image";
import feature_data from "@/data/home-data/FeatureData";
import titleShape from "@/assets/images/shape/title_shape_01.svg";

const BLockFeatureOne = () => {
  return (
    <div className="block-feature-one mt-130 xl-mt-100 lg-mt-80 mb-150 xl-mb-100 lg-mb-80">
      <div className="container">
        <div className="title-one text-center mb-50 xl-mb-30 lg-mb-20 wow fadeInUp">
          <h3>
            Explore Nutripath&apos;s{" "}
            <span>
              Core Benefits{" "}
              <Image src={titleShape} alt="" className="lazy-img" />
            </span>
          </h3>
          <p className="fs-35">
            Your personal AI wellness guide—adapting to your mood, health goals,
            and lifestyle in real-time.
          </p>
        </div>

        <div className="row gx-xl-5">
          {feature_data
            .filter((items) => items.page === "home_nutripath_feature_1")
            .map((item) => (
              <div key={item.id} className="col-md-4">
                <div className="card-style-one text-center wow fadeInUp mt-40">
                  <Image
                    src={item.icon ? item.icon : ""}
                    alt={item.title}
                    className="lazy-img m-auto icon rounded-circle"
                    style={{
                      objectFit: "cover",
                      borderRadius: "50%",
                      width: "200px",
                      height: "200px",
                      boxShadow: "rgb(108, 117, 125) 0px 4px 12px",
                    }}
                  />
                  <div className="fs-16 text-uppercase fw-500 fs-text mt-35 md-mt-30 mb-20">
                    {item.title}
                  </div>
                  <p className="fs-24 ps-xxl-4 pe-xxl-4">{item.desc}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BLockFeatureOne;

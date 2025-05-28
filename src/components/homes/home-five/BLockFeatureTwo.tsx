import Image from "next/image"
import Link from "next/link"
import videoThumbnail from "@/assets/images/img2.jpg"
import saladImage from "@/assets/images/img1.jpg"
import playIcon from "@/assets/images/icon/icon_10.svg"
import quoteImage from "@/assets/images/icon/icon_05.svg"

const BLockFeatureTwo = () => {
  return (
    <div className="block-feature-one mt-130 xl-mt-100 lg-mt-80 mb-150 xl-mb-100 lg-mb-80">
      <div className="container">
        <div className="title-one text-center mb-50 xl-mb-30 lg-mb-20 wow fadeInUp">
          <h3>
            Recipes and wellness reminders <span>to promote a healthy way of life</span>
          </h3>
        </div>

        <div className="row gx-xl-5 align-items-center">
          {/* Left Side - SHEcare Recipes */}
          <div className="col-md-6">
            <div className="card-style-one wow fadeInUp">
              <Image src={saladImage} alt="SHEcare Salad" className="lazy-img w-100 rounded" />
              <div className="mt-30">
                <h5 className="text-uppercase fw-600 text-success">SHEcare Recipes</h5>
                <p className="fs-18 mt-10 mb-15">
                  For women in any life stage seeking more energy and lightness
                </p>
                <Link href="/shecare-recipes" className="text-decoration-underline fs-16 fw-500 text-primary">
                  READ MORE →
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side - Video Section */}
          <div className="col-md-6">
            <div className="video-wrapper position-relative wow fadeInUp">
              <Image src={videoThumbnail} alt="Healthy Cooking Video" className="lazy-img w-100 rounded" />
              <Link href="/healthy-video" className="video-btn position-absolute top-50 start-50 translate-middle">
                <Image src={playIcon} alt="Play Video" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default BLockFeatureTwo

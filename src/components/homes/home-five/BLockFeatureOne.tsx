import Link from "next/link"

const BLockFeatureOne = () => {
   return (
      <div className="block-feature-eleven mt-300 xl-mt-200 md-mt-100">
         <div className="container container-large">
            <div className="row">
               <div className="col-lg-5">
                  <div className="title-one md-mb-40">
                     <h3>Trusted by 1,230+ Wellness Brands.</h3>
                  </div>
               </div>
               <div className="col-xxl-6 col-lg-7 ms-auto">
                  <p className="fs-24 lh-lg mb-30 color-dark">Say goodbye to one-size-fits-all diets. At Nutri, we create highly personalized meal plans tailored to your unique body type, health goals, and food preferences. Whether you're aiming for weight loss, muscle gain, or improved overall wellness, we’ve got you covered.


</p>
                  <div className="d-inline-flex flex-wrap align-items-center">
                     <Link href="/about_us_02" className="btn-five md rounded-0 mt-20 me-5"><span>More Details</span></Link>
                     <Link href="/contact" className="btn-three mt-20"><span>Request a Callback</span> <i className="fa-light fa-arrow-right-long"></i></Link>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default BLockFeatureOne

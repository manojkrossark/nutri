import feature_data from "../../data/home-data/FeatureData"
import Image from "next/image"
import Link from "next/link"

const FeatureOne = () => {
   return (
      <>
         {feature_data.filter((items) => items.page === "home_4_feature_1").map((item) => (
  <div className="card-custom position-relative d-flex align-items-center p-4 rounded-4" style={{
   background: 'linear-gradient(135deg, #f9f9f9, #ececec)', // gradient background
   minHeight: '280px',
   overflow: 'hidden'
 }}>
   {/* Top-right Arrow Circle */}
   <div className="position-absolute top-0 end-0 m-3">
     <div className="d-flex align-items-center justify-content-center border rounded-circle" style={{
       width: '38px',
       height: '38px',
       backgroundColor: 'white',
     }}>
       <i className="bi bi-arrow-up-right"></i>
     </div>
   </div>
 
   {/* Image Section */}
   <div className="me-4">
     <img src="/images/child.png" alt="Child" style={{ width: '100px', borderRadius: '12px' }} />
   </div>
 
   {/* Text Section */}
   <div>
     <div className="px-3 py-2 bg-white rounded-pill" style={{ maxWidth: '260px' }}>
       <h6 className="mb-0" style={{ fontSize: '16px', fontWeight: 500 }}>
         Consult The <br /> Best Nutrition <br /> For Your Child
       </h6>
     </div>
   </div>
 </div>
 
         
         ))}
      </>
   )
}

export default FeatureOne

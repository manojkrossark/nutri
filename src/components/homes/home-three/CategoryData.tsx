import category_data from "@/data/home-data/CategoryData"
import Image from "next/image"
import Link from "next/link"

const Category = ({ style }: any) => {
   return (
      <div className={`category-section-one ${style ? "grey-bg pt-130 pb-110 xl-pb-80" : "mt-65"}`}>
         <div className="container container-large">
            <div className={`position-relative z-1 ${style ? "" : "border-bottom pb-65 xl-pb-40"}`}>
               <div className="wrapper">
                  <ul className="d-flex flex-wrap justify-content-center justify-content-xxl-between style-none">
                     {category_data.filter((items) => items.page === "home_3").map((item) => (
                        <li key={item.id}>
                           <Link href="/listing_01" className="d-flex align-items-center fw-500 tran3s">
                              <Image src={item.icon ? item.icon : ""} alt="" className="lazy-img invert" />
                              <span>{item.text}</span>
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>             
            </div>
         </div>
      </div>
   )
}

export default Category

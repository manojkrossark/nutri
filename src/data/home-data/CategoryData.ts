import { StaticImageData } from "next/image";

import categoryIcon_1 from "@/assets/images/icon/icon_15.svg";
import categoryIcon_2 from "@/assets/images/icon/icon_16.svg";
import categoryIcon_3 from "@/assets/images/icon/icon_17.svg";
import categoryIcon_4 from "@/assets/images/icon/icon_18.svg";
import categoryIcon_5 from "@/assets/images/icon/icon_19.svg";
import categoryIcon_6 from "@/assets/images/icon/icon_20.svg";
import categoryIcon_7 from "@/assets/images/icon/icon_21.svg";
import categoryIcon_8 from "@/assets/images/icon/icon_22.svg";

interface DataType {
   id: number;
   page: string;
   icon?: StaticImageData;
   text: string;
   item_bg_img?:string;
   data_delay_time?:string;
}[];

const category_data: DataType[] = [
   {
      id: 1,
      page: "home_3",
      icon: categoryIcon_1,
      text: "Nutrition Plans",
   },
   {
      id: 2,
      page: "home_3",
      icon: categoryIcon_2,
      text: "Supplements",
   },
   {
      id: 3,
      page: "home_3",
      icon: categoryIcon_3,
      text: "Vitamins & Minerals",
   },
   {
      id: 4,
      page: "home_3",
      icon: categoryIcon_4,
      text: "Healthy Recipes",
   },
   {
      id: 5,
      page: "home_3",
      icon: categoryIcon_5,
      text: "Wellness Goals",
   },
   {
      id: 6,
      page: "home_3",
      icon: categoryIcon_6,
      text: "AI Consultations",
   }
]

export default category_data;
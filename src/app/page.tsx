import HomeThree from "@/components/homes/home-three";
import Wrapper from "@/layouts/Wrapper";
import dynamic from "next/dynamic";
const DynamicComponentWithNoSSR = dynamic(
  () => import("@/components/homes/home-five"),
  { ssr: false }
);

export const metadata = {
  title: "Alto -Your AI Nutrionist Assistant",
};
const index = () => {
  return (
    <Wrapper>
      <DynamicComponentWithNoSSR />
    </Wrapper>
  );
};

export default index;

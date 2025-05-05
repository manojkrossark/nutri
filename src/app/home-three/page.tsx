import HomeThree from "@/components/homes/home-three";
import Wrapper from "@/layouts/Wrapper";
import dynamic from 'next/dynamic'
const DynamicComponentWithNoSSR = dynamic(
  () => import('@/components/homes/home-three'),
  { ssr: false }
)
export const metadata = {
  title: "Home Three Homy - Real Estate React Next js Template",
};
const index = () => {
  return (
    <Wrapper>
      <DynamicComponentWithNoSSR />
    </Wrapper>
  )
}

export default index
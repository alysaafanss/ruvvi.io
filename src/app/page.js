import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustTicker from "@/components/TrustTicker";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import WhyRuvvi from "@/components/sections/WhyRuvvi";
import WhyPouches from "@/components/sections/WhyPouches";
import Lifestyle from "@/components/sections/Lifestyle";
import ProductDetails from "@/components/sections/ProductDetails";
import Ingredients from "@/components/sections/Ingredients";
import SocialProof from "@/components/sections/SocialProof";
import Subscription from "@/components/sections/Subscription";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import { getAllSectionImages } from "@/lib/getImages";

export const revalidate = 60;

export default async function Home() {
  const images = await getAllSectionImages();

  return (
    <>
      <Navbar />
      <main>
        <Hero heroImages={images.hero} />
        <TrustTicker />
        <HowItWorks />
        <WhyRuvvi />
        <WhyPouches />
        <Lifestyle images={images.lifestyle} />
        <ProductDetails images={images.product} />
        <Ingredients ingredientImages={images.ingredients} />
        <SocialProof />
        <Subscription />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

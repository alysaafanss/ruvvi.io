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
import EditorProvider from "@/components/editor/EditorProvider";
import LogoutButton from "@/components/LogoutButton";
import { getAllContent } from "@/lib/getContent";
import { getAllSectionImages } from "@/lib/getImages";

export const revalidate = 0;

export default async function AdminPage() {
  const [content, images] = await Promise.all([
    getAllContent(),
    getAllSectionImages(),
  ]);

  return (
    <EditorProvider initialContent={content}>
      <Navbar content={content.navbar} />
      <main>
        <Hero content={content.hero} heroImages={images.hero} />
        <TrustTicker content={content.trustTicker} />
        <HowItWorks content={content.showcase} images={images.showcase} />
        <WhyRuvvi content={content.whyRuvvi} />
        <WhyPouches content={content.whyPouches} />
        <Lifestyle content={content.lifestyle} images={images.lifestyle} />
        <ProductDetails content={content.productDetails} images={images.product} />
        <Ingredients content={content.ingredients} ingredientImages={images.ingredients} />
        <SocialProof content={content.socialProof} />
        <Subscription content={content.subscription} />
        <FAQ content={content.faq} />
        <FinalCTA content={content.finalCta} />
      </main>
      <Footer content={content.footer} />
    </EditorProvider>
  );
}

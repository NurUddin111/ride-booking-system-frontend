import Features from "@/components/modules/Landing/Features";
import FinalCTA from "@/components/modules/Landing/FinalCTA";
import HeroSection from "@/components/modules/Landing/HeroSection";
import HowItWorks from "@/components/modules/Landing/HowItWorks";
import Testimonials from "@/components/modules/Landing/Testimonials";

const Home = () => {
  return (
    <main>
      <HeroSection />
      <HowItWorks />
      <Features />
      <Testimonials />
      <FinalCTA />
    </main>
  );
};

export default Home;

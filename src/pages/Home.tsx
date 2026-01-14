import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { IUser } from "@/types/user";

import Features from "@/components/modules/Landing/Features";
import FinalCTA from "@/components/modules/Landing/FinalCTA";
import HeroSection from "@/components/modules/Landing/HeroSection";
import HowItWorks from "@/components/modules/Landing/HowItWorks";
import Testimonials from "@/components/modules/Landing/Testimonials";
import RiderHome from "./rider/RiderHome";
import { DriverHome } from "./driver/DriverHome";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useUserInfoQuery(undefined);
  const user = data?.data?.data as IUser | undefined;

  if (isLoading) return null;

  if (user?.role === "RIDER") {
    return <RiderHome />;
  }

  if (user?.role === "DRIVER") {
    return <DriverHome driver={user} />;
  }

  if (user?.role === "ADMIN") {
    navigate("/admin");
  }

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

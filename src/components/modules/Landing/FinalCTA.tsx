import { Link, useLocation } from "react-router";
import { Button } from "@/components/ui/button";

const FinalCTA = () => {
  const location = useLocation();

  return (
    <section className="relative overflow-hidden py-36 bg-gradient-to-br from-[#0F0C29] via-[#2F2A6B] to-[#1E1B3A] text-white">
      {/* ambient glow */}
      <div className="absolute -top-48 -left-48 h-[32rem] w-[32rem] rounded-full bg-indigo-500/25 blur-[160px]" />
      <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-pink-500/20 blur-[160px]" />

      <div className="relative container mx-auto px-6">
        {/* Glass wrapper */}
        <div className="mx-auto max-w-3xl rounded-3xl bg-white/5 backdrop-blur-md px-10 py-16 text-center shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Start Using the Platform Today
          </h2>

          <p className="mt-6 text-lg text-white/80">
            Whether you’re booking rides, driving professionally, or managing
            operations — the system is ready for you.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-gradient-to-r from-indigo-400 to-pink-400 px-10 text-black hover:opacity-90"
            >
              <Link to="/api/v1/user/ride">Request a Ride</Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white/50 px-10 text-black hover:bg-white/10"
            >
              <Link
                to="/api/v1/user/signup"
                state={{ backgroundLocation: location }}
              >
                Become a Driver
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;

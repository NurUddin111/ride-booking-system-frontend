import { Link, useLocation } from "react-router";

const HeroSection = () => {
  const location = useLocation();

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0B0A1F] via-[#2B2566] to-[#1E1B3A] text-white">
      {/* Massive ambient glows */}
      <div className="absolute -top-40 -left-40 h-[40rem] w-[40rem] rounded-full bg-indigo-500/25 blur-[160px]" />
      <div className="absolute top-1/3 -right-40 h-[36rem] w-[36rem] rounded-full bg-pink-500/20 blur-[160px]" />
      <div className="absolute bottom-0 left-1/4 h-[30rem] w-[30rem] rounded-full bg-sky-500/10 blur-[140px]" />

      <div className="relative container mx-auto px-6 pt-32 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-28 items-center">
          {/* LEFT CONTENT */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs tracking-wide text-white/80">
              ● Real-Time Ride Infrastructure
            </span>

            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-tight">
              Orchestrate Movement.
              <br />
              Control the City.
            </h1>

            <p className="mt-6 max-w-xl text-lg text-white/75">
              A full-scale ride management ecosystem enabling riders, drivers,
              and administrators to operate seamlessly with real-time insight
              and precision control.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/api/v1/user/ride"
                className="rounded-full bg-gradient-to-r from-indigo-400 to-pink-400 px-8 py-3 text-sm font-semibold text-black transition hover:scale-105"
              >
                Start a Ride
              </Link>

              <Link
                to="/api/v1/user/signup"
                state={{ backgroundLocation: location }}
                className="rounded-full border border-white/30 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Become a Driver
              </Link>
            </div>

            {/* Metrics */}
            <div className="mt-16 grid grid-cols-3 gap-12 text-sm">
              <div>
                <p className="text-3xl font-bold">10k+</p>
                <p className="text-white/50">Daily Rides</p>
              </div>
              <div>
                <p className="text-3xl font-bold">2k+</p>
                <p className="text-white/50">Drivers Online</p>
              </div>
              <div>
                <p className="text-3xl font-bold">99.9%</p>
                <p className="text-white/50">Live Availability</p>
              </div>
            </div>
          </div>

          {/* RIGHT — CITY MOTION CANVAS */}
          <div className="relative hidden lg:block">
            {/* Depth grid */}
            <div className="absolute inset-0 rounded-3xl bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:80px_80px]" />

            {/* Map layers */}
            <svg
              viewBox="0 0 600 600"
              className="relative z-10 w-full max-w-xl mx-auto"
              fill="none"
            >
              {/* Background routes */}
              <path
                d="M60 480 C180 200, 420 200, 540 360"
                stroke="#7dd3fc"
                strokeOpacity="0.15"
                strokeWidth="2"
              />
              <path
                d="M120 380 C220 260, 360 320, 480 180"
                stroke="#c4b5fd"
                strokeOpacity="0.18"
                strokeWidth="2"
              />

              {/* Primary route */}
              <path
                d="M80 420 C200 160, 380 160, 520 300"
                stroke="url(#route)"
                strokeWidth="3"
                strokeDasharray="10 12"
              />

              {/* Nodes */}
              <circle cx="80" cy="420" r="7" fill="#22c55e" />
              <circle cx="300" cy="200" r="7" fill="#f472b6" />
              <circle cx="520" cy="300" r="7" fill="#60a5fa" />

              {/* Pulse glow */}
              <circle cx="300" cy="200" r="28" fill="#f472b6" opacity="0.12" />

              <defs>
                <linearGradient id="route" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#f472b6" />
                </linearGradient>
              </defs>
            </svg>

            {/* Foreground glass card */}
            <div className="absolute bottom-10 right-6 rounded-xl bg-white/10 backdrop-blur-md px-5 py-4 shadow-xl">
              <p className="text-xs text-white/60">Live Status</p>
              <p className="text-sm font-semibold">City traffic synchronized</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

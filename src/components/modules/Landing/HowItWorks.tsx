const steps = [
  {
    step: "01",
    title: "Request a Ride",
    description:
      "Enter your pickup location and destination. Our system instantly detects nearby available drivers.",
    accent: "from-indigo-500/10 to-indigo-500/5",
  },
  {
    step: "02",
    title: "Get Matched",
    description:
      "A nearby driver accepts your request. Track the driver and ride status live from the system.",
    accent: "from-purple-500/10 to-purple-500/5",
  },
  {
    step: "03",
    title: "Ride & Complete",
    description:
      "Reach your destination safely. Payments, ride history, and status updates are handled automatically.",
    accent: "from-pink-500/10 to-pink-500/5",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative py-28 bg-background overflow-hidden">
      {/* background echo from hero */}
      <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative container mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-20">
          <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
          <p className="mt-4 text-muted-foreground">
            A simple, transparent flow designed to make ride management smooth
            for riders, drivers, and administrators.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* vertical gradient line */}
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-indigo-400 via-purple-400 to-pink-400 hidden md:block" />

          <div className="space-y-16">
            {steps.map((item) => (
              <div key={item.step} className="relative md:pl-20">
                {/* Step Bubble */}
                <div className="absolute left-0 top-4">
                  <div className="h-11 w-11 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 text-white font-bold text-sm flex items-center justify-center shadow-lg">
                    {item.step}
                  </div>
                </div>

                {/* Card */}
                <div
                  className={`relative rounded-2xl border bg-gradient-to-br ${item.accent} bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
                >
                  {/* subtle top accent line */}
                  <div className="absolute top-0 left-0 h-1 w-24 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-tr-full" />

                  <h3 className="text-xl font-semibold">{item.title}</h3>

                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xl">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

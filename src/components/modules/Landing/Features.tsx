const featureGroups = [
  {
    role: "Rider",
    accent: "from-indigo-500/15 to-indigo-500/5",
    features: [
      "Request rides instantly with live availability",
      "Track drivers and rides in real time",
      "View ride history and payment records",
    ],
  },
  {
    role: "Driver",
    accent: "from-purple-500/15 to-purple-500/5",
    features: [
      "Accept or reject ride requests easily",
      "Track earnings and completed rides",
      "Manage availability and ride status",
    ],
  },
  {
    role: "Admin",
    accent: "from-pink-500/15 to-pink-500/5",
    features: [
      "Monitor all rides and system activity",
      "Manage users, drivers, and permissions",
      "Access analytics and performance insights",
    ],
  },
];

const Features = () => {
  return (
    <section className="relative py-28 bg-background overflow-hidden">
      {/* background echo */}
      <div className="absolute top-1/3 -left-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative container mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-20">
          <h2 className="text-3xl md:text-4xl font-bold">
            Built for Every Role
          </h2>
          <p className="mt-4 text-muted-foreground">
            The system is carefully designed to support riders, drivers, and
            administrators — each with tools tailored to their needs.
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {featureGroups.map((group) => (
            <div
              key={group.role}
              className={`relative rounded-2xl border bg-gradient-to-br ${group.accent} bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
            >
              {/* role badge */}
              <span className="inline-block rounded-full bg-white/70 px-4 py-1 text-xs font-semibold text-foreground">
                {group.role}
              </span>

              <ul className="mt-6 space-y-4 text-sm text-muted-foreground">
                {group.features.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

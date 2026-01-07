import FeatureCard from "./FeatureCard";
import { features } from "./features.data";

const FeaturesSection = () => {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="text-3xl font-bold">Powerful Features for Everyone</h2>
        <p className="mt-3 text-muted-foreground">
          Whether you are a rider, driver, or admin — Safari is built to support
          your journey.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard {...feature} />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;

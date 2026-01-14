import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router";

const NoRideHome = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6">
      {/* Icon */}
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <MapPin className="h-8 w-8 text-primary" />
      </div>

      {/* Text */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Ready to go?</h1>
        <p className="text-muted-foreground max-w-sm">
          Book a ride in seconds and get moving with Safari.
        </p>
      </div>

      {/* CTA */}
      <Button
        size="lg"
        className="px-10 py-6 text-base"
        onClick={() => navigate("/ride/request")}
      >
        Request a Ride
      </Button>
    </div>
  );
};

export default NoRideHome;

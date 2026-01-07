import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const experiences = [
  {
    name: "Rahim Ahmed",
    role: "Rider",
    context: "Daily commute",
    text: "Open app → request ride → track driver. Everything works exactly as expected.",
  },
  {
    name: "Sadia Khan",
    role: "Driver",
    context: "Peak hours",
    text: "Ride requests are clear, navigation is simple, and earnings are updated instantly.",
  },
  {
    name: "Imran Hossain",
    role: "Admin",
    context: "System monitoring",
    text: "I can see live rides, driver status, and user activity without digging through menus.",
  },
];

const Testimonials = () => {
  return (
    <section className="relative py-28 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-20 max-w-xl">
          <h2 className="text-3xl md:text-4xl font-bold">
            Real Usage, Real Experiences
          </h2>
          <p className="mt-4 text-muted-foreground">
            A quick look at how different users interact with the system in
            their everyday scenarios.
          </p>
        </div>

        {/* Experience Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((item) => (
            <Card key={item.name} className="border transition hover:shadow-lg">
              <CardContent className="p-8 space-y-6">
                {/* Top meta */}
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{item.role}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {item.context}
                  </span>
                </div>

                {/* Text */}
                <p className="text-sm leading-relaxed text-foreground">
                  {item.text}
                </p>

                {/* User */}
                <div className="flex items-center gap-3 pt-4 border-t">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>
                      {item.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

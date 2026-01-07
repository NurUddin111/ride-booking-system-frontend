import { Link } from "react-router";
import { cn } from "@/lib/utils";

type FeatureCardProps = {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
};

const FeatureCard = ({
  title,
  description,
  href,
  icon: Icon,
}: FeatureCardProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "group rounded-xl border p-5 transition-all",
        "hover:border-primary hover:shadow-md"
      )}
    >
      <div className="flex items-start gap-4">
        <div className="rounded-lg bg-primary/10 p-2 text-primary">
          <Icon size={22} />
        </div>

        <div>
          <h3 className="font-semibold group-hover:text-primary">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default FeatureCard;

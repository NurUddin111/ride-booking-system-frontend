import { BikeIcon, CarIcon, ShieldCheckIcon } from "lucide-react";

export const features = [
  {
    key: "rider",
    title: "Rider Features",
    description:
      "Book rides instantly, track drivers in real-time, and view ride history.",
    href: "/features/rider",
    icon: BikeIcon,
  },
  {
    key: "driver",
    title: "Driver Features",
    description:
      "Accept ride requests, manage availability, and track your earnings.",
    href: "/features/driver",
    icon: CarIcon,
  },
  {
    key: "admin",
    title: "Admin Features",
    description:
      "Monitor rides, manage users, and control the entire platform.",
    href: "/features/admin",
    icon: ShieldCheckIcon,
  },
];

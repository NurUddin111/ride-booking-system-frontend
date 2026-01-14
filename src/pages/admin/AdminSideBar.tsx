import { NavLink } from "react-router";
import { LayoutDashboard, Car, Users, User, Settings } from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Rides",
    path: "/admin/rides",
    icon: Car,
  },
  {
    label: "Drivers",
    path: "/admin/drivers",
    icon: Users,
  },
  {
    label: "Riders",
    path: "/admin/riders",
    icon: User,
  },
  {
    label: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];

const AdminSidebar = () => {
  return (
    <aside className="w-64 border-r bg-background px-4 py-6">
      {/* Logo */}
      <h2 className="text-xl font-bold mb-8">Admin Panel</h2>

      {/* Nav */}
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition
       ${
         isActive
           ? "bg-muted text-foreground"
           : "text-muted-foreground hover:bg-muted"
       }`
            }
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;

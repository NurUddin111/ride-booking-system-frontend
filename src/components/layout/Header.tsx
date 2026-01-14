import { LayoutDashboardIcon } from "lucide-react";
import { Link, useLocation } from "react-router";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import Logo from "@/assets/icons/Logo";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { IUser } from "@/types/user";
import OnOff from "../modules/Rides/OnOffStatus";
import UserDropDownMenu from "./UserDropDown";

// Public navigation (shown to everyone)
const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const Header = () => {
  const location = useLocation();
  const { data } = useUserInfoQuery(undefined);
  const user = data?.data?.data as IUser | undefined;
  console.log(user);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* LEFT */}
        <div className="flex items-center gap-6">
          {/* Mobile menu */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <LayoutDashboardIcon size={20} />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-64 p-2 md:hidden">
              <nav className="flex flex-col gap-1">
                {publicLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="rounded-md px-3 py-2 text-sm hover:bg-muted"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </PopoverContent>
          </Popover>

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-mono text-2xl font-semibold"
          >
            <Logo />
            Safari
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList className="gap-2">
              {publicLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={link.href}
                      className="px-3 py-2 font-medium hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2">
          {/* Visitor (not logged in) */}
          {!user?.email && (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login" state={{ backgroundLocation: location }}>
                  Sign In
                </Link>
              </Button>
              <Button asChild>
                <Link to="/signup" state={{ backgroundLocation: location }}>
                  Sign Up
                </Link>
              </Button>
            </>
          )}

          {/* Driver only */}
          {user?.role === "DRIVER" && <OnOff user={user} />}

          {/* Any logged-in user (RIDER / DRIVER / ADMIN) */}
          {user?.email && <UserDropDownMenu userDetails={user} />}
        </div>
      </div>
    </header>
  );
};

export default Header;

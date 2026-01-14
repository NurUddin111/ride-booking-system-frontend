import {
  BookOpenIcon,
  Car,
  IdCard,
  Layers2Icon,
  LogOutIcon,
  UserPenIcon,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router";
import {
  authApi,
  useSignoutUserMutation,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { toast } from "sonner";
import type { IUser } from "@/types/user";

const UserDropDownMenu = ({ userDetails }: { userDetails: IUser }) => {
  const navigate = useNavigate();
  const { _id, name, email, picture, role } = userDetails;
  const firstLetter = name[0];

  const [signoutUser] = useSignoutUserMutation();
  const dispatch = useAppDispatch();

  const handleSignOut = async () => {
    await signoutUser(undefined);
    dispatch(authApi.util.resetApiState());
    navigate("/");
    toast.warning("Logged out successfully");
  };

  return (
    <div className="mr-10">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
            <Avatar>
              <AvatarImage src={picture} alt="Profile image" />
              <AvatarFallback>{firstLetter}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-64">
          {/* User Info */}
          <DropdownMenuLabel className="flex flex-col">
            <span className="truncate text-sm font-medium">{name}</span>
            <span className="truncate text-xs text-muted-foreground">
              {email}
            </span>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          {/* Common */}
          <DropdownMenuGroup>
            <Link to={`/user/profile/${_id}`} className="w-full">
              <DropdownMenuItem className="gap-2">
                <IdCard size={16} className="opacity-60" />
                Profile
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          {/* RIDER */}
          {role === "RIDER" && (
            <DropdownMenuGroup>
              <Link to="/rider/history" className="w-full">
                <DropdownMenuItem className="gap-2">
                  <BookOpenIcon size={16} className="opacity-60" />
                  Ride History
                </DropdownMenuItem>
              </Link>

              <Link to="/become-driver" className="w-full">
                <DropdownMenuItem className="gap-2">
                  <Car size={16} className="opacity-60" />
                  Become a Driver
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          )}

          {/* DRIVER */}
          {role === "DRIVER" && (
            <DropdownMenuGroup>
              <Link to="/driver/history" className="w-full">
                <DropdownMenuItem className="gap-2">
                  <BookOpenIcon size={16} className="opacity-60" />
                  Ride History
                </DropdownMenuItem>
              </Link>

              <Link to="/driver/earnings" className="w-full">
                <DropdownMenuItem className="gap-2">
                  <Layers2Icon size={16} className="opacity-60" />
                  Earnings
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          )}

          {/* ADMIN */}
          {role === "ADMIN" && (
            <DropdownMenuGroup>
              <Link to="/admin/dashboard" className="w-full">
                <DropdownMenuItem className="gap-2">
                  <Layers2Icon size={16} className="opacity-60" />
                  Dashboard
                </DropdownMenuItem>
              </Link>

              <Link to="/admin/users" className="w-full">
                <DropdownMenuItem className="gap-2">
                  <Users size={16} className="opacity-60" />
                  Users
                </DropdownMenuItem>
              </Link>

              <Link to="/admin/driver-requests" className="w-full">
                <DropdownMenuItem className="gap-2">
                  <UserPenIcon size={16} className="opacity-60" />
                  Driver Requests
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          )}

          <DropdownMenuSeparator />

          {/* Logout */}
          <DropdownMenuItem
            onClick={handleSignOut}
            className="gap-2 text-red-600 focus:text-red-600"
          >
            <LogOutIcon size={16} className="opacity-60" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserDropDownMenu;

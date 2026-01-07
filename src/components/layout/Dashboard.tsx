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

const DashBoard = ({ userDetails }: { userDetails: IUser }) => {
  const navigate = useNavigate();
  console.log(userDetails);
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
            <div className="relative">
              <Avatar>
                <AvatarImage src={picture} alt="Profile image" />
                <AvatarFallback>{firstLetter}</AvatarFallback>
              </Avatar>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-w-64">
          <DropdownMenuLabel className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-medium text-foreground">
              {name}
            </span>
            <span className="truncate text-xs font-normal text-muted-foreground">
              {email}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <Link to={`/api/v1/user/profile/${_id}`} className="w-full">
              <DropdownMenuItem className="flex gap-2 items-center">
                <IdCard size={16} className="opacity-60" aria-hidden="true" />
                <p>View Profile</p>
              </DropdownMenuItem>
            </Link>

            <Link to="/api/v1/user/ride" className="w-full">
              <DropdownMenuItem className="flex gap-2 items-center">
                <Car size={16} className="opacity-60" aria-hidden="true" />
                <p>Go For A Ride</p>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="flex flex-col items-start">
            {(role === "ADMIN" || role === "RIDER") && (
              <>
                <Link
                  to="/api/v1/admin/all-users?page=1"
                  state={{ role }}
                  className="w-full"
                >
                  <DropdownMenuItem>
                    <Layers2Icon
                      size={16}
                      className="opacity-60"
                      aria-hidden="true"
                    />
                    <span>Drive & Earn</span>
                  </DropdownMenuItem>
                </Link>

                <Link
                  to="/api/v1/admin/all-users?page=1"
                  state={{ role }}
                  className="w-full"
                >
                  <DropdownMenuItem className="flex gap-2 items-center w-full">
                    <Users
                      size={16}
                      className="opacity-60"
                      aria-hidden="true"
                    />
                    Driver Approval Request
                  </DropdownMenuItem>
                </Link>
              </>
            )}

            {role === "ADMIN" && (
              <>
                <Link
                  to="/api/v1/admin/all-users?page=1"
                  state={{ role }}
                  className="w-full"
                >
                  <DropdownMenuItem className="flex gap-2 items-center w-full">
                    <Users
                      size={16}
                      className="opacity-60"
                      aria-hidden="true"
                    />
                    All Users
                  </DropdownMenuItem>
                </Link>

                <Link
                  to="/api/v1/admin/all-users?page=1"
                  state={{ role }}
                  className="w-full"
                >
                  <DropdownMenuItem className="flex gap-2 items-center w-full">
                    <Users
                      size={16}
                      className="opacity-60"
                      aria-hidden="true"
                    />
                    Driver Approval Request
                  </DropdownMenuItem>
                </Link>
              </>
            )}

            {(role === "ADMIN" || role === "DRIVER") && (
              <>
                <Link to="/api/v1/ride/requests" className="w-full">
                  <DropdownMenuItem className="flex gap-2 items-center w-full">
                    <Users
                      size={16}
                      className="opacity-60"
                      aria-hidden="true"
                    />
                    Ride Requets
                  </DropdownMenuItem>
                </Link>
              </>
            )}

            <DropdownMenuItem>
              <UserPenIcon
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Option 5</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BookOpenIcon
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>History</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
            <Link
              to="/"
              onClick={handleSignOut}
              state={{ backgroundLocation: location }}
            >
              Logout
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DashBoard;

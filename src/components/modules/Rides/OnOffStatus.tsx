/* eslint-disable @typescript-eslint/no-explicit-any */
import { useId, useState } from "react";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import type { IUser } from "@/types/user";
import { useUpdateUserMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";

const OnOff = ({ user }: { user: IUser }) => {
  const id = useId();
  const userId = user?._id;
  const [checked, setChecked] = useState<boolean>(user.isOnline ? true : false);
  const [updateUser, { isLoading, isError }] = useUpdateUserMutation();

  const handleToggle = async (value: boolean) => {
    setChecked(value);
    const userDetails = { isOnline: value };
    try {
      await updateUser({
        userId,
        userDetails,
      }).unwrap();
      toast.success("Status Updated");
    } catch (error: any) {
      console.log(error);
      if (
        error.data.message ===
        "You can set your availibility status after you get driver approval only."
      ) {
        toast.error("You're not approved as Driver!");
      }
    }
  };

  return (
    <div className="inline-flex items-center gap-2">
      <Switch
        id={id}
        aria-label="Toggle switch"
        checked={checked}
        onCheckedChange={handleToggle}
      />
      <Label
        htmlFor={id}
        className={cn(
          "text-sm text-white font-medium border border-black px-2 rounded-full bg-gray-500",
          user.isOnline ? "bg-emerald-500" : "bg-gray-500"
        )}
      >
        {isLoading && "Loading..."}
        {isError && "Try again!"}
        {!isLoading && !isError && (user.isOnline ? "Online" : "Offline")}
      </Label>
    </div>
  );
};

export default OnOff;

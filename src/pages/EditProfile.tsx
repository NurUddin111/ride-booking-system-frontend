import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLocation } from "react-router";
import type { IUser } from "@/types/user";
import { toast } from "sonner";
import { useUpdateUserMutation } from "@/redux/features/auth/auth.api";
import { Spinner } from "@/components/ui/spinner";
import { CircleAlert } from "lucide-react";

const profileSchema = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Name is required" : "Invalid Name",
    })
    .min(2, {
      error: (issue) => {
        if (issue.code === "too_small") {
          return `Name must be ${issue.minimum} characters long!`;
        }
      },
    })
    .max(50, {
      error: (issue) => {
        if (issue.code === "too_big") {
          return `Name cannot exceed ${issue.minimum} characters!`;
        }
      },
    })
    .optional(),

  address: z
    .string({
      message: "Please enter a valid address",
    })
    .optional(),
  phone: z
    .string({
      error: () => {
        return "Invalid Phone";
      },
    })
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      error: () => {
        return "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX";
      },
    })
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const EditProfile = () => {
  const location = useLocation();
  const user = location.state?.user as IUser;
  const id = user._id;
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      address: user.address || "",
      phone: user.phone || "",
    },
  });

  const [updateUser, { isLoading, isError }] = useUpdateUserMutation();

  const onSubmit = async (userDetails: ProfileFormValues) => {
    try {
      console.log(userDetails);
      const res = await updateUser({ userId: id, userDetails });
      console.log("res", res);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {isLoading && (
        <div className="flex flex-col items-center gap-4">
          <Button variant="outline" disabled size="sm">
            <Spinner />
            Updating Profile...
          </Button>
        </div>
      )}
      {isError && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mt-2 text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg border border-red-100 shadow-sm"
        >
          <CircleAlert className="h-4 w-4" />
          <span>Something Went Wrong! Please try again.</span>
        </motion.div>
      )}
      {!isLoading && !isError && (
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>Update your personal information.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* General Profile Information */}
                <h3 className="text-lg font-semibold">General Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="+88012345678" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="House 24, Road 113/A Gulshan-2 Dhaka-1212 BANGLADESH"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full mt-6">
                  Update Profile
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EditProfile;

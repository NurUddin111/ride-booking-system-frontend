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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "react-router";
import type { IUser } from "@/types/user";
import { toast } from "sonner";
import { useUpdateUserMutation } from "@/redux/features/auth/auth.api";
import { Spinner } from "@/components/ui/spinner";
import { CircleAlert } from "lucide-react";

const profileSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  address: z
    .string({
      message: "Please enter a valid address",
    })
    .optional(),
  phone: z
    .string({
      message: "Please enter a valid phone number",
    })
    .optional(),
  picture: z.string().optional(),
  role: z.string({
    message: "Please select a role.",
  }),
  vehicleInfo: z.object({
    vehicleType: z
      .string({ message: "Please select a vehicle type." })
      .optional(),
    vehicleModel: z
      .string()
      .min(1, { message: "Vehicle model is required." })
      .optional(),
    vehicleNumberPlate: z
      .string()
      .min(1, { message: "Number plate is required." })
      .optional(),
    documents: z.object({
      drivingLicense: z
        .string()
        .min(1, { message: "Driving license is required." })
        .optional(),
      nidOrPassport: z
        .string()
        .min(1, { message: "NID/Passport is required." })
        .optional(),
      vehicleRegistration: z
        .string()
        .min(1, { message: "Vehicle registration is required." })
        .optional(),
    }),
  }),
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
      address: user.address || undefined,
      phone: user.phone || undefined,
      picture: user.picture || undefined,
      role: user.role,
      vehicleInfo: {
        vehicleType: user.vehicleInfo?.vehicleType || undefined,
        vehicleModel: user.vehicleInfo?.vehicleModel || undefined,
        vehicleNumberPlate: user.vehicleInfo?.vehicleNumberPlate || undefined,
        documents: {
          drivingLicense:
            user.vehicleInfo?.documents?.drivingLicense || undefined,
          nidOrPassport:
            user.vehicleInfo?.documents?.nidOrPassport || undefined,
          vehicleRegistration:
            user.vehicleInfo?.documents?.vehicleRegistration || undefined,
        },
      },
    },
  });

  const role = form.watch("role");

  const [updateUser, { isLoading, isError }] = useUpdateUserMutation();

  const onSubmit = async (userDetails: ProfileFormValues) => {
    try {
      console.log(userDetails);
      const res = await updateUser({ id, userDetails });
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
            <CardDescription>
              Update your personal and vehicle information.
            </CardDescription>
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
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="RIDER">RIDER</SelectItem>
                            <SelectItem value="DRIVER">DRIVER</SelectItem>
                          </SelectContent>
                        </Select>
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
                          <Input placeholder="+1234567890" {...field} />
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
                          <Input placeholder="123 Main St" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Picture Upload Field (Placeholder) */}
                <div className="space-y-2">
                  <Label htmlFor="picture">Profile Picture</Label>
                  <Input id="picture" type="file" />
                </div>

                {/* Conditional Fields for DRIVER Role */}
                {role === "DRIVER" && (
                  <>
                    <Separator />
                    <h3 className="text-lg font-semibold">
                      Vehicle Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="vehicleInfo.vehicleType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Vehicle Type</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., Car, Motorbike"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="vehicleInfo.vehicleModel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Vehicle Model</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., Toyota Camry"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="vehicleInfo.vehicleNumberPlate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number Plate</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., ABC-123" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator />
                    <h3 className="text-lg font-semibold">Documents</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="vehicleInfo.documents.drivingLicense"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Driving License</FormLabel>
                            <FormControl>
                              <Input placeholder="License Number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="vehicleInfo.documents.nidOrPassport"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>NID or Passport</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="NID/Passport Number"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="vehicleInfo.documents.vehicleRegistration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Vehicle Registration</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Registration Number"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                )}

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

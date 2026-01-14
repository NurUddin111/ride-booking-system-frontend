import { KeyRound, User, XCircle, PlayCircle, Dot } from "lucide-react";
import { Button } from "@/components/ui/button";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  useCancelRideMutation,
  useUpdateRideMutation,
} from "@/redux/features/ride/ride.api";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const DriverVehicleArrived = ({
  rideId,
  riderName,
}: {
  rideId: string;
  riderName: string;
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  const [updateRide, { isLoading: updatingRide, isError: updatingRideError }] =
    useUpdateRideMutation();
  const [cancelRide, { isLoading: cancellingRide }] = useCancelRideMutation();
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const updateRideData = {
      status: "ONGOING",
      ...data,
    };
    try {
      await updateRide({ id: rideId, updateDetails: updateRideData }).unwrap();
      toast.success("OTP verified successfully!");
    } catch (error) {
      console.log(error);
      toast.error("OTP verification failed!");
    }
  };
  const handleCancel = async () => {
    try {
      await cancelRide(rideId).unwrap();
      toast.warning("Ride cancelled successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">Vehicle Arrived</h2>
        <p className="text-muted-foreground">
          Confirm rider pickup to start the ride.
        </p>
      </div>

      {/* Rider Info */}
      <div className="rounded-xl border p-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <User className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Rider</p>
          <p className="font-medium">{riderName}</p>
        </div>
      </div>

      {/* OTP Section */}
      <div className="rounded-xl border p-4 space-y-3">
        <div className="flex items-center gap-2">
          <KeyRound className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm font-medium">Enter 6-digit OTP</p>
        </div>

        <>
          {" "}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center justify-center">
                    <FormLabel className="sr-only">One-Time Password</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot index={1} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <Dot />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot index={4} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      Please enter the one-time password sent to your phone.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <p className="text-xs text-muted-foreground">
                Ask the rider for the OTP shown in their app.
              </p>

              <div className="flex gap-3">
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={handleCancel}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  {cancellingRide ? "Cancelling..." : "Cancel"}
                </Button>

                <Button type="submit" className="flex-1">
                  <PlayCircle className="mr-2 h-4 w-4" />
                  {updatingRide ? "Verifying..." : "Start Ride"}
                </Button>
              </div>
              {updatingRideError && (
                <>
                  <p className="text-red-700">
                    "Invalid OTP! Please try again!"
                  </p>
                </>
              )}
            </form>
          </Form>
        </>
      </div>
    </div>
  );
};

export default DriverVehicleArrived;

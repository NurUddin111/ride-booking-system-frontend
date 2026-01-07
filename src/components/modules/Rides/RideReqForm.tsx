import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/assets/icons/Logo";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CircleAlert } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router";
import { useCreateRideMutation } from "@/redux/features/ride/ride.api";
import MapLocation from "@/components/layout/MapLocation";

const formSchema = z.object({
  totalPassengers: z.number().int().min(1, "At least one passenger required"),
  vehicleType: z.string().min(3, "Invalid vehicle type").uppercase(),
  pickUpAddress: z
    .string()
    .min(3, "Address must be at least 3 characters long"),
  destinationAddress: z
    .string()
    .min(3, "Address must be at least 3 characters long"),
});

const RideReqForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      totalPassengers: 0,
      vehicleType: "",
      pickUpAddress: "",
      destinationAddress: "",
    },
  });

  const navigate = useNavigate();
  //   const [signinUser, { isLoading, isError }] = useSigninUserMutation();
  const [createRide, { isLoading, isError }] = useCreateRideMutation();
  const [penalties, setPenalties] = useState(false);
  const [activeRide, setActiveRide] = useState(false);
  const [overPassenger, setOverPassenger] = useState(false);

  const onSubmit = async (rideDetails: z.infer<typeof formSchema>) => {
    try {
      const result = await createRide(rideDetails).unwrap();
      console.log(result);
      form.reset();
      navigate("/");
      toast.success("Ride Requested Successfully!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      const errMsg = error.data.message;
      if (
        errMsg ===
        "To book another ride,please pay the pending fee on your account.We apoligize for any inconvenience."
      ) {
        setPenalties(true);
      }
      if (
        errMsg ===
        "You already have an active ride. Please finish or cancel it before booking another."
      ) {
        setActiveRide(true);
      }

      if (errMsg === `BIKE can carry up to 1 passengers.`) {
        setOverPassenger(true);
      } else if (errMsg === `CNG can carry up to 3 passengers.`) {
        setOverPassenger(true);
      } else if (errMsg === `CAR can carry up to 4 passengers.`) {
        setOverPassenger(true);
      } else if (errMsg === `MICROBUS can carry up to 10 passengers.`) {
        setOverPassenger(true);
      }
    }
  };

  return (
    <Dialog defaultOpen onOpenChange={() => navigate("/")}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <AnimatePresence mode="wait"></AnimatePresence>
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-5"
        >
          <div className="flex flex-col items-center gap-2">
            <div
              className="flex size-11 shrink-0 items-center justify-center rounded-full border"
              aria-hidden="true"
            >
              <div className="flex flex-col items-center gap-2">
                <div
                  className="flex size-11 shrink-0 items-center justify-center rounded-full border"
                  aria-hidden="true"
                >
                  <Logo />
                </div>
              </div>
            </div>
            <DialogHeader>
              <DialogTitle className="sm:text-center">
                Vroom... Vroom...
              </DialogTitle>
              <DialogDescription className="sm:text-center">
                Enter necessary info to request a ride.
              </DialogDescription>
            </DialogHeader>
          </div>

          {isLoading && (
            <div className="flex flex-col items-center gap-4">
              <Button variant="outline" disabled size="sm">
                <Spinner />
                Requesting Ride...
              </Button>
            </div>
          )}

          {isError && penalties && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mt-2 text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg border border-red-100 shadow-sm"
            >
              <CircleAlert className="h-4 w-4" />
              <span>
                To book another ride,please pay the pending fee on your
                account.We apoligize for any inconvenience.
              </span>
            </motion.div>
          )}

          {isError && activeRide && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mt-2 text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg border border-red-100 shadow-sm"
            >
              <CircleAlert className="h-4 w-4" />
              <span>
                You already have an active ride. Please finish or cancel it
                before booking another.
              </span>
            </motion.div>
          )}

          {isError && overPassenger && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mt-2 text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg border border-red-100 shadow-sm"
            >
              <CircleAlert className="h-4 w-4" />
              <span>
                Over Passenger: BIKE 1,CNG 3,CAR 4 and MICROBUS can carry upto
                10 passengers.
              </span>
            </motion.div>
          )}

          {isError && !penalties && !activeRide && !overPassenger && (
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
            <>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="totalPassengers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Passengers</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="1"
                            type="number"
                            min={1}
                            onChange={(e) =>
                              field.onChange(e.target.valueAsNumber)
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="vehicleType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vehicle Type</FormLabel>

                        <Select onValueChange={field.onChange} required>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select A Vehicle" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel className="sr-only">
                                Vehicle Type
                              </SelectLabel>
                              <SelectItem value="BIKE">BIKE</SelectItem>
                              <SelectItem value="CNG">CNG</SelectItem>
                              <SelectItem value="CAR">CAR</SelectItem>
                              <SelectItem value="MICROBUS">MICROBUS</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>

                        <FormDescription className="sr-only">
                          Enter Vehicle Type.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <MapLocation
                    form={form}
                    fieldName="pickUpAddress"
                    label="Pick Up Location"
                  />

                  <MapLocation
                    form={form}
                    fieldName="destinationAddress"
                    label="Drop Off Location"
                  />

                  <Button type="submit" className="w-full">
                    Request Ride
                  </Button>
                </form>
              </Form>
            </>
          )}
          
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default RideReqForm;

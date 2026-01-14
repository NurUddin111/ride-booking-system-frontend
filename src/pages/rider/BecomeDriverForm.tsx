import Logo from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBecomeDriverMutation } from "@/redux/features/auth/auth.api";
import { useNavigate } from "react-router";

const formSchema = z.object({
  vehicleInfo: z.object({
    vehicleType: z.string().min(1, "Vehicle type is required"),
    brand: z.string().min(1, "Vehicle brand is required"),
    vehicleNumberPlate: z.string().min(3, "Invalid number plate"),
    documents: z.object({
      drivingLicense: z.string().min(5, "Driving license is required"),
      nidOrPassport: z.string().min(5, "NID or Passport is required"),
      vehicleRegistration: z
        .string()
        .min(5, "Vehicle registration is required"),
    }),
  }),
});

const BecomeDriverForm = ({ userId }: { userId: string }) => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vehicleInfo: {
        vehicleType: undefined,
        brand: undefined,
        vehicleNumberPlate: "",
        documents: {
          drivingLicense: "",
          nidOrPassport: "",
          vehicleRegistration: "",
        },
      },
    },
  });

  const [becomeDriver, { isLoading, isError }] = useBecomeDriverMutation();

  const onSubmit = async (vehicleInfo: z.infer<typeof formSchema>) => {
    console.log(vehicleInfo);
    try {
      const res = await becomeDriver({ userId: userId, vehicleInfo }).unwrap();
      console.log(res);
      toast.success("Driver request submitted successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Become driver request failed!");
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      {isLoading && (
        <div className="flex flex-col items-center gap-4">
          <Button variant="outline" disabled size="sm">
            <Spinner />
            Submitting Request...
          </Button>
        </div>
      )}

      {isError && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg border border-red-100 shadow-sm"
        >
          <CircleAlert className="h-4 w-4" />
          <span>Something went wrong. Please try again.</span>
        </motion.div>
      )}

      {!isLoading && !isError && (
        <>
          {/* Header */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex size-11 items-center justify-center rounded-full border">
              <Logo />
            </div>
            <Dialog>
              <DialogHeader>
                <DialogTitle className="sm:text-center">
                  Become a Driver
                </DialogTitle>
                <DialogDescription className="sm:text-center">
                  Submit your vehicle details to start earning.
                </DialogDescription>
              </DialogHeader>
            </Dialog>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Vehicle Type */}
              <FormField
                control={form.control}
                name="vehicleInfo.vehicleType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select vehicle type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="BIKE">BIKE</SelectItem>
                        <SelectItem value="CNG">CNG</SelectItem>
                        <SelectItem value="CAR">CAR</SelectItem>
                        <SelectItem value="MICROBUS">MICROBUS</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Brand */}
              <FormField
                control={form.control}
                name="vehicleInfo.brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Brand</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select brand" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="BAJAJ">BAJAJ</SelectItem>
                        <SelectItem value="HERO">HERO</SelectItem>
                        <SelectItem value="TVS">TVS</SelectItem>
                        <SelectItem value="SUZUKI">SUZUKI</SelectItem>
                        <SelectItem value="YAMAHA">YAMAHA</SelectItem>
                        <SelectItem value="PULSAR">PULSAR</SelectItem>
                        <SelectItem value="ROYAL_ENFIELD">
                          ROYAL ENFIELD
                        </SelectItem>
                        <SelectItem value="KTM">KTM</SelectItem>
                        <SelectItem value="FZ">FZ</SelectItem>
                        <SelectItem value="TOYOTA">TOYOTA</SelectItem>
                        <SelectItem value="HYUNDAI">HYUNDAI</SelectItem>
                        <SelectItem value="BMW">BMW</SelectItem>
                        <SelectItem value="OMODA">OMODA</SelectItem>
                        <SelectItem value="MERCEDES_BENZ">
                          MERCEDES BENZ
                        </SelectItem>
                        <SelectItem value="PIAGGIO">PIAGGIO</SelectItem>
                        <SelectItem value="MAHINDRA">MAHINDRA</SelectItem>
                        <SelectItem value="RUNNE">RUNNE</SelectItem>
                        <SelectItem value="NISSAN">NISSAN</SelectItem>
                        <SelectItem value="MITSUBISHI">MITSUBISHI</SelectItem>
                        <SelectItem value="MAZDA">MAZDA</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Number Plate */}
              <FormField
                control={form.control}
                name="vehicleInfo.vehicleNumberPlate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Number Plate</FormLabel>
                    <FormControl>
                      <Input placeholder="LX-3340" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Documents */}
              <FormField
                control={form.control}
                name="vehicleInfo.documents.drivingLicense"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Driving License</FormLabel>
                    <FormControl>
                      <Input placeholder="DL445544" {...field} />
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
                    <FormLabel>NID / Passport</FormLabel>
                    <FormControl>
                      <Input placeholder="4433221188" {...field} />
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
                      <Input placeholder="34fdfd3434" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Submit Driver Request
              </Button>
            </form>
          </Form>
        </>
      )}
    </div>
  );
};

export default BecomeDriverForm;

import Logo from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiGoogleFill } from "@remixicon/react";
import { CircleAlert } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import { useCreateUserRequestMutation } from "@/redux/features/auth/auth.api";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.email().min(5, {
    message: "Email must be at least 5 characters.",
  }),
});
const CredentialsForm = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const [createUser, { isLoading, isError }] = useCreateUserRequestMutation();

  const onSubmit = async (userDetails: z.infer<typeof formSchema>) => {
    try {
      const res = await createUser(userDetails).unwrap();
      console.log(res);
      toast.success("OTP sent successfully");
      navigate("/api/v1/user/signup/verify", { state: res.data.email });
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
            Sending OTP...
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
          <span>Something Went Wrong! Please try again later.</span>
        </motion.div>
      )}

      {!isLoading && !isError && (
        <>
          <div className="flex flex-col items-center gap-2">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-full border">
              <Logo />
            </div>
            <DialogHeader>
              <DialogTitle className="sm:text-center">Safari</DialogTitle>
              <DialogDescription className="sm:text-center text-foreground">
                We just need a few details to get you started.
              </DialogDescription>
            </DialogHeader>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your email address.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Next
              </Button>
            </form>
          </Form>

          <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border my-2">
            <span className="text-xs text-muted-foreground">Or</span>
          </div>

          <Button className="bg-[#DB4437] text-white after:flex-1 hover:bg-[#DB4437]/90 w-full">
            <span className="pointer-events-none me-2 flex-1">
              <RiGoogleFill className="opacity-60" size={16} />
            </span>
            Login with Google
          </Button>
        </>
      )}
    </div>
  );
};

export default CredentialsForm;

import { useId, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/assets/icons/Logo";
import { RiGoogleFill } from "@remixicon/react";
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
import { useSigninUserMutation } from "@/redux/features/auth/auth.api";
import { CircleAlert } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.email().min(5, {
    message: "Email must be at least 5 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const LoginForm = () => {
  const id = useId();
  const location = useLocation();
  const [loggedIn] = useState(location.state);
  console.log(loggedIn);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const [signinUser, { isLoading, isError }] = useSigninUserMutation();
  const [noUser, setNoUser] = useState(false);
  const [wrongPass, setWrongPass] = useState(false);

  const onSubmit = async (credentials: z.infer<typeof formSchema>) => {
    try {
      await signinUser(credentials).unwrap();
      form.reset();
      navigate("/", { state: "loggedIn" });
      toast.success("Logged in successfully");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      if (error?.data.message === "No account found with this email") {
        setNoUser(true);
      }
      if (error?.data.message === "Incorrect Password") {
        setWrongPass(true);
      }
      if (error?.data.message === "User is deleted!") {
        setNoUser(true);
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
              <DialogTitle className="sm:text-center">Welcome back</DialogTitle>
              <DialogDescription className="sm:text-center">
                Enter your credentials to login to your account.
              </DialogDescription>
            </DialogHeader>
          </div>
          {isLoading && (
            <div className="flex flex-col items-center gap-4">
              <Button variant="outline" disabled size="sm">
                <Spinner />
                Logging In...
              </Button>
            </div>
          )}
          {isError && noUser && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mt-2 text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg border border-red-100 shadow-sm"
            >
              <CircleAlert className="h-4 w-4" />
              <span>No account found with this email!</span>
            </motion.div>
          )}
          {isError && wrongPass && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mt-2 text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg border border-red-100 shadow-sm"
            >
              <CircleAlert className="h-4 w-4" />
              <span>Incorrect Password</span>
            </motion.div>
          )}
          {isError && !noUser && !wrongPass && (
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
                          Enter your email address.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="********"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="sr-only">
                          Enter your password.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id={`${id}-remember`} />
                      <Label
                        htmlFor={`${id}-remember`}
                        className="font-normal text-muted-foreground"
                      >
                        Remember me
                      </Label>
                    </div>
                    <a
                      className="text-sm underline hover:no-underline"
                      href="#"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <Button type="submit" className="w-full">
                    Sign in
                  </Button>
                </form>
              </Form>

              <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                <span className="text-xs text-muted-foreground">Or</span>
              </div>

              <Button className="bg-[#DB4437] text-white after:flex-1 hover:bg-[#DB4437]/90 w-full">
                <span className="pointer-events-none me-2 flex-1">
                  <RiGoogleFill
                    className="opacity-60"
                    size={16}
                    aria-hidden="true"
                  />
                </span>
                Login with Google
              </Button>
            </>
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginForm;

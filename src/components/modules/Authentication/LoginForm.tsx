import { useId } from "react";

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
import { useNavigate } from "react-router";
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

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.email().min(5, {
    message: "Email must be at least 5 characters.",
  }),
});

const LoginForm = () => {
  const id = useId();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const navigate = useNavigate();
  // const [createUser, { isLoading, isError }] = useCreateUserMutation();

  // if (isError)
  //   return (
  //     <div>
  //       <h1>Failed to create user</h1>
  //     </div>
  //   );
  // if (isLoading)
  //   return (
  //     <div className="flex justify-center items-center h-[60vh]">
  //       <h1>Loading...</h1>
  //     </div>
  //   );

  const onSubmit = async (userDetails: z.infer<typeof formSchema>) => {
    try {
      // await createUser(userDetails).unwrap();
      form.reset();
      console.log("Email Sent");
    } catch (error) {
      console.log(error);
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>

          <form className="space-y-5">
            <div className="space-y-4">
              <div className="*:not-first:mt-2">
                <Label htmlFor={`${id}-email`}>Email</Label>
                <Input
                  id={`${id}-email`}
                  placeholder="john@example.com"
                  type="email"
                  required
                />
              </div>
              <div className="*:not-first:mt-2">
                <Label htmlFor={`${id}-password`}>Password</Label>
                <Input
                  id={`${id}-password`}
                  placeholder="Enter your password"
                  type="password"
                  required
                />
              </div>
            </div>
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
              <a className="text-sm underline hover:no-underline" href="#">
                Forgot password?
              </a>
            </div>
            <Button type="button" className="w-full">
              Sign in
            </Button>
          </form>

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
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginForm;

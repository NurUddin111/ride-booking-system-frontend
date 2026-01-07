import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert } from "lucide-react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import { Spinner } from "@/components/ui/spinner";
import Logo from "@/assets/icons/Logo";
import { DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { useSignupUserMutation } from "@/redux/features/auth/auth.api";
import { useState } from "react";

const formSchema = z.object({
  password: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Password is required" : "Invalid Password",
    })
    .min(8, {
      error: (issue) => {
        if (issue.code === "too_small") {
          return `Password must be ${issue.minimum} characters long!`;
        }
      },
    })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        error: () => {
          return "Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character.";
        },
      }
    ),
});

const PasswordForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email] = useState(location.state);

  if (!email) {
    navigate("/");
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });
  const [signupUser, { isLoading, isError }] = useSignupUserMutation();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await signupUser(data).unwrap();
      toast.success("Account registered successfully");
      navigate("/api/v1/auth/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="flex flex-col items-center gap-2">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-full border">
          <Logo />
        </div>
        <DialogHeader>
          <DialogDescription className="sm:text-center text-foreground text-xl font-semibold mb-4">
            Set your password
          </DialogDescription>
        </DialogHeader>
      </div>
      {isLoading && (
        <div className="flex flex-col items-center gap-4">
          <Button variant="outline" disabled size="sm">
            <Spinner />
            Creating Account...
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="********" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    Set your password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default PasswordForm;

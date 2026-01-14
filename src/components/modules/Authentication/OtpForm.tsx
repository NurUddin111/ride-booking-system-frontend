"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
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
import { useLocation, useNavigate } from "react-router";
import { CircleAlert, Dot } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import Logo from "@/assets/icons/Logo";
import { DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { useState } from "react";
import { useVerifyUserMutation } from "@/redux/features/auth/auth.api";

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const OtpForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email] = useState(location.state);

  if (!email) {
    navigate("/");
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });
  
  const [verifyUser, { isLoading, isError }] = useVerifyUserMutation();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      await verifyUser(data).unwrap();
      toast.success("OTP verified successfully!");
      navigate("/api/v1/user/signup/password", { state: email });
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
          <DialogDescription className="sm:text-center font-semibold mb-4 text-foreground">
            Verify your email
          </DialogDescription>
          <p className="text-sm text-gray-600 mb-2 text-center">
            OTP sent to <strong>john@example.com</strong>
          </p>
        </DialogHeader>
      </div>
      {isLoading && (
        <div className="flex flex-col items-center gap-4">
          <Button variant="outline" disabled size="sm">
            <Spinner />
            Verifying OTP...
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
          <span>OTP verification failed! Please try again.</span>
        </motion.div>
      )}

      {!isLoading && !isError && (
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

              <Button type="submit" className="w-full">
                Next
              </Button>
              <Button
                variant="ghost"
                type="button"
                className="w-full"
                onClick={() => navigate("/api/v1/user/signup")}
              >
                Back
              </Button>
            </form>
          </Form>
        </>
      )}
    </div>
  );
};

export default OtpForm;

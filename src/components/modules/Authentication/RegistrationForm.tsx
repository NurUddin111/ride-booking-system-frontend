import { useId } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/assets/icons/Logo";
import { RiGoogleFill } from "@remixicon/react";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import OtpForm from "./otpForm";

const RegistrationForm = () => {
  const id = useId();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Dialog defaultOpen onOpenChange={() => navigate("/")}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Name and Email Form */}

            <Route
              path="/"
              element={
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
                      <Logo />
                    </div>
                    <DialogHeader>
                      <DialogTitle className="sm:text-center">
                        Safari
                      </DialogTitle>
                      <DialogDescription className="sm:text-center text-foreground">
                        We just need a few details to get you started.
                      </DialogDescription>
                    </DialogHeader>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      navigate("/api/v1/user/signup/verify");
                    }}
                    className="space-y-5"
                  >
                    <div className="space-y-4">
                      <div className="*:not-first:mt-2">
                        <Label htmlFor={`${id}-name`}>Full Name</Label>
                        <Input
                          id={`${id}-name`}
                          placeholder="John Doe"
                          type="text"
                          required
                        />
                      </div>
                      <div className="*:not-first:mt-2">
                        <Label htmlFor={`${id}-email`}>Email</Label>
                        <Input
                          id={`${id}-email`}
                          placeholder="john@gmail.com"
                          type="email"
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full">
                      Next
                    </Button>
                  </form>

                  <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border my-2">
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
              }
            />

            {/* OTP Form */}

            <Route
              path="verify"
              element={
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {" "}
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="flex size-11 shrink-0 items-center justify-center rounded-full border"
                      aria-hidden="true"
                    >
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
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      navigate("/api/v1/user/signup/password");
                    }}
                    className="space-y-5 flex flex-col items-center"
                  >
                    <OtpForm />
                    <Button type="submit" className="w-full">
                      Verify OTP
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
                </motion.div>
              }
            />

            {/* Password Form */}

            <Route
              path="password"
              element={
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="flex size-11 shrink-0 items-center justify-center rounded-full border"
                      aria-hidden="true"
                    >
                      <Logo />
                    </div>
                    <DialogHeader>
                      <DialogDescription className="sm:text-center text-foreground text-xl font-semibold mb-4">
                        Set your password
                      </DialogDescription>
                    </DialogHeader>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      navigate("/");
                    }}
                    className="space-y-5"
                  >
                    <div className="space-y-4">
                      <div className="*:not-first:mt-2">
                        <Label htmlFor={`${id}-name`}>Password</Label>
                        <Input id={`${id}-password`} type="text" required />
                      </div>
                    </div>
                    <Button type="submit" className="w-full">
                      Submit
                    </Button>
                  </form>
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationForm;

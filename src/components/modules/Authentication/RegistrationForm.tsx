import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import OtpForm from "./OtpForm";

import PasswordForm from "./PasswordForm";
import CredentialsForm from "./CredentialsForm";

const RegistrationForm = () => {
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
                  <CredentialsForm />
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
                  <OtpForm />
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
                  <PasswordForm />
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

"use client";

import { useId } from "react";
import { OTPInput, type SlotProps } from "input-otp";

import { cn } from "@/lib/utils";

const OtpForm = () => {
  const id = useId();
  return (
    <div className="*:not-first:mt-2">
      <OTPInput
        id={id}
        containerClassName="flex items-center gap-3 has-disabled:opacity-50"
        maxLength={6}
        render={({ slots }) => (
          <div className="flex gap-2">
            {slots.map((slot, idx) => (
              <Slot key={idx} {...slot} />
            ))}
          </div>
        )}
      />
    </div>
  );
};

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "flex size-9 items-center justify-center rounded-md border border-input bg-background font-medium text-foreground shadow-xs transition-[color,box-shadow]",
        { "z-10 border-ring ring-[3px] ring-ring/50": props.isActive }
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
    </div>
  );
}

export default OtpForm;

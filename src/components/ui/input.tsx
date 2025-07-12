import * as React from "react";
import { cn } from "../../lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-white placeholder-white/60 border-input flex h-11 w-full min-w-0 rounded-lg border bg-[#22242A] text-white px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none",
        "focus-visible:border-[#d0ff7d] focus-visible:ring-2 focus-visible:ring-[#d0ff7d]",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Input };

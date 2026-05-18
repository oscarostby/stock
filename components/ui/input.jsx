import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-11 w-full rounded-[4px] border-2 border-lime-300/45 bg-[#050805] px-4 py-2 text-base text-lime-50 shadow-[inset_2px_2px_3px_rgba(0,0,0,0.92)] transition-colors placeholder:text-lime-100/40 focus-visible:border-lime-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-lime-300/20 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  );
}

export { Input };

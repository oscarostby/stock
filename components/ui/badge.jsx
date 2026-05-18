import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-[4px] border px-3 py-1 text-xs font-black w-fit whitespace-nowrap shrink-0 gap-1 transition-colors overflow-hidden shadow-[inset_0_1px_rgba(255,255,255,0.72),0_2px_0_#000]",
  {
    variants: {
      variant: {
        default: "border-lime-200 bg-[linear-gradient(180deg,#eefc83,#8be11a_47%,#58ad08_48%,#91eb1d)] text-[#061006]",
        secondary: "border-lime-300/50 bg-[#10170f] text-lime-100",
        outline: "border-lime-300/70 bg-[linear-gradient(180deg,#ffffff,#cbd2c7_48%,#8d9989_49%,#d9dfd4)] text-[#061006]",
        trust: "border-lime-200 bg-[linear-gradient(180deg,#eefc83,#8be11a_47%,#58ad08_48%,#91eb1d)] text-[#061006]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className, variant, ...props }) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };

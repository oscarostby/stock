import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[5px] border text-sm font-black transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-lime-200 focus-visible:ring-lime-300/30 focus-visible:ring-[3px] aria-invalid:ring-red-500/20 aria-invalid:border-red-500",
  {
    variants: {
      variant: {
        default: "border-lime-200 bg-[linear-gradient(180deg,#e8ff81,#96df21_52%,#5aa40b)] text-[#061006] shadow-[inset_0_1px_rgba(255,255,255,0.72),0_8px_18px_rgba(0,0,0,0.28)] hover:brightness-110",
        destructive: "border-red-200 bg-[linear-gradient(180deg,#ffb7b7,#d43b3b)] text-white shadow-[0_8px_18px_rgba(0,0,0,0.28)] hover:brightness-110",
        outline: "border-lime-300/45 bg-[linear-gradient(180deg,#ffffff,#d8dfd4_55%,#a3aca0)] text-[#061006] shadow-[inset_0_1px_rgba(255,255,255,0.82),0_8px_18px_rgba(0,0,0,0.24)] hover:brightness-110",
        secondary: "border-lime-300/35 bg-[#111711] text-lime-100 shadow-[0_8px_18px_rgba(0,0,0,0.24)] hover:bg-[#182016]",
        ghost: "border-transparent text-lime-100 hover:border-lime-300/50 hover:bg-lime-300/10",
        link: "border-transparent text-lime-200 underline-offset-4 hover:underline",
        brand: "border-lime-200 bg-[linear-gradient(180deg,#e8ff81,#96df21_52%,#5aa40b)] !text-[#061006] shadow-[inset_0_1px_rgba(255,255,255,0.72),0_8px_18px_rgba(0,0,0,0.28)] hover:brightness-110",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-[5px] px-4",
        lg: "h-12 rounded-[5px] px-6 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };

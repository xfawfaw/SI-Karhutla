"use client";

import { cn } from "@/lib/utils";
import { motion, useInView, Variants } from "framer-motion";
import React, { useRef } from "react";

type HighlightDirection = "left" | "right" | "top" | "bottom";

interface TactileHighlightProps {
  children: React.ReactNode;
  className?: string;
  highlightClassName?: string;
  direction?: HighlightDirection;
  delay?: number;
  trigger?: "auto" | "hover" | "inView";
}

/**
 * TactileHighlight - A premium animated text highlight component.
 * High-contrast spring reveal with crisp solid typography.
 * Eliminates blend-mode washouts so text is always crystal clear.
 */
export const TactileHighlight = ({
  children,
  className,
  highlightClassName,
  direction = "left",
  delay = 0.1,
  trigger = "inView",
}: TactileHighlightProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-10%" });

  const isAnimated = trigger === "auto" || (trigger === "inView" && isInView);

  const variants: Variants = {
    hidden: {
      scaleX: direction === "left" || direction === "right" ? 0 : 1,
      scaleY: direction === "top" || direction === "bottom" ? 0 : 1,
      originX: direction === "left" ? 0 : direction === "right" ? 1 : 0.5,
      originY: direction === "top" ? 0 : direction === "bottom" ? 1 : 0.5,
      borderRadius: "12px",
    },
    visible: {
      scaleX: 1,
      scaleY: 1,
      borderRadius: "4px",
      transition: {
        type: "spring",
        damping: 22,
        stiffness: 130,
        mass: 0.8,
        delay: delay,
      },
    },
    hover: {
      scale: 1.03,
      rotate: direction === "left" ? -0.8 : direction === "right" ? 0.8 : 0,
      borderRadius: "6px",
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 400,
      },
    },
  };

  return (
    <span
      ref={ref}
      className={cn(
        "relative inline-block whitespace-nowrap cursor-default group/tactile",
        className
      )}
      style={{ padding: "0 0.18em", margin: "0 -0.05em" }}
    >
      {/* Animated Tactile Highlight Plate */}
      <motion.span
        initial="hidden"
        animate={isAnimated ? "visible" : "hidden"}
        whileHover={trigger === "hover" ? "visible" : "hover"}
        variants={variants}
        className={cn(
          "absolute inset-0 bg-[#121212] shadow-xl z-0 origin-[var(--origin-x)_var(--origin-y)]",
          highlightClassName
        )}
        style={
          {
            "--origin-x":
              direction === "left" ? 0 : direction === "right" ? 1 : 0.5,
            "--origin-y":
              direction === "top" ? 0 : direction === "bottom" ? 1 : 0.5,
          } as React.CSSProperties
        }
      />

      {/* Crisp Solid Text Layer (High Contrast Guaranteed) */}
      <span className="relative z-10 pointer-events-none inline-block">
        {children}
      </span>
    </span>
  );
};

export default TactileHighlight;

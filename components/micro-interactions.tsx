"use client";

import { motion, type HTMLMotionProps } from "motion/react";

const revealTransition = {
  duration: 0.58,
  ease: [0.22, 1, 0.36, 1],
} as const;

export function Reveal({
  children,
  delay = 0,
  ...props
}: HTMLMotionProps<"div"> & {
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ ...revealTransition, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function InteractiveDiv(props: HTMLMotionProps<"div">) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 360, damping: 28 }}
      {...props}
    />
  );
}

export function InteractiveArticle(props: HTMLMotionProps<"article">) {
  return (
    <motion.article
      whileHover={{ y: -5, scale: 1.006 }}
      whileTap={{ scale: 0.995 }}
      transition={{ type: "spring", stiffness: 330, damping: 30 }}
      {...props}
    />
  );
}

export function InteractiveBlockquote(props: HTMLMotionProps<"blockquote">) {
  return (
    <motion.blockquote
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 340, damping: 30 }}
      {...props}
    />
  );
}

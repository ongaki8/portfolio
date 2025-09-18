// src/app/components/icons/AIAssistantIcon.tsx
"use client";

import { motion } from "framer-motion";
import { Bot } from "lucide-react";

export default function AIAssistantIcon({ size = 20 }: { size?: number }) {
  return (
    <motion.div
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 3, // faster cycle
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        width: size, // thicker border
        height: size,
        borderRadius: "9999px",
        padding: "5px",
        backgroundImage:
          "linear-gradient(270deg, #3b82f6, #9333ea, #f43f5e, #22c55e, #3b82f6)", // more vivid colors
        backgroundSize: "400% 400%", // more space for motion
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "9999px",
          backgroundColor: "#111", // inner background
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Bot size={size * 0.65} color="white" strokeWidth={2} />
      </div>
    </motion.div>
  );
}
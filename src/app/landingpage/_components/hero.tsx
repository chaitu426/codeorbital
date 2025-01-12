/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { ArrowRight as IconArrowRight } from "../../(root)/_components/icons";

export function Hero() {
  const cursorImageAnimateControls = useAnimation();
  const messageImageAnimateControls = useAnimation();

  const floatAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const wordRevealAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const startFloating = (controls: any) => {
    controls.start(floatAnimation);
  };

  useEffect(() => {
    startFloating(cursorImageAnimateControls);
    startFloating(messageImageAnimateControls);
  }, [cursorImageAnimateControls, messageImageAnimateControls]);

  const headingWords = ["Elevate", "Your", "Workflow"];

  return (
    <div className="relative bg-gradient-to-b from-[#080914] via-[#14192e] to-[#0a101b] text-white py-20 sm:py-32 overflow-hidden">
      {/* Background Accent */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-[140%] h-[140%] rounded-full bg-gradient-radial from-[#6e57e0] to-[#111] blur-[200px] mx-auto -translate-x-1/4"></div>
      </div>

      <motion.div
        className="container mx-auto px-6 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        {/* Announcement */}
        <motion.div
          className="flex justify-center"
          variants={wordRevealAnimation}
        >
          <a
            href="#"
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 text-sm text-white backdrop-blur-md hover:bg-white/20 transition"
          >
            <span>🚀 Introducing Version 3.0</span>
            <IconArrowRight />
          </a>
        </motion.div>

        {/* Animated Heading */}
        <motion.div
          className="mt-16 text-center flex flex-wrap justify-center gap-4 sm:gap-6"
          variants={staggerContainer}
        >
          {headingWords.map((word, index) => (
            <motion.span
              key={index}
              className="text-6xl sm:text-8xl font-extrabold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#4f46e5] via-[#8b5cf6] to-[#ec4899]"
              variants={wordRevealAnimation}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        {/* Subtitle */}
        <motion.div
          className="mt-6 text-center"
          variants={wordRevealAnimation}
        >
          <p className="text-lg max-w-xl mx-auto text-white/80">
            Empower your team with cutting-edge AI solutions designed to simplify tasks, boost efficiency, and maximize results.
          </p>
        </motion.div>

        {/* Animations */}
        <motion.div
          className="relative mt-16 flex justify-center"
          variants={wordRevealAnimation}
        >
          <div className="relative">
            <motion.img
              src="/cursor.svg"
              alt="Cursor"
              drag
              dragSnapToOrigin
              initial={{ y: 0 }}
              animate={cursorImageAnimateControls}
              onDragStart={() => cursorImageAnimateControls.stop()}
              onDragEnd={() =>
                cursorImageAnimateControls.start(floatAnimation)
              }
              className="absolute h-20 w-20 sm:h-32 sm:w-32 left-[-100px]"
            />
            <motion.img
              src="/message.svg"
              alt="Message"
              drag
              dragSnapToOrigin
              initial={{ y: 0 }}
              animate={messageImageAnimateControls}
              onDragStart={() => messageImageAnimateControls.stop()}
              onDragEnd={() =>
                messageImageAnimateControls.start(floatAnimation)
              }
              className="absolute h-20 w-20 sm:h-32 sm:w-32 right-[-100px]"
            />
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="mt-12 flex justify-center gap-4"
          variants={wordRevealAnimation}
        >
          <button className="px-8 py-3 rounded-full bg-gradient-to-r from-[#6e57e0] to-[#ec4899] text-white font-medium text-lg shadow-lg hover:opacity-90 transition">
            Start Free Trial
          </button>
          <button className="px-8 py-3 rounded-full border border-white/20 text-white font-medium text-lg hover:bg-white/10 transition">
            Learn More
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

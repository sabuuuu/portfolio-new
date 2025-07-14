/* eslint-disable react-hooks/rules-of-hooks */
/*
	Installed from https://reactbits.dev/ts/tailwind/
*/

import { useEffect, useState, useRef } from "react";
import { motion, type PanInfo, useMotionValue, useTransform, type Transition } from "framer-motion";
import React, { type JSX } from "react";

// replace icons with your own if needed
import {
  FiCircle,
  FiCode,
  FiFileText,
  FiLayers,
  FiLayout,
} from "react-icons/fi";
export interface CarouselItem {
  title: string;
  description: string;
  id: number;
  icon: React.ReactNode;
}

export interface CarouselProps {
  items?: CarouselItem[];
  baseWidth?: number;
  baseHeight?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  round?: boolean;
}

const DEFAULT_ITEMS: CarouselItem[] = [
  {
    title: "Text Animations",
    description: "Cool text animations for your projects.",
    id: 1,
    icon: <FiFileText className="h-[24px] w-[24px] text-white" />,
  },
  {
    title: "Animations",
    description: "Smooth animations for your projects.",
    id: 2,
    icon: <FiCircle className="h-[24px] w-[24px] text-white" />,
  },
  {
    title: "Components",
    description: "Reusable components for your projects.",
    id: 3,
    icon: <FiLayers className="h-[24px] w-[24px] text-white" />,
  },
  {
    title: "Backgrounds",
    description: "Beautiful backgrounds and patterns for your projects.",
    id: 4,
    icon: <FiLayout className="h-[24px] w-[24px] text-white" />,
  },
  {
    title: "Common UI",
    description: "Common UI components are coming soon!",
    id: 5,
    icon: <FiCode className="h-[24px] w-[24px] text-white" />,
  },
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS: Transition = { type: "spring", stiffness: 300, damping: 30 };

export default function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth = 300,
  baseHeight = 180,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
}: CarouselProps): JSX.Element {
  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const itemHeight = round ? itemWidth : baseHeight;
  const trackItemOffset = itemWidth + GAP;

  // For better looping experience, duplicate items multiple times if there are few items
  const shouldEnhanceLoop = loop && items.length <= 3;
  const carouselItems = shouldEnhanceLoop 
    ? [...items, ...items, ...items, items[0]] 
    : loop 
    ? [...items, items[0]] 
    : items;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (shouldEnhanceLoop) {
            // For enhanced loop, reset when we reach the end of the enhanced sequence
            if (prev >= items.length * 3) {
              return 0;
            }
            return prev + 1;
          } else if (loop) {
            // Original loop logic
            if (prev === items.length - 1) {
              return prev + 1;
            }
            if (prev === carouselItems.length - 1) {
              return 0;
            }
            return prev + 1;
          } else {
            // No loop
            if (prev === carouselItems.length - 1) {
              return prev;
            }
            return prev + 1;
          }
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [
    autoplay,
    autoplayDelay,
    isHovered,
    loop,
    items.length,
    carouselItems.length,
    pauseOnHover,
    shouldEnhanceLoop,
  ]);

  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (shouldEnhanceLoop && currentIndex >= items.length * 3) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    } else if (loop && !shouldEnhanceLoop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ): void => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (shouldEnhanceLoop) {
        setCurrentIndex((prev) => (prev + 1) % (items.length * 3 + 1));
      } else if (loop && currentIndex === items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      if (shouldEnhanceLoop) {
        setCurrentIndex((prev) => (prev - 1 + items.length * 3 + 1) % (items.length * 3 + 1));
      } else if (loop && currentIndex === 0) {
        setCurrentIndex(items.length - 1);
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * (carouselItems.length - 1),
          right: 0,
        },
      };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden p-4 ${
        round
          ? "rounded-full border border-white"
          : "rounded-[24px] border border-[#222]"
      }`}
      style={{
        width: `${baseWidth}px`,
        height: round ? `${baseWidth}px` : `${itemHeight + 32}px`,
      }}
    >
      <motion.div
        className="flex"
        drag="x"
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${currentIndex * trackItemOffset + itemWidth / 2}px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((item, index) => {
          const range = [
            -(index + 1) * trackItemOffset,
            -index * trackItemOffset,
            -(index - 1) * trackItemOffset,
          ];
          const outputRange = [90, 0, -90];
          const rotateY = useTransform(x, range, outputRange, { clamp: false });
          return (
            <motion.div
              key={index}
              className={`relative shrink-0 flex flex-col ${
                round
                  ? "items-center justify-center text-center bg-[#060010] border-0"
                  : "items-start justify-between bg-[#0e0e0e] border border-[#222] rounded-[12px]"
              } overflow-hidden cursor-grab active:cursor-grabbing`}
              style={{
                width: itemWidth,
                height: itemHeight,
                rotateY: rotateY,
                ...(round && { borderRadius: "50%" }),
              }}
              transition={effectiveTransition}
            >
              {round ? (
                <div className="flex flex-col items-center justify-center h-full p-4">
                  <div className="mb-3">
                    <span className="flex h-[50px] w-[50px] items-center justify-center rounded-full border border-gray-700/50 text-[#FCF7F8]">
                      {item.icon}
                    </span>
                  </div>
                  <div className="text-center">
                    <div className="mb-1 font-semibold text-lg text-[#FCF7F8]">
                      {item.title}
                    </div>
                    <p className="text-sm text-[#FCF7F8]">{item.description}</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="p-5 pb-0">
                    <span className="flex h-[60px] w-[60px] items-center justify-center rounded-full border border-gray-700/50 text-[#FCF7F8]">
                      {item.icon}
                    </span>
                  </div>
                  <div className="p-5 pt-4 flex-1 flex flex-col justify-end">
                    <div className="mb-2 font-semibold text-lg text-[#FCF7F8]">
                      {item.title}
                    </div>
                    <p className="text-sm text-[#FCF7F8] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          );
        })}
      </motion.div>
      <div
        className={`flex w-full justify-center ${
          round ? "absolute z-20 bottom-12 left-1/2 -translate-x-1/2" : ""
        }`}
      >
        <div className="mt-4 flex w-[150px] justify-between px-8">
          {items.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-150 ${
                (currentIndex % items.length) === index
                  ? round
                    ? "bg-white"
                    : "bg-[#333333]"
                  : round
                    ? "bg-[#555]"
                    : "bg-[rgba(51,51,51,0.4)]"
              }`}
              animate={{
                scale: (currentIndex % items.length) === index ? 1.2 : 1,
              }}
              onClick={() => setCurrentIndex(index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
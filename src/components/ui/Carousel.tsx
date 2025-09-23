"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SlideData {
  title: string;
  buttonLabel?: string;
  src: string;
  href?: string;
  extraButtonLabel?: string;
  extraButtonHref?: string;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  animationId: number;
}

const Slide = ({ slide, index, current, animationId }: SlideProps) => {
  const { src, title, buttonLabel, href, extraButtonLabel, extraButtonHref } = slide;
  const isCurrent = current === index;

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
        isCurrent ? "opacity-100 z-20" : "opacity-0 z-10"
      }`}
    >
      <Image
        src={src}
        alt={title}
        fill
        sizes="100vw"
        priority={index === 0}
        className={`object-cover h-full w-full transition-opacity duration-700 ease-in-out ${
          isCurrent ? "animate-fade-in-scale" : ""
        }`}
      />
      <div className="absolute inset-0 bg-black/40 z-10" />

      {isCurrent && (
        <article
          key={`content-${animationId}`}
          className="relative z-20 px-4 sm:px-6 md:px-10 py-8 max-w-[90%] sm:max-w-2xl text-left flex flex-col justify-center h-full animate-slide-in-right"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            {title}
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            {href && (
              <Link href={href} className="w-full sm:w-auto">
                <Button
                  className="w-full sm:w-auto text-center min-h-[48px]"
                  borderClassName="px-4 sm:px-6 py-3 bg-black/75 dark:bg-black/75 border-slate-800"
                  borderRadius="1.75rem"
                >
                  {buttonLabel} <span className="ml-2">&rarr;</span>
                </Button>
              </Link>
            )}

            {index === 0 && extraButtonLabel && extraButtonHref && (
              <Link href={extraButtonHref} className="w-full sm:w-auto">
                <Button
                  className="w-full sm:w-auto text-center min-h-[48px]"
                  borderClassName="px-4 sm:px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 border-slate-800"
                  borderRadius="1.75rem"
                >
                  {extraButtonLabel} <span className="ml-2">&rarr;</span>
                </Button>
              </Link>
            )}
          </div>
        </article>
      )}
    </div>
  );
};

interface CarouselProps {
  slides: SlideData[];
  current: number;
  onSlideChange: (index: number) => void;
}

export function Carousel({ slides, current, onSlideChange }: CarouselProps) {
  const [animationId, setAnimationId] = useState(0);
  const id = useId();

  useEffect(() => {
    const interval = setInterval(() => {
      const next = (current + 1) % slides.length;
      onSlideChange(next);
      setAnimationId((prev) => prev + 1);
    }, 7000);

    return () => clearInterval(interval);
  }, [current, onSlideChange, slides.length]);

  const handleSlideClick = (index: number) => {
    if (index !== current) {
      onSlideChange(index);
      setAnimationId((prev) => prev + 1);
    }
  };

  return (
    <div
      className="relative h-[60vh] sm:h-[80vh] lg:h-[100vh] w-full overflow-hidden"
      aria-labelledby={`carousel-heading-${id}`}
    >
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            index={index}
            current={current}
            animationId={animationId}
          />
        ))}
      </div>

      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-4 z-30">
        <button
          onClick={() =>
            handleSlideClick((current - 1 + slides.length) % slides.length)
          }
          className="p-2 bg-white/80 hover:bg-white rounded-full shadow-md"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-4 h-4 text-black" />
        </button>

        <button
          onClick={() => handleSlideClick((current + 1) % slides.length)}
          className="p-2 bg-white/80 hover:bg-white rounded-full shadow-md"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-4 h-4 text-black" />
        </button>
      </div>
    </div>
  );
}

"use client"

// ─── Reveal — shared scroll-reveal primitive ──────────────────────────────────
// Why: one IntersectionObserver-based component instead of per-page ad-hoc
// animation logic. CSS transitions only (no framer-motion dependency).
// Fires once, cleans up its observer, and renders content visible by default
// when IntersectionObserver is unavailable (SSR-safe, no blank content).

import { useEffect, useRef, useState, type ReactNode } from "react"

type Direction = "up" | "down" | "left" | "right" | "none"

interface RevealProps {
  children: ReactNode
  /** Slide-in direction. "none" = fade only. */
  direction?: Direction
  /** Transition delay in ms — use for stagger effects. */
  delay?: number
  /** Transition duration in ms. */
  duration?: number
  /** Extra classes on the wrapper. */
  className?: string
  /** Distance of the slide in px. */
  distance?: number
}

const OFFSETS: Record<Direction, string> = {
  up: "translateY(VARpx)",
  down: "translateY(-VARpx)",
  left: "translateX(VARpx)",
  right: "translateX(-VARpx)",
  none: "none",
}

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 650,
  className = "",
  distance = 24,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    // Graceful fallback: show content immediately if IO is unsupported.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true)
          observer.disconnect() // fire once — no re-hide on scroll-up
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const hiddenTransform =
    direction === "none" ? "none" : OFFSETS[direction].replace("VAR", String(distance))

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : hiddenTransform,
        transition: `opacity ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  )
}

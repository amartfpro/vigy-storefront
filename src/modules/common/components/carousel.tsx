"use client"

import { useRef } from "react"

export const Carousel = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (!ref.current) return
    const scrollAmount = 300
    ref.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    })
  }

  return (
    <div className="relative">
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow p-2 z-10"
      >
        ◀
      </button>

      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto scrollbar-hide"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {children}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow p-2 z-10"
      >
        ▶
      </button>
    </div>
  )
}

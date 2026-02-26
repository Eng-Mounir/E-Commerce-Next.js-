"use client"

import * as React from "react"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

interface ImageCarouselProps {
  images: string[]
  title: string
}

export default function ImageCarousel({ images, title }: ImageCarouselProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) return

    setCount(images.length)

    const onSelect = () => {
      // Get the selected index from the carousel API
      // Try different methods to ensure we get the correct index
      let selectedIndex = 0
      
      try {
        // Method 1: Try direct selectedIndex property
        if (typeof api.selectedIndex === 'number') {
          selectedIndex = api.selectedIndex
        } 
        // Method 2: Use scroll position if available
        else if (api.scrollProgress && typeof api.scrollProgress === 'function') {
          const progress = api.scrollProgress()
          selectedIndex = Math.round(progress * (images.length - 1))
        }
        // Method 3: Fallback to checking scroll snaps
        else if (api.scrollSnapList && typeof api.scrollSnapList === 'function') {
          const snapList = api.scrollSnapList()
          selectedIndex = snapList.length > 0 ? Math.min(snapList.length - 1, Math.round(api.scrollProgress?.() || 0 * (snapList.length - 1))) : 0
        }
      } catch (e) {
        console.debug("Error getting selectedIndex:", e)
        selectedIndex = 0
      }

      setCurrent(Math.max(0, Math.min(selectedIndex, images.length - 1)))
    }

    onSelect()
    api.on("select", onSelect)

    return () => {
      api.off("select", onSelect)
    }
  }, [api, images.length])

  const scrollToIndex = (index: number) => {
    plugin.current.stop()
    if (api) {
      api.scrollTo(index)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main Carousel */}
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full rounded-lg overflow-hidden bg-gray-200"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="relative">
          {images.map((img, index) => (
            <CarouselItem key={index} className="relative w-full h-125">
              <Image
                src={img}
                alt={`${title} ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 396px"
                className="object-cover"
                priority={index === 0}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <CarouselPrevious className="left-4 bg-black/50 hover:bg-black/70 text-white border-0" />
            <CarouselNext className="right-4 bg-black/50 hover:bg-black/70 text-white border-0" />
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
            {current + 1} / {count}
          </div>
        )}
      </Carousel>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`relative w-20 h-20 bg-gray-200 rounded-lg shrink-0 overflow-hidden border-2 transition-all ${
                index === current
                  ? "border-black ring-2 ring-black"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <Image
                src={img}
                alt={`${title} thumbnail ${index + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

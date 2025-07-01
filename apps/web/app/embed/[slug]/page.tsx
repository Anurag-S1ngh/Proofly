"use client";

import { TestimonialCard } from "@/components/testimonial-card-selector";
import { TestimonialInterface } from "@/util/types";
import { GetWallOfFame } from "@/util/util";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@workspace/ui/components/carousel";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { useTheme } from "next-themes";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Embed() {
  const embedHeight = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") ?? "light";
  const layout = searchParams.get("layout") ?? "masonry";
  const testimonialsCardStyle = searchParams.get("testimonialsCard") ?? "1";
  const { setTheme } = useTheme();
  useEffect(() => {
    mode === "dark" ? setTheme("dark") : setTheme("light");
  }, []);
  const [testimonials, setTestimonials] = useState<TestimonialInterface[]>();
  const userId = useParams().slug;

  useEffect(() => {
    if (!embedHeight.current) return;

    const resizeObserver = new ResizeObserver(() => {
      const height = embedHeight.current!.scrollHeight;
      window.parent.postMessage({ type: "setHeight", height }, "*");
    });

    resizeObserver.observe(embedHeight.current);

    return () => resizeObserver.disconnect();
  }, [embedHeight, testimonials]);

  useEffect(() => {
    async function main() {
      const response = await GetWallOfFame(userId as string);
      setTestimonials(response);
      return;
    }
    main();
  }, []);

  if (layout === "carousel") {
    return (
      <div
        ref={embedHeight}
        className="w-full flex justify-center items-center"
      >
        <Carousel className="w-full max-w-lg">
          <CarouselContent className="flex items-center">
            {testimonials &&
              testimonials.map((testimonial) => {
                return (
                  <CarouselItem
                    className="flex justify-center"
                    key={testimonial.id}
                  >
                    <TestimonialCard
                      testimonialsCardStyle={testimonialsCardStyle}
                      testimonial={testimonial}
                    />
                  </CarouselItem>
                );
              })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    );
  }
  return (
    <div ref={embedHeight} className="w-full flex justify-center items-center">
      <div style={{ columnFill: "balance" }} className="columns-2 gap-[5%]">
        {testimonials ? (
          testimonials.map((testimonial) => {
            return (
              <div key={testimonial.id} className="break-inside-avoid ">
                <TestimonialCard
                  testimonialsCardStyle={testimonialsCardStyle}
                  testimonial={testimonial}
                />
              </div>
            );
          })
        ) : (
          <>
            <Skeleton className="h-80 w-sm rounded-xl break-inside-avoid mb-3" />
            <Skeleton className="h-44 w-sm rounded-xl break-inside-avoid mb-3" />
            <Skeleton className="h-64 w-sm rounded-xl break-inside-avoid mb-3" />
            <Skeleton className="h-56 w-sm rounded-xl break-inside-avoid mb-3" />
          </>
        )}
      </div>
    </div>
  );
}

import { TestimonialInterface } from "@/util/types";
import { Star } from "lucide-react";

export const TestimonialCard2 = ({
  testimonial,
  className,
}: {
  testimonial: TestimonialInterface;
  className?: string;
}) => {
  return (
    <>
      <div
        key={testimonial.id}
        className={`${className} py-5 px-8 w-md border rounded-2xl flex flex-col gap-2 bg-gray-50 dark:bg-neutral-800 mb-3 `}
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center gap-2">
            <p className="text-base">
              {testimonial.stars}.0
              <span className="text-xs text-neutral-400">/5</span>
            </p>
            <div className="flex justify-center items-center">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  size={15}
                  className={
                    testimonial.stars > i
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-neutral-400"
                  }
                />
              ))}
            </div>
          </div>
        </div>
        {testimonial.type === "text" ? (
          <p className="text-neutral-800 dark:text-neutral-200 leading-6 tracking-tight break-words whitespace-normal text-left">
            {testimonial.description}
          </p>
        ) : (
          <video
            className="rounded-lg bg-black"
            controls
            src={testimonial.videoURL}
          />
        )}
        <div className="flex justify-start items-center gap-2">
          <div className="bg-violet-500 h-8 w-8 rounded-full flex justify-center items-center">
            <h6 className="text-white text-sm">
              {testimonial.user.firstName[0]}
            </h6>
          </div>
          <h1 className="whitespace-nowrap capitalize ">
            {testimonial.user.firstName} {testimonial.user.lastName}
          </h1>
        </div>
      </div>
    </>
  );
};

import { TestimonialInterface } from "@/util/types";
import { Star } from "lucide-react";

export const TestimonialCard1 = ({
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
        className={`py-5 px-8 w-md border rounded-2xl flex flex-col gap-4 bg-gray-50 dark:bg-neutral-800 mb-3 ${className}`}
      >
        <div className="flex gap-2 items-center">
          <div className="h-10 w-10 bg-violet-500 rounded-full flex justify-center items-center">
            <h6 className="text-white text-lg">
              {testimonial.user.firstName[0]}
            </h6>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="whitespace-nowrap capitalize text-base text-left">
              {testimonial.user.firstName} {testimonial.user.lastName}
            </h1>
            <div className="flex">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  size={16}
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
      </div>
    </>
  );
};

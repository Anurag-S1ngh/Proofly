import { TestimonialInterface } from "@/util/types";
import { Star } from "lucide-react";

export const TestimonialCard3 = ({
  testimonial,
  className,
}: {
  testimonial: TestimonialInterface;
  className?: string;
}) => {
  return (
    <>
      <div key={testimonial.id} className={`flex gap-2 w-md mb-3 ${className}`}>
        <div className="self-end">
          <div className="h-10 w-10 bg-violet-500 self-end rounded-full mb-3 flex justify-center items-center">
            <h6 className="text-white text-lg">
              {testimonial.user.firstName[0]}
            </h6>
          </div>
        </div>
        <div className="py-3 px-6 w-full border rounded-2xl flex flex-col gap-2 bg-gray-50 dark:bg-neutral-800">
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
          <div className="flex flex-col justify-start gap-1">
            <h1 className="whitespace-nowrap capitalize text text-left">
              {testimonial.user.firstName} {testimonial.user.lastName}
            </h1>
            <div className="flex justify-center items-center w-fit">
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
      </div>
    </>
  );
};

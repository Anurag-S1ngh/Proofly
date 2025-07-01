import { TestimonialInterface } from "@/util/types";
import { Separator } from "@workspace/ui/components/separator";
import { Star } from "lucide-react";

export const TestimonialCard4 = ({
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
        className={`py-5 px-8 w-md border rounded-2xl flex flex-col gap-3 bg-gray-50 dark:bg-neutral-800 mb-3 ${className}`}
      >
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
        <div className="flex flex-col justify-start">
          <div className="flex justify-center items-center  w-fit mb-2">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                size={17}
                className={
                  testimonial.stars > i
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-neutral-400"
                }
              />
            ))}
          </div>
          <Separator />
          <h1 className="whitespace-nowrap capitalize mt-2 self-end text-violet-600 font-semibold">
            - {testimonial.user.firstName} {testimonial.user.lastName}
          </h1>
        </div>
      </div>
    </>
  );
};

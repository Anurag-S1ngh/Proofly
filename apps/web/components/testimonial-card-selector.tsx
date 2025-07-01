import { TestimonialInterface } from "@/util/types";
import { TestimonialCard1 } from "./testimonial-card-1";
import { TestimonialCard2 } from "./testimonial-card-2";
import { TestimonialCard3 } from "./testimonial-card-3";
import { TestimonialCard4 } from "./testimonial-card-4";

export const TestimonialCard = ({
  testimonialsCardStyle,
  testimonial,
}: {
  testimonialsCardStyle: string;
  testimonial: TestimonialInterface;
}) => {
  if (testimonialsCardStyle === "1") {
    return (
      <>
        <TestimonialCard1 testimonial={testimonial} />
      </>
    );
  } else if (testimonialsCardStyle === "2") {
    return (
      <>
        <TestimonialCard2 testimonial={testimonial} />
      </>
    );
  } else if (testimonialsCardStyle === "3") {
    return (
      <>
        <TestimonialCard3 testimonial={testimonial} />
      </>
    );
  } else {
    return (
      <>
        <TestimonialCard4 testimonial={testimonial} />
      </>
    );
  }
};

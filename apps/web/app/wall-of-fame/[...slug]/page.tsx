"use client";

import Footer from "@/components/footer";
import { NavBar } from "@/components/nav-bar";
import { TestimonialCard1 } from "@/components/testimonial-card-1";
import { TestimonialCard2 } from "@/components/testimonial-card-2";
import { TestimonialCard3 } from "@/components/testimonial-card-3";
import { TestimonialCard4 } from "@/components/testimonial-card-4";
import { TestimonialCard } from "@/components/testimonial-card-selector";
import { TestimonialInterface } from "@/util/types";
import { Button } from "@workspace/ui/components/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@workspace/ui/components/carousel";
import { Textarea } from "@workspace/ui/components/textarea";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/components/toggle-group";
import { Copy } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const { slug } = useParams();
  const [selectedTestimonialCardStyle, setSelectedTestimonialCardStyle] =
    useState<string>("1");
  const [selectedLayout, setSelectedLayout] = useState<string>("masonry");
  const [spaceName, setSpaceName] = useState<string>();
  const dummyTestimonial: TestimonialInterface[] = [
    {
      id: "proofly-success",
      description:
        "Proofly made collecting and showcasing testimonials effortless. The platform is intuitive, and the Wall of Fame boosts social proof and conversions. Highly recommend!",
      stars: 5,
      sumbttedAt: "2025-06-14T10:00:00Z",
      user: {
        firstName: "Sarah",
        lastName: "M.",
      },
      inWallOfFame: true,
      videoURL: undefined,
      type: "text",
    },

    {
      id: "uplift",
      description:
        "Proofly offers a straightforward approach to collecting and displaying testimonials. Its easy-to-use platform helps improve social proof and can lead to better conversion rates.",
      stars: 5,
      sumbttedAt: "2025-06-13T14:30:00Z",
      user: {
        firstName: "John",
        lastName: "D.",
      },
      inWallOfFame: true,
      videoURL: undefined,
      type: "text",
    },
    {
      id: "uplift-app",
      description:
        "Proofly has truly transformed the way I collect and display testimonials. The platform is user-friendly, and the Wall of Fame feature significantly enhances social proof and drives conversions. I highly recommend it for anyone looking to elevate their brand! It's an invaluable tool that has made a noticeable difference in my marketing efforts.",
      stars: 5,
      sumbttedAt: "2025-06-13T14:30:00Z",
      user: {
        firstName: "John",
        lastName: "D.",
      },
      inWallOfFame: true,
      videoURL: undefined,
      type: "text",
    },
    {
      id: "quant-data",
      description:
        "Proofly simplifies testimonial collection and display, with its intuitive platform boosting social proof and conversions.",
      stars: 4,
      sumbttedAt: "2025-06-12T09:15:00Z",
      user: {
        firstName: "Emily",
        lastName: "R.",
      },
      inWallOfFame: false,
      videoURL: undefined,
      type: "text",
    },
  ];

  useEffect(() => {
    if (!slug) {
      router.push("/404");
      return;
    }
    setSpaceName(slug[0] as string);
  }, []);

  return (
    <>
      <NavBar />
      <>
        <div className="lg:mx-16 mx-4 my-6 flex flex-col gap-10">
          <div>
            <h5 className="text-neutral-400 font-bold text-lg">Spaces</h5>
            <h3 className="font-bold lg:text-2xl text-lg text-neutral-800 mt-2 inline">
              {spaceName}
            </h3>
          </div>
          <div>
            <h5 className="text-neutral-400 font-bold text-lg">
              Select Testimonial Card Style
            </h5>
            <div className="grid lg:grid-cols-2 lg:grid-rows-2 gap-4 grid-cols-1 grid-rows-1 mt-2">
              <div
                onClick={() => {
                  setSelectedTestimonialCardStyle("1");
                }}
                className={`h-full w-full flex items-center justify-center rounded-lg hover:bg-neutral-100 p-2 ${selectedTestimonialCardStyle === "1" ? "!bg-violet-200" : ""} transition-all cursor-pointer`}
              >
                <TestimonialCard1
                  className="!mb-0"
                  testimonial={dummyTestimonial[0]!}
                />
              </div>
              <div
                onClick={() => {
                  setSelectedTestimonialCardStyle("2");
                }}
                className={`h-full w-full flex items-center justify-center rounded-lg hover:bg-neutral-100 p-2 ${selectedTestimonialCardStyle === "2" ? "!bg-violet-200" : ""} transition-all cursor-pointer`}
              >
                <TestimonialCard2
                  className="!mb-0"
                  testimonial={dummyTestimonial[0]!}
                />
              </div>
              <div
                onClick={() => {
                  setSelectedTestimonialCardStyle("3");
                }}
                className={`h-full w-full flex items-center justify-center rounded-lg hover:bg-neutral-50 p-2 ${selectedTestimonialCardStyle === "3" ? "!bg-violet-200" : ""} transition-all cursor-pointer`}
              >
                <TestimonialCard3
                  className="!mb-0"
                  testimonial={dummyTestimonial[0]!}
                />
              </div>
              <div
                onClick={() => {
                  setSelectedTestimonialCardStyle("4");
                }}
                className={`h-full w-full flex items-center justify-center rounded-lg hover:bg-neutral-100 p-2 ${selectedTestimonialCardStyle === "4" ? "!bg-violet-200" : ""} transition-all cursor-pointer`}
              >
                <TestimonialCard4
                  className="!mb-0"
                  testimonial={dummyTestimonial[0]!}
                />
              </div>
            </div>
          </div>

          <div>
            <h5 className="text-neutral-400 font-bold text-lg">
              Select Layout
            </h5>
            <div className="mt-2">
              <ToggleGroup
                value={selectedLayout}
                onValueChange={(value) => {
                  setSelectedLayout(value);
                }}
                type="single"
                className="border rounded-lg gap-1 p-1"
              >
                <ToggleGroupItem
                  value="masonry"
                  className="data-[state=on]:bg-violet-500 data-[state=on]:text-white hover:bg-neutral-100 rounded-md transition-all"
                >
                  Masonry
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="carosusel"
                  className="data-[state=on]:bg-violet-500 data-[state=on]:text-white hover:bg-neutral-100 rounded-md transition-all"
                >
                  Carosusel
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div>
              {selectedLayout === "masonry" ? (
                <div className="w-full flex justify-center items-center ">
                  <div
                    style={{ columnFill: "balance-all" }}
                    className="columns-2 gap-[5%]"
                  >
                    {dummyTestimonial.map((testimonial) => {
                      return (
                        <div
                          key={testimonial.id}
                          className="break-inside-avoid "
                        >
                          <TestimonialCard
                            testimonialsCardStyle={selectedTestimonialCardStyle}
                            testimonial={testimonial}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="w-full flex justify-center items-center">
                  <Carousel className="w-full max-w-lg">
                    <CarouselContent className="flex items-center">
                      {dummyTestimonial.map((testimonial) => {
                        return (
                          <CarouselItem
                            className="flex justify-center"
                            key={testimonial.id}
                          >
                            <TestimonialCard
                              testimonialsCardStyle={
                                selectedTestimonialCardStyle
                              }
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
              )}
            </div>
          </div>
          <div>
            <h5 className="text-neutral-400 font-bold text-lg">Code</h5>
            <div className="flex gap-3 w-md mt-2">
              <Textarea
                readOnly
                className="resize-none trucate break-words "
                value={`<iframe src="${process.env.NEXT_PUBLIC_WEB_URL!}/embed/${"some-id"}?testimonialsCardStyle=${selectedTestimonialCardStyle ?? "1"}&layout=${selectedLayout ?? "masonry"}"
                id="custom-embed" className="w-full h-full"></iframe>`}
                placeholder="https://google.com"
              />
              <Button
                size={"icon"}
                variant="default"
                className="cursor-pointer"
              >
                <Copy />
              </Button>
            </div>
          </div>
        </div>

        <Footer />
      </>
    </>
  );
}

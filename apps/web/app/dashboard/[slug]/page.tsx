"use client";

import { SpaceInterface, TestimonialInterface } from "@/util/types";
import { GetSpaceDetails, UpdateWallOfFame } from "@/util/util";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Skeleton } from "@workspace/ui/components/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { Heart, Star, User, UserXIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardSpace() {
  const { slug } = useParams();
  console.log(slug);
  const [spaceData, setSpaceData] = useState<SpaceInterface>();
  useEffect(() => {
    async function main() {
      const response: false | SpaceInterface = await GetSpaceDetails(
        slug as string,
      );
      if (!response) {
        return;
      }
      setSpaceData(response);
    }
    main();
  }, []);
  return (
    <>
      {spaceData ? (
        <>
          <div className="lg:mx-16 mx-4 my-6 flex flex-col gap-6">
            <div>
              <div className="font-bold text-lg text-neutral-400">Space</div>
              <h3 className="font-bold text-2xl text-neutral-800 mt-2 inline">
                {spaceData.projectName}
              </h3>
            </div>
            <div>
              <div className="font-bold text-lg text-neutral-400">Link</div>
              <h3 className="font-bold text-2xl text-neutral-800 mt-2 inline">
                {spaceData.linkId}
              </h3>
            </div>
            <div>
              <div className="font-bold text-lg text-neutral-400">
                Submitted Testimonials
              </div>
              <div className="sm:columns-2 columns-1 gap-4 mt-4">
                {spaceData.testimonials.map(
                  (testimonial: TestimonialInterface, index) => {
                    return (
                      <div
                        key={index}
                        className="bg-neutral-100 rounded-lg px-6 py-6 flex gap-4 flex-col break-inside-avoid mb-4"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex">
                            {Array.from({ length: 5 }, (_, i) => (
                              <Star
                                key={i}
                                size={17}
                                className={`${
                                  testimonial.stars > i
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-neutral-400"
                                }`}
                              />
                            ))}
                          </div>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger
                                onClick={() => {
                                  setSpaceData((e) => {
                                    if (!e) return e;

                                    return {
                                      ...e,
                                      testimonials: e.testimonials.map(
                                        (element) => {
                                          if (element.id === testimonial.id) {
                                            return {
                                              ...element,
                                              inWallOfFame:
                                                !element.inWallOfFame,
                                            };
                                          }
                                          return element;
                                        },
                                      ),
                                    };
                                  });
                                  UpdateWallOfFame(
                                    testimonial.id,
                                    !testimonial.inWallOfFame,
                                  );
                                }}
                              >
                                <Heart
                                  size={17}
                                  className={`text-neutral-400 hover:text-red-600 hover:fill-red-600 cursor-pointer ${testimonial.inWallOfFame ? "fill-red-600 text-red-600" : ""}`}
                                />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  {testimonial.inWallOfFame
                                    ? "Remove from"
                                    : "Add to"}{" "}
                                  Wall of Fame
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <p className="text-neutral-800 font-medium">
                          {testimonial.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <div>
                            <h6 className="text-neutral-400 font-bold text-sm">
                              User
                            </h6>
                            <p className="capitalize text-neutral-800">
                              {testimonial.user.firstName}{" "}
                              {testimonial.user.lastName}
                            </p>
                          </div>
                          <div>
                            <h6 className="text-neutral-400 font-bold text-sm text-right">
                              Submitted At
                            </h6>
                            <p className="text-neutral-800">
                              {new Date(testimonial.sumbttedAt).toLocaleString(
                                "en-Us",
                                {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                  hour: "numeric",
                                  minute: "2-digit",
                                  hour12: true,
                                },
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="lg:mx-16 mx-4 my-6 flex flex-col gap-6">
          <div>
            <div className="font-bold text-lg text-neutral-400">Space</div>
            <Skeleton className="h-6 w-24 rounded-xl mt-2" />
          </div>
          <div>
            <div className="font-bold text-lg text-neutral-400">Link</div>
            <Skeleton className="h-6 w-100 rounded-xl mt-2" />
          </div>
          <div>
            <div className="font-bold text-lg text-neutral-400">
              Submitted Testimonials
            </div>

            <div className="columns-1 sm:columns-2 gap-4 mt-4">
              <Skeleton className="h-41 w-full break-inside-avoid rounded-xl mb-4" />
              <Skeleton className="h-41 w-full break-inside-avoid rounded-xl mb-4" />
              <Skeleton className="h-41 w-full break-inside-avoid rounded-xl mb-4" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

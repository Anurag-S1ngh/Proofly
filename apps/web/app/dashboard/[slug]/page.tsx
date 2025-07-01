"use client";

import Footer from "@/components/footer";
import { SpaceInterface, TestimonialInterface } from "@/util/types";
import { GetSpaceDetails, UpdateWallOfFame } from "@/util/util";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Skeleton } from "@workspace/ui/components/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import {
  ClipboardCheckIcon,
  Copy,
  FileTextIcon,
  Heart,
  SparklesIcon,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function DashboardSpace() {
  const { slug } = useParams();
  const [spaceData, setSpaceData] = useState<SpaceInterface>();
  const router = useRouter();
  useEffect(() => {
    async function main() {
      const response: false | SpaceInterface = await GetSpaceDetails(
        slug as string,
      );
      if (!response) {
        router.push("/404");
        return;
      }
      setSpaceData(response);
    }
    main();
  }, []);
  return (
    <>
      {slug && (
        <div
          onClick={() => {
            if (!spaceData) {
              return;
            }
            router.push(`/wall-of-fame/${spaceData.projectName}/${slug}`);
          }}
        >
          <Button className="fixed lg:top-20 lg:right-16 bottom-5 right-4">
            Embed Wall of Fame
          </Button>
        </div>
      )}
      {spaceData ? (
        <>
          <div className="lg:mx-16 mx-4 my-6 flex flex-col gap-8">
            <div>
              <div className="font-bold lg:text-lg text-neutral-400">Space</div>
              <h3 className="font-bold lg:text-2xl text-lg text-neutral-800 mt-2 inline">
                {spaceData.projectName}
              </h3>
            </div>
            <div>
              <div className="font-bold lg:text-lg text-neutral-400 mb-2">
                Link
              </div>
              <span className="flex items-center justify-center gap-3 w-fit">
                <Link
                  target="_blank"
                  className="cursor-pointer"
                  href={
                    process.env.NEXT_PUBLIC_WEB_URL +
                    "/space/" +
                    spaceData.linkId
                  }
                >
                  <Input
                    readOnly
                    className="truncate break-all cursor-pointer"
                    defaultValue={`${process.env.NEXT_PUBLIC_WEB_URL!}/space/${spaceData.linkId}`}
                  />
                </Link>
                <Button
                  variant="outline"
                  className="cursor-pointer !p-0"
                  size={"icon"}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      process.env.NEXT_PUBLIC_WEB_URL +
                        "/space/" +
                        spaceData.linkId,
                    );
                    toast(
                      <span className="flex items-center gap-2">
                        Link copied to clipboard!{" "}
                        <ClipboardCheckIcon className="size-4" />
                      </span>,
                    );
                  }}
                >
                  <Copy />
                </Button>
              </span>
            </div>
            <div>
              <div className="font-bold text-lg text-neutral-400">
                Submitted Testimonials
              </div>
              <div
                style={{ columnFill: "balance" }}
                className="sm:columns-2 columns-1 gap-4 mt-4"
              >
                {spaceData.testimonials.map(
                  (testimonial: TestimonialInterface, index) => {
                    return (
                      <div
                        key={index}
                        className="bg-neutral-50 rounded-lg p-6 flex gap-4 flex-col break-inside-avoid mb-4 border border-neutral-200 shadow-sm shadow-neutral-100"
                      >
                        <div className="flex justify-between">
                          <Badge
                            className={` py-1 px-2 flex gap-1 ${testimonial.type === "text" ? "!bg-violet-200 text-neutral-800" : ""}`}
                          >
                            {testimonial.type === "text" ? (
                              <FileTextIcon />
                            ) : (
                              <SparklesIcon />
                            )}
                            {testimonial.type}
                          </Badge>
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
                                  size={20}
                                  className={`text-red-600 cursor-pointer ${testimonial.inWallOfFame ? "fill-red-600 text-red-600" : ""}`}
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
                        <div className="flex justify-between items-center">
                          <div className="flex">
                            {Array.from({ length: 5 }, (_, i) => (
                              <Star
                                key={i}
                                size={20}
                                className={`${
                                  testimonial.stars > i
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-neutral-400"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        {testimonial.videoURL && (
                          <>
                            <video
                              className="lg:w-xs w-full max-w-xl rounded-lg bg-black"
                              controls
                              src={testimonial.videoURL}
                            />
                          </>
                        )}
                        <p className="text-neutral-800 font-medium">
                          {testimonial.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <div>
                            <h6 className="text-neutral-400 font-bold text-sm">
                              User
                            </h6>
                            <p className="capitalize text-neutral-800 lg:text-base text-sm">
                              {testimonial.user.firstName}{" "}
                              {testimonial.user.lastName}
                            </p>
                          </div>
                          <div>
                            <h6 className="text-neutral-400 font-bold text-sm text-right">
                              Submitted At
                            </h6>
                            <p className="text-neutral-800 text-sm lg:text-base">
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
          <Footer />
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

"use client";

import {
  getMedia,
  StartRecord,
  StopRecord,
  StopVideo,
  UploadVideo,
} from "@/util/record";
import { GetSpaceQuestion, SubmitTestimonialHandler } from "@/util/util";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@workspace/ui/components/alert-dialog";
import { Button } from "@workspace/ui/components/button";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Label } from "@workspace/ui/components/label";
import { Textarea } from "@workspace/ui/components/textarea";
import { PauseIcon, RotateCw, Star, ThumbsUp } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { setTimeout } from "timers";

interface SpaceDetailsInterface {
  testimonialTitle: string;
  testimonialDescription: string;
  question: string;
}

export default function Space() {
  const [isRecording, setIsRecording] = useState(false);
  const [isVideoTestimonialOpen, setIsVideoTestimonialOpen] = useState(false);
  const [isTextTestimonialOpen, setIsTextTestimonialOpen] = useState(false);
  const canvasElementRef = useRef<HTMLCanvasElement | null>(null);
  const videoElementRef = useRef<HTMLVideoElement | null>(null);
  const videoElementRef2 = useRef<HTMLVideoElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const [testimonialSubmitted, setTestimonialSubmitted] =
    useState<boolean>(false);
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const linkId = useParams().slug as string;
  const [spaceDetails, setSpaceDetails] =
    useState<SpaceDetailsInterface | null>(null);
  useEffect(() => {
    async function main() {
      if (!linkId) {
        return;
      }
      const response = await GetSpaceQuestion(linkId);
      if (!response) {
        return;
      }
      setSpaceDetails(response);
    }
    main();
  }, []);
  async function Upload() {
    if (!videoElementRef2.current) {
      return;
    }
    const videoUploadResponse = await UploadVideo(videoElementRef2.current);
    if (videoUploadResponse) {
      StopVideo();
      const response2 = await SubmitTestimonialHandler(
        linkId,
        rating,
        "video",
        videoUploadResponse,
      );
      if (!response2) {
        return;
      }
      setIsVideoTestimonialOpen(false);
      setTestimonialSubmitted(true);
    }
  }
  async function SubmitTestimonial() {
    if (!descriptionRef.current) {
      return;
    }
    const response = await SubmitTestimonialHandler(
      linkId,
      rating,
      "text",
      undefined,
      descriptionRef.current.value,
    );
    if (!response) {
      return;
    }
    setTestimonialSubmitted(true);
  }

  return (
    <>
      <AlertDialog open={testimonialSubmitted}>
        <AlertDialogContent>
          <img
            className="rounded-lg"
            src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXZueXRnZjB1NmQyc3VuOXJjZGQ1NnpsZmx5MXE1d2F0MTFrazN3ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BPJmthQ3YRwD6QqcVD/giphy.gif"
          ></img>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-3xl font-bold text-center mb-1">
              Thank You!
            </AlertDialogTitle>
            <p className="text-center">
              Thank you for your kind words and support — your testimonial means
              a lot to us! <br />
              <span className="text-lg">🙏</span>
            </p>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>

      <div className="h-screen flex justify-center items-center bg-[radial-gradient(#ccc_0.5px,transparent_0.5px)] bg-[length:10px_10px]">
        <div className="border border-neutral-200 rounded-lg flex flex-col gap-1 px-14 py-8 lg:w-sm w-10/12 shadow shadow-neutral-100 m-auto bg-white">
          <div className="lg:w-32 lg:h-32 w-24 h-24 bg-indigo-500 rounded-full mx-auto mb-2 flex justify-center items-center ">
            <ThumbsUp size={40} className="text-neutral-50" />
          </div>
          <>
            <h3 className="text-neutral-800 font-bold text-center text-xl whitespace-normal break-words">
              {spaceDetails?.testimonialTitle}
              <br />
              <span className="text-neutral-400 font-medium text-center text-xl whitespace-normal break-words">
                {spaceDetails?.testimonialDescription}
              </span>
            </h3>
          </>
          <div>
            <h3 className="text-neutral-400 font-bold text-xl whitespace-normal break-words mt-2">
              Question
            </h3>
            <div className="text-neutral-600">
              <p className="text-neutral-800 font-medium whitespace-normal break-words">
                {spaceDetails?.question}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-5">
            <AlertDialog open={isVideoTestimonialOpen}>
              <AlertDialogTrigger asChild>
                <Button
                  onClick={() => {
                    setIsVideoTestimonialOpen(true);
                    setTimeout(() => {
                      if (!videoElementRef.current) {
                        return;
                      }
                      getMedia(videoElementRef.current);
                    }, 0);
                  }}
                  size={"lg"}
                  className=""
                >
                  Record Video
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle
                    className="text-neutral-400 font-bold "
                    asChild
                  >
                    <span>
                      <h3 className="text-neutral-400 font-bold text-xl whitespace-normal break-words mt-2">
                        Question
                      </h3>
                      <p className="text-neutral-800 font-medium whitespace-normal break-words text-base">
                        {spaceDetails?.question}
                      </p>
                    </span>
                  </AlertDialogTitle>
                  <AlertDialogDescription asChild></AlertDialogDescription>
                  <video
                    ref={videoElementRef}
                    className="w-full max-w-md rounded-lg mt-1"
                    autoPlay
                    muted
                    playsInline
                  />
                  <video
                    ref={videoElementRef2}
                    className="w-full max-w-md rounded-lg hidden "
                  />
                  <canvas
                    ref={canvasElementRef}
                    className="w-full max-w-md rounded-lg transform scale-x-[-1] hidden "
                  ></canvas>
                  {!isRecording ? (
                    <Button
                      onClick={() => {
                        if (
                          !videoElementRef.current ||
                          !videoElementRef2.current
                        ) {
                          return;
                        }
                        StartRecord(
                          videoElementRef.current,
                          videoElementRef2.current,
                        );
                        setIsRecording(true);
                      }}
                    >
                      Start Recording
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        className="flex-1"
                        onClick={() => {
                          if (
                            !videoElementRef2.current ||
                            !videoElementRef.current
                          ) {
                            return;
                          }
                          StopRecord(
                            videoElementRef.current,
                            videoElementRef2.current,
                          );
                        }}
                      >
                        <PauseIcon />
                        Stop Recording
                      </Button>
                      <Button
                        variant={"secondary"}
                        className="flex-1"
                        onClick={() => {
                          if (
                            !videoElementRef.current ||
                            !videoElementRef2.current
                          ) {
                            return;
                          }
                          StartRecord(
                            videoElementRef.current,
                            videoElementRef2.current,
                          );
                        }}
                      >
                        <RotateCw />
                        Start Again
                      </Button>
                    </div>
                  )}
                  <h3 className="text-neutral-400 font-bold -mb-1">
                    How Would You Rate It?
                  </h3>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }, (_, i) => {
                      const starNumber = i + 1;
                      const isFilled = starNumber <= (hovered || rating);
                      return (
                        <Star
                          key={starNumber}
                          className={`w-6 h-6 cursor-pointer transition-all ${
                            isFilled
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-neutral-200"
                          }`}
                          onClick={() => setRating(starNumber)}
                          onMouseEnter={() => setHovered(starNumber)}
                          onMouseLeave={() => setHovered(0)}
                        />
                      );
                    })}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms">Accept terms and conditions</Label>
                    </div>
                  </div>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <Button
                    onClick={() => {
                      Upload();
                    }}
                  >
                    Upload
                  </Button>
                  <AlertDialogCancel
                    onClick={() => {
                      setIsVideoTestimonialOpen(false);
                      setIsRecording(false);
                      StopVideo();
                    }}
                  >
                    Cancel
                  </AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <AlertDialog open={isTextTestimonialOpen}>
              <AlertDialogTrigger
                asChild
                onClick={() => {
                  setIsTextTestimonialOpen(true);
                }}
              >
                <Button variant={"secondary"}>Send Text</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <div>
                  <h3 className="font-bold text-neutral-400 text-xl whitespace-normal break-words mt-2">
                    Question
                  </h3>
                  <div className=" text-neutral-600">
                    <p className="text-neutral-800 font-medium whitespace-normal break-words">
                      {spaceDetails?.question}
                    </p>
                  </div>
                </div>
                <AlertDialogHeader className="gap-1">
                  <AlertDialogTitle className="text-neutral-400 font-bold ">
                    Write your testimonial here
                  </AlertDialogTitle>
                  <Textarea
                    ref={descriptionRef}
                    placeholder="Describe your experience"
                    className="break-words break-all whitespace-normal resize-none placeholder:text-neutral-400"
                  />
                </AlertDialogHeader>
                <div className="flex gap-2 mt-1  flex-col">
                  <h3 className="text-neutral-400 font-bold -mb-1">
                    How Would You Rate It?
                  </h3>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }, (_, i) => {
                      const starNumber = i + 1;
                      const isFilled = starNumber <= (hovered || rating);
                      return (
                        <Star
                          key={starNumber}
                          className={`w-6 h-6 cursor-pointer transition-all ${
                            isFilled
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-neutral-200"
                          }`}
                          onClick={() => setRating(starNumber)}
                          onMouseEnter={() => setHovered(starNumber)}
                          onMouseLeave={() => setHovered(0)}
                        />
                      );
                    })}
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms">Accept terms and conditions</Label>
                  </div>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    onClick={() => {
                      setIsTextTestimonialOpen(false);
                    }}
                  >
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      SubmitTestimonial();
                    }}
                  >
                    Submit
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </>
  );
}

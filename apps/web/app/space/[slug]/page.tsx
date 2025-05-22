"use client";

import { NavBar } from "@/components/nav-bar";
import {
  GetSpaceQuestion,
  PauseVideo,
  ResumeVideo,
  StopVideo,
  SubmitTestimonialHandler,
  getMedia,
} from "@/util/util";
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
import { Textarea } from "@workspace/ui/components/textarea";
import { Star, ThumbsUp } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { setTimeout } from "timers";

interface SpaceDetailsInterface {
  testimonialTitle: string;
  testimonialDescription: string;
  question: string;
}

export default function Space() {
  const canvasElementRef = useRef<HTMLCanvasElement | null>(null);
  const videoElementRef = useRef<HTMLVideoElement | null>(null);
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
  async function SubmitTestimonial() {
    if (!descriptionRef.current) {
      return;
    }
    const response = await SubmitTestimonialHandler(
      linkId,
      descriptionRef.current.value,
      rating,
    );
    if (!response) {
      return;
    }
    setTestimonialSubmitted(true);
  }

  return (
    <>
      <NavBar />
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

      <div className="border border-neutral-200 rounded-lg flex flex-col gap-1 px-14 py-8 lg:w-sm w-10/12 shadow shadow-neutral-100 mx-auto mt-16">
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
          <h3 className="text-neutral-400 font-medium text-xl whitespace-normal break-words underline underline-offset-3 mt-2">
            Question
          </h3>
          <div className="mt-1 text-neutral-600">
            <p className="text-neutral-800 font-medium whitespace-normal break-words">
              {spaceDetails?.question}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-5">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                onClick={() => {
                  setTimeout(() => {
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
                <AlertDialogTitle className="text-neutral-400 font-bold ">
                  Write your testimonial here
                </AlertDialogTitle>
                <AlertDialogDescription>hi</AlertDialogDescription>
                <video
                  ref={videoElementRef}
                  className="w-full max-w-md rounded-lg transform scale-x-[-1]"
                  autoPlay
                  muted
                  playsInline
                />
                <canvas
                  ref={canvasElementRef}
                  className="w-full max-w-md rounded-lg transform scale-x-[-1] hidden "
                ></canvas>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  onClick={() => {
                    StopVideo();
                  }}
                >
                  Cancel
                </AlertDialogCancel>
                <Button
                  onClick={() => {
                    PauseVideo(
                      videoElementRef.current,
                      canvasElementRef.current,
                    );
                  }}
                >
                  Pause
                </Button>
                <Button
                  onClick={() => {
                    ResumeVideo(
                      videoElementRef.current,
                      canvasElementRef.current,
                    );
                  }}
                >
                  Resume
                </Button>
                <Button>Start</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"secondary"}>Send Text</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <div>
                <h3 className="text-neutral-400 font-medium text-xl whitespace-normal break-words underline underline-offset-3 mt-2">
                  Question
                </h3>
                <div className="mt-1 text-neutral-600">
                  <p className="text-neutral-800 font-medium whitespace-normal break-words">
                    {spaceDetails?.question}
                  </p>
                </div>
              </div>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-neutral-400 font-bold ">
                  Write your testimonial here
                </AlertDialogTitle>
                <Textarea
                  ref={descriptionRef}
                  placeholder="Describe your experience"
                  className="break-words break-all whitespace-normal resize-none placeholder:text-neutral-400"
                />
              </AlertDialogHeader>
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
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
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
    </>
  );
}

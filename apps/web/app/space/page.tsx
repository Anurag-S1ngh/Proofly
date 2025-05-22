"use client";
import { NavBar } from "@/components/nav-bar";
import { SpaceCreationHandler } from "@/util/util";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@workspace/ui/components/alert-dialog";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { ArrowUpRight, CopyIcon, ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function Space() {
  const [linkId, setLinkId] = useState("");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const spaceNameRef = useRef<HTMLInputElement | null>(null);
  const [testimonialTitle, setTestimonialTitle] =
    useState<string>("Testimonial Title");
  const [testimonialDescription, setTestimonialDescription] = useState<string>(
    "Testimonial Description",
  );
  const [testimonialQuestion, setTestimonialQuestion] = useState<string>(
    "How has [our product/ service] helped you?",
  );
  async function SpaceCreation() {
    if (
      !spaceNameRef.current ||
      testimonialTitle === "" ||
      testimonialDescription === "" ||
      testimonialQuestion === ""
    ) {
      alert("Enter all fields");
      return;
    }
    const response = await SpaceCreationHandler(
      testimonialTitle,
      testimonialDescription,
      spaceNameRef.current.value,
      testimonialQuestion,
    );
    if (!response) {
      alert("error");
    }
    setLinkId(response);
    setOpen(true);
  }
  return (
    <>
      <AlertDialog open={open}>
        <AlertDialogContent className="w-md absolute top-1/2 left-1/2 -translate-x-1/2 ">
          <AlertDialogHeader>
            <AlertDialogTitle>
              <Input readOnly value={linkId} />
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                navigator.clipboard.writeText(linkId);
              }}
            >
              Copy <CopyIcon />
            </AlertDialogAction>
            <AlertDialogCancel
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              Go to dashboard
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <NavBar />
      <div className="flex gap-20 lg:px-16 px-4 py-3">
        <div className="flex-1 flex flex-col w-full gap-5">
          <div>
            <h3 className="text-base font-bold text-neutral-400 mb-2">
              Space Name
            </h3>
            <Input
              ref={spaceNameRef}
              placeholder="My Space"
              className="placeholder:text-neutral-400"
            />
          </div>
          <div>
            <h3 className="text-base font-bold text-neutral-400 mb-2">
              Testimonial Title
            </h3>
            <Input
              onChange={(e) => {
                setTestimonialTitle(e.target.value);
              }}
              placeholder="Testimonail Title"
              className="placeholder:text-neutral-400"
            />
          </div>
          <div>
            <h3 className="text-base font-bold text-neutral-400 mb-2">
              Testimonial Description
            </h3>
            <Input
              onChange={(e) => {
                setTestimonialDescription(e.target.value);
              }}
              className="placeholder:text-neutral-400"
              placeholder="Testimonial Description"
            />
          </div>
          <div>
            <h3 className="text-base font-bold text-neutral-400 mb-2">
              Questions
            </h3>
            <Textarea
              className="resize-none placeholder:text-neutral-400"
              placeholder="How has [our product/ service] helped you?"
              onChange={(e) => {
                setTestimonialQuestion(e.target.value);
              }}
            />
          </div>
          <Button onClick={SpaceCreation} size={"lg"} className="w-fit">
            Generate Link <ArrowUpRight strokeWidth={2} />
          </Button>
        </div>
        <div className="w-1/2">
          <div className="border border-neutral-200 rounded-lg flex flex-col gap-1 px-14 py-8">
            <div className="w-32 h-32 bg-indigo-500 rounded-full mx-auto mb-2 flex justify-center items-center ">
              <ThumbsUp size={40} className="text-neutral-50" />
            </div>
            <>
              <h3 className="text-neutral-800 font-bold text-center text-xl whitespace-normal break-words">
                {testimonialTitle.trim() === ""
                  ? "Testimonial Title"
                  : testimonialTitle}
              </h3>
            </>
            <>
              <h3 className="text-neutral-400 font-medium text-center text-xl whitespace-normal break-words">
                {testimonialDescription.trim() === ""
                  ? "Testimonial Description"
                  : testimonialDescription}
              </h3>
            </>
            <div>
              <h3 className="text-neutral-400 font-medium text-xl whitespace-normal break-words underline underline-offset-3 mt-2">
                Questions
              </h3>
              <div className="mt-1 text-neutral-600">
                <p className="text-neutral-800 font-medium whitespace-normal break-words">
                  {testimonialQuestion.trim() === ""
                    ? "How has [our product/ service] helped you?"
                    : testimonialQuestion}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-5">
              <Button size={"lg"} className="">
                Record Video
              </Button>
              <Button size={"lg"} className="" variant={"secondary"}>
                Send Text
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

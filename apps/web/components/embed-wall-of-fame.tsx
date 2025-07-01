import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { Textarea } from "@workspace/ui/components/textarea";
import { ClipboardCheckIcon, CodeIcon, Copy } from "lucide-react";
import { toast } from "sonner";
import { TestimonialCard3 } from "./testimonial-card-3";

interface EmbedWallOfFameProps {
  baseURL: string;
  embedId: string;
}

export const EmbedWallOfFame = ({ baseURL, embedId }: EmbedWallOfFameProps) => {
  const dummyTestimonial = {
    id: "0",
    description:
      "Proofly has been an absolute game-changer for our business! Collecting and showcasing testimonials used to be a clunky, time-consuming process, but Proofly has made it incredibly simple and efficient. We've seen a significant boost in our social proof and conversion rates since we started using it. The platform is intuitive, and the wall of fame feature is fantastic for highlighting our best reviews. Highly recommend!",
    stars: 5,
    sumbttedAt: "2025-06-14T10:00:00Z",
    user: {
      firstName: "Sarah",
      lastName: "M.",
    },
    inWallOfFame: true,
    videoURL: undefined,
    type: "text",
  };
  return (
    <Dialog>
      <DialogTrigger
        asChild
        className="fixed lg:top-20 lg:right-16 bottom-5 right-4"
      >
        <Button>Embed Wall of Fame</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <>
              Wall of Fame Embed
              <CodeIcon className="w-5 h-5 text-black ml-2 inline" />
            </>
          </DialogTitle>
          <DialogDescription>
            Copy and paste this snippet into your website to showcase your Wall
            of Fame.
          </DialogDescription>
          <div>
            <h3 className="text-sm font-bold text-neutral-400">
              Testimonial Card Style
            </h3>
            <div className=" scale-75">
              <TestimonialCard3 testimonial={dummyTestimonial} />
            </div>
          </div>
          <div className="flex lg:flex flex-col gap-2 items-start mt-1 w-full max-w-full">
            <Textarea
              readOnly
              className="resize-none trucate break-all"
              defaultValue={`<iframe src="${baseURL}/embed/${embedId}" id="custom-embed" className="w-full h-full"></iframe>`}
            />
            <Button
              tabIndex={0}
              variant="default"
              className="cursor-pointer self-end"
              size={"icon"}
              onClick={() => {
                navigator.clipboard.writeText(
                  `<iframe
                      src="http://localhost:3000/embed/82f54ff2-7ee3-4d26-b39d-880b8028bb7a"
                      id="custom-embed"
                      className="w-full h-full"
                    ></iframe>
                  `,
                );
                toast(
                  <span className="flex items-center gap-2">
                    Embed code copied successfully{" "}
                    <ClipboardCheckIcon className="w-4 h-4 " />
                  </span>,
                );
              }}
            >
              <Copy />
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

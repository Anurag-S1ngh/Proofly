import Footer from "@/components/footer";
import { NavBar } from "@/components/nav-bar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Code, Inbox, LayoutGrid } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const useCases = [
    {
      title: "AI-Powered Analytics",
      description:
        "Transform your data into actionable insights with our advanced machine learning algorithms and real-time processing capabilities.",
      image: "/freelancer.png",
    },
    {
      title: "Smart Automation",
      description:
        "Streamline your workflow with intelligent automation that adapts to your business needs and scales effortlessly.",
      image: "/startup.png",
    },
    {
      title: "Real-time Collaboration",
      description:
        "Connect teams across the globe with seamless real-time collaboration tools and instant synchronization.",
      image: "/agency.png",
    },
  ];

  const features = [
    {
      icon: <Inbox className="w-6 h-6 " />,
      title: "Collect Easily",
      description: "Custom forms for video and text. Share link.",
    },
    {
      icon: <LayoutGrid className="w-6 h-6" />,
      title: "Wall of Fame",
      description: "Auto-updating embeds. Carousel, or timeline layouts.",
    },
    {
      icon: <Code className="w-6 h-6 " />,
      title: "Embed Anywhere",
      description: "Copy your embed code and add it to any page instantly.",
    },
  ];
  return (
    <>
      <NavBar />
      <div className="bg-[radial-gradient(#ccc_0.5px,transparent_0.5px)] bg-[length:10px_10px]">
        <div className="flex flex-col gap-5 items-center justify-center min-h-screen w-full pt-20 px-4 -mt-20">
          <h1 className="lg:text-6xl text-5xl font-bold text-center tracking-tight capitalize ">
            Get testimonials
            <br />
            in no time
          </h1>
          <p className=" text-neutral-600 max-w-xl text-center tracking-thin">
            Collecting testimonials is hard, we get it! That’s why we built
            Proofly. In minutes, collect text and video testimonials—no
            developer or hosting needed.
          </p>
          <div className="flex lg:flex-row flex-col justify-center items-center lg:gap-4 gap-2">
            <Link href={"/signup"}>
              <Button size="lg">Try Proofly Now</Button>
            </Link>
            <Link href={"/dashboard"}>
              <Button variant={"outline"} size="lg">
                Launch Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-20">
        <div className="lg:px-16 px-4 mt-16">
          <div className="flex flex-col items-center justify-center">
            <Badge>Features</Badge>
            <h2 className="text-center text-4xl font-bold mt-4">
              Showcase Testimonials
              <br />
              Instantly
            </h2>
          </div>
          <div className="flex flex-wrap justify-center justify-between mt-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col items-center p-4 "
              >
                <Button variant={"secondary"} className="border" size="icon">
                  {feature.icon}
                </Button>
                <div>
                  <h3 className="text-xl font-semibold text-center mt-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-center w-3xs">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:px-16 px-4 mt-16">
          <div className="flex flex-col items-center justify-center">
            <Badge>Use Case</Badge>
            <h2 className="text-center text-4xl font-bold mt-4">
              Who It's For
            </h2>
          </div>
          <div className="flex flex-wrap gap-10 justify-center mx-auto mt-6">
            {useCases.map((useCase) => (
              <div
                key={useCase.title}
                className="border rounded-md overflow-hidden bg-white w-xs"
              >
                <img
                  src={useCase.image}
                  alt={useCase.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 pt-3">
                  <h3 className="text-xl font-semibold mb-1">
                    {useCase.title}
                  </h3>
                  <p className="text-neutral-500 text-sm">
                    {useCase.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:px-16 px-4 mt-16">
          <div className="flex flex-col items-center justify-center">
            <Badge>FAQs</Badge>
            <h2 className="text-center text-4xl font-bold mt-4">
              Common Questions
            </h2>
          </div>
          <div className="flex lg:mt-10 mt-6">
            <Accordion
              type="single"
              collapsible
              className="w-full flex-1 max-w-3xl mx-auto"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Can people submit video testimonials?
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <p className="text-neutral-600">
                    Yes! Your customers can submit either text or video
                    testimonials easily through your custom collection form
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Do I need to code the embed myself?
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <p>
                    Not at all. You just copy the embed code we generate for you
                    and paste it into your site. No coding skills are
                    required—everything is designed to be completely no-code
                    friendly.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Do I have to pay to use this?
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <p></p>
                  <p>
                    No. You can use all the features completely free, forever.
                    There are no paid plans or hidden fees—everything is
                    included at no cost.{" "}
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

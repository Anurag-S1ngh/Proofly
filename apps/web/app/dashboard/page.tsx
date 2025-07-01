"use client";

import Footer from "@/components/footer";
import { AllSpacesInterface } from "@/util/types";
import { GetAllSpacesDetails, GetSpaceQuestion } from "@/util/util";
import { Separator } from "@workspace/ui/components/separator";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { FolderKanbanIcon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const [spaces, setSpaces] = useState<{
    totalTestimonials: number;
    spaces: AllSpacesInterface[];
  }>();

  useEffect(() => {
    async function main() {
      let response: AllSpacesInterface[] | false = await GetAllSpacesDetails();
      if (!response) {
        router.push("/signin");
        return;
      }
      console.log(response);
      response = response.reverse();
      const total = response.reduce(
        (sum, space) => sum + space._count.testimonials,
        0,
      );
      console.log(total);
      response = response.map((space) => ({ ...space, total }));
      setSpaces({ totalTestimonials: total, spaces: response });
    }
    main();
  }, []);

  async function GetSpace(linkId: string) {
    const response = await GetSpaceQuestion(linkId);
    if (!response) {
      return;
    }
    router.push("/dashboard/" + linkId);
    return;
  }

  return (
    <>
      {spaces ? (
        <>
          <div className="lg:mx-16 mx-4 my-6 flex flex-col gap-10">
            <div>
              <h3 className="text-neutral-400 font-bold text-lg">Spaces</h3>
              <div className="flex gap-4 mt-1">
                <div
                  onClick={() => {
                    router.push("/space");
                  }}
                  className="bg-neutral-100 rounded-lg h-24 w-24 mt-2 flex justify-center items-center cursor-pointer hover:bg-neutral-200 transition duration-200 border border-neutral-200 "
                >
                  <div className="bg-blue-600 h-10 w-10 rounded-full flex justify-center items-center ">
                    <PlusIcon stroke="white" strokeWidth={2.5} />
                  </div>
                </div>
                {spaces.spaces.map((e) => {
                  return (
                    <div
                      key={e.linkId}
                      onClick={() => {
                        GetSpace(e.linkId);
                      }}
                      className="group bg-neutral-100 rounded-lg h-24 w-24 mt-2 flex flex-col justify-between cursor-pointer transition duration-200 
                         hover:outline hover:outline-violet-400"
                    >
                      <div className="bg-violet-500 w-full h-2/3 rounded-t-lg flex justify-start items-center text-neutral-50  px-4 ">
                        <FolderKanbanIcon
                          size={25}
                          className="translate-y-5/6 text-violet-950"
                        />
                      </div>
                      <div className="bg-violet-200 w-full h-full rounded-b-lg flex justify-start items-center text-neutral-50  px-4 ">
                        <p className="truncate text-violet-950">
                          {e.projectName}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="">
              <h3 className="text-neutral-400 font-bold text-lg">Overview</h3>
              <div className="mt-2 flex gap-5 mt-1 flex-wrap">
                <div className="rounded-2xl bg-white border-5 border-neutral-200 lg:w-48 w-fit lg:py-4 lg:px-5 py-2 px-4 h-fit">
                  <h1 className="font-bold lg:text-5xl text-4xl mb-1">
                    {spaces.spaces.length}
                  </h1>
                  <Separator />
                  <p className="mt-2 text-neutral-600 lg:text-base text-sm">
                    Total Spaces
                  </p>
                </div>
                <div className="rounded-2xl bg-white border-5 border-neutral-200 lg:w-48 w-fit lg:py-4 lg:px-6 py-2 px-4 h-fit">
                  <h1 className="font-bold lg:text-5xl text-4xl mb-1">
                    {spaces.totalTestimonials}
                  </h1>
                  <Separator />
                  <p className="mt-2 tex text-neutral-600 text-sm lg:text-base">
                    Total testimonials
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      ) : (
        <>
          <div className="lg:mx-16 mx-4 my-6">
            <div>
              <h3 className="text-neutral-400 font-bold text-lg">Spaces</h3>
              <div className="flex gap-4 flex-wrap">
                <div className="bg-neutral-100 rounded-lg h-24 w-24 mt-2 flex flex-wrap justify-center items-center cursor-pointer hover:bg-neutral-200 transition duration-200 border border-neutral-200 ">
                  <div className="bg-blue-600 h-10 w-10 rounded-full flex justify-center items-center ">
                    <PlusIcon stroke="white" strokeWidth={2.5} />
                  </div>
                </div>
                <Skeleton className="h-24 w-24 p-4 rounded-xl mt-2" />
                <Skeleton className="h-24 w-24 p-4 rounded-xl mt-2" />
                <Skeleton className="h-24 w-24 p-4 rounded-xl mt-2" />
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-neutral-400 font-bold text-lg">Overview</h3>
              <div className="mt-2 flex gap-5 flex-wrap">
                <Skeleton className="h-[125px] w-[220px] rounded-xl" />
                <Skeleton className="h-[125px] w-[220px] rounded-xl" />
                <Skeleton className="h-[125px] w-[220px] rounded-xl" />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

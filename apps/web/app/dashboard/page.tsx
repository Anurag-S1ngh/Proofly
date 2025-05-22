"use client";

import { AllSpacesInterface } from "@/util/types";
import { GetAllSpacesDetails, GetSpaceQuestion } from "@/util/util";
import { Separator } from "@workspace/ui/components/separator";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { LayoutDashboardIcon, PlusIcon } from "lucide-react";
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
        <div className="lg:mx-16 mx-4 my-6">
          <div>
            <h3 className="text-neutral-400 font-bold text-xl">Spaces</h3>
            <div className="flex gap-4">
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
                    className="group bg-neutral-100 rounded-lg h-24 w-24 mt-2 flex justify-center items-start cursor-pointer transition duration-200 border border-neutral-200 hover:bg-neutral-200"
                  >
                    <div className="bg-violet-500 w-full text-center rounded-t-lg py-3 text-neutral-50 font-semibold group-hover:bg-violet-600">
                      <LayoutDashboardIcon size={15} className="inline mr-1" />
                      {e.projectName}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-neutral-400 font-bold text-xl">Overview</h3>
            <div className="mt-2 flex gap-5">
              <div className="rounded-2xl bg-white border-7 border-neutral-200 w-56 py-4 px-6">
                <h1 className="font-bold text-6xl mb-1">
                  {spaces.spaces.length}
                </h1>
                <Separator />
                <p className="mt-2 text-neutral-600">Total Spaces</p>
              </div>
              <div className="rounded-2xl bg-white border-7 border-neutral-200 w-56 py-4 px-6">
                <h1 className="font-bold text-6xl mb-1">
                  {spaces.totalTestimonials}
                </h1>
                <Separator />
                <p className="mt-2 text-neutral-600">Total testimonials</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="lg:mx-16 mx-4 my-6">
            <div>
              <h3 className="text-neutral-400 font-bold text-xl">Spaces</h3>
              <div className="flex gap-4">
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
                <Skeleton className="h-24 w-24 p-4 rounded-xl mt-2" />
                <Skeleton className="h-24 w-24 p-4 rounded-xl mt-2" />
                <Skeleton className="h-24 w-24 p-4 rounded-xl mt-2" />
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-neutral-400 font-bold text-xl">Overview</h3>
              <div className="mt-2 flex gap-5">
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

"use client";

import Carousel from "@/components/photo-carousel";
import BlurImage from "@/components/blur-image";
import { Skeleton } from "@/components/ui/skeleton";
import { config } from "@/config";
import Image from "next/image";

export const SliderView = () => {
  const projects = config.projects;

  if (projects.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-900 rounded-xl">
        <p className="text-gray-500">No projects to display</p>
      </div>
    );
  }

  return (
    <Carousel
      className="absolute top-0 left-0 w-full h-full rounded-xl"
      containerClassName="h-full"
      autoplayDelay={5000}
    >
      {projects.map((project, index) => {
        const shouldPreload = index < 1;

        return (
          <div key={project.id} className="flex-[0_0_100%] h-full relative group">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="75vw"
              priority={shouldPreload}
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent rounded-xl" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
              <p className="text-sm text-white/90 line-clamp-2">{project.description}</p>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};

export const SliderViewLoadingStatus = () => {
  return (
    <div className="w-full lg:w-1/2 h-[70vh] lg:fixed lg:top-0 lg:left-0 lg:h-screen p-0 lg:p-3 rounded-xl">
      <Skeleton className="w-full h-full" />
    </div>
  );
};

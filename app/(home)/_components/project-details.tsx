"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaFileAlt, FaExternalLinkAlt, FaArrowLeft } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BackgroundParticles from "@/components/BackgroundParticles";

interface ProjectDetailsProps {
  title: string;
  category: string;
  description: string;
  role: string;
  documentationLink?: string;
  websiteLink?: string;
  images?: string[];
  logo?: string;
}

export const ProjectDetails = ({
  title,
  category,
  description,
  role,
  documentationLink,
  websiteLink,
  images = [],
  logo,
}: ProjectDetailsProps) => {
  const router = useRouter();
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  return (
    <section className="relative flex flex-col items-center min-h-screen py-20 px-4">
      {/* Back Button */}
      <Button
        variant="default"
        className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-10 md:left-10 flex items-center gap-2 bg-customLightPink text-customBlack hover:bg-customPink hover:text-white transition font-oleo"
        onClick={() => router.push("/#projects")}
      >
        <FaArrowLeft />
        Back
      </Button>

      {/* Title */}
      <h2 className="text-3xl sm:text-4xl md:text-6xl font-oleo font-bold text-customPink text-center py-2">
        {title}
      </h2>
      <p className="text-sm sm:text-base md:text-lg py-2 font-oleo text-customBlack italic text-center">
        {category}
      </p>

      {/* Description & Role + Logo/Links */}
      <div className="relative z-10 bg-customLightPink p-4 sm:p-6 md:p-8 rounded-xl shadow-lg mt-8 w-full max-w-6xl flex flex-col lg:flex-row gap-6">
        <div className="flex flex-col gap-4 w-full lg:w-2/3">
          <Card className="bg-customLightPink shadow-md hover:border-customPink">
            <CardContent className="p-4 text-customBlack font-oleo text-sm sm:text-base text-justify">
              <strong>Description:</strong> {description}
            </CardContent>
          </Card>

          <Card className="bg-customLightPink shadow-md hover:border-customPink">
            <CardContent className="p-4 text-customBlack font-oleo text-sm sm:text-base">
              <strong>Role:</strong> {role}
            </CardContent>
          </Card>
        </div>

        {/* Logo & Links */}
        <div className="flex flex-col items-center gap-4 w-full lg:w-1/3">
          <Avatar className="h-24 w-24 shadow-lg border-2 border-customBlack hover:border-customPink">
            <AvatarImage
              src={logo || ""}
              alt={`${title} Logo`}
              referrerPolicy="no-referrer"
            />
            <AvatarFallback className="bg-customLightPink text-customBlack font-oleo text-xl">
              {title
                .split(" ")
                .map((w) => w[0])
                .join("")
                .substring(0, 2)
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>

          {documentationLink && (
            <a
              href={documentationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-customBlack hover:text-customPink transition text-sm sm:text-base"
            >
              <FaFileAlt />
              <span className="font-bold">Documentation</span>
            </a>
          )}

          {websiteLink && (
            <a
              href={websiteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-customBlack hover:text-customPink transition text-sm sm:text-base"
            >
              <FaExternalLinkAlt />
              <span className="font-bold">Visit Website</span>
            </a>
          )}
        </div>
      </div>

      {/* Carousel */}
      {images.length > 0 && (
        <div className="w-full max-w-6xl mt-16 px-2 sm:px-4">
          <Carousel
            opts={{ align: "start", dragFree: true }}
            className="w-full"
          >
            <CarouselContent>
              {images.map((src, index) => (
                <CarouselItem
                  key={index}
                  className="basis-[90%] sm:basis-1/2 md:basis-1/3 cursor-pointer"
                >
                  <div className="p-2">
                    <Card>
                      <CardContent className="p-2">
                        <div className="overflow-hidden rounded-lg shadow-md">
                          <Image
                            src={src}
                            alt={`Project image ${index + 1}`}
                            width={1000}
                            height={800}
                            referrerPolicy="no-referrer"
                            onClick={() => setEnlargedImage(src)}
                            className="w-full h-56 sm:h-64 object-cover transition-transform duration-300 ease-in-out hover:scale-105 cursor-zoom-in"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      )}

      {/* Lightbox */}
      {enlargedImage && (
        <div
          className="fixed inset-0 bg-customBlack bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={() => setEnlargedImage(null)}
        >
          <Image
            src={enlargedImage}
            alt="Enlarged"
            width={1000}
            height={800}
            referrerPolicy="no-referrer"
            className="max-w-full max-h-[90vh] rounded-lg shadow-lg object-contain"
          />
        </div>
      )}
    </section>
  );
};

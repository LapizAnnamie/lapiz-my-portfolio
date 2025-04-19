"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const AboutMe = () => {
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  return (
    <section
      id="about"
      className="relative flex flex-col items-center min-h-screen py-20 px-4"
    >
      {/* Title */}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-oleo font-bold text-customPink text-center mt-4">
        About Me
      </h2>

      {/* About Text */}
      <div className="w-full max-w-4xl space-y-6 mt-6 text-center">
        <p className="text-base md:text-lg font-oleo text-customBlack bg-customLightPink p-6 rounded-lg shadow-lg transition-all transform hover:scale-105 hover:bg-customPink">
          I am <span className="font-bold">Annamie Lapiz</span>, a Computer
          Engineering student passionate about technology and problem-solving. I
          enjoy learning new skills, creating software solutions, and exploring
          emerging technologies to make everyday tasks easier and more
          efficient.
        </p>
        <p className="text-base md:text-lg font-oleo text-customBlack bg-customLightPink p-6 rounded-lg shadow-lg transition-all transform hover:scale-105 hover:bg-customPink">
          I believe in continuous growth, taking on challenges, and sharing
          knowledge with others. My interests include coding, UI/UX design, and
          system development. Through my work, I aim to build solutions that
          make a meaningful impact.
        </p>
      </div>

      {/* Carousel */}
      <div className="w-full max-w-6xl mt-6">
        <Carousel opts={{ align: "start", dragFree: true }} className="w-full">
          <CarouselContent>
            {[
              "pic5.jpg",
              "pic1.jpg",
              "pic1.jpeg",
              "pic2.jpeg",
              "pic2.jpg",
              "pic3.jpg",
              "pic4.jpg",
              "pic6.JPG",
              "pic7.JPG",
            ].map((src, index) => (
              <CarouselItem
                key={index}
                className="basis-5/6 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 cursor-pointer"
              >
                <div className="p-2">
                  <Card className="h-full">
                    <CardContent className="p-2">
                      <div className="overflow-hidden rounded-lg shadow-md h-full">
                        <Image
                          src={`/assets/${src}`}
                          alt={`About image ${index + 1}`}
                          onClick={() => setEnlargedImage(`/assets/${src}`)}
                          className="w-full h-56 sm:h-64 md:h-72 object-cover transition-transform duration-300 ease-in-out hover:scale-105 cursor-zoom-in rounded-lg"
                          width={500}
                          height={500}
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

      {/* Lightbox */}
      {enlargedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center px-4"
          onClick={() => setEnlargedImage(null)}
        >
          <Image
            src={enlargedImage}
            alt="Enlarged"
            width={500}
            height={500}
            className="w-full max-w-4xl max-h-[90vh] rounded-lg shadow-lg object-contain"
          />
        </div>
      )}
    </section>
  );
};

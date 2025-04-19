"use client";

import Image from "next/image";
import Link from "next/link";
import { FaDownload } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";

export const HomeHero = () => {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 md:px-12 pt-24 sm:pt-28 md:pt-36 text-center md:text-left gap-10">
      <div className="relative max-w-[200px] sm:max-w-xs md:max-w-md w-full">
        <div className="rounded-full p-2 bg-gradient-to-br from-[#ffc3d8] to-[#ff6fa2] shadow-lg">
          <div className="overflow-hidden rounded-full border-4 border-customWhite">
            <Image
              src="/profile.png"
              alt="Profile Picture"
              width={400}
              height={400}
              className="object-cover w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>

      <div className="md:ml-10 mt-6 md:mt-0 max-w-xl text-customBlack">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-oleo text-customPink">
          Hello!
        </h1>

        <p className="mt-4 text-base sm:text-lg md:text-xl font-oleo text-customBlack">
          I am <span className="font-bold">Annamie</span>, an aspiring{" "}
          <span className="italic">Computer Engineer</span>!
        </p>

        <p className="mt-4 text-sm sm:text-base md:text-lg font-oleo text-customBlack text-justify leading-relaxed">
          I build web and software projects, turning ideas into real, working
          solutions using various programming languages and frameworks. I enjoy
          solving problems, designing user-friendly interfaces, and exploring
          new technology to create useful and efficient applications.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/#contact"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-customLightPink text-customBlack text-base sm:text-sm font-oleo rounded-lg shadow-lg hover:bg-customPink transition"
          >
            <FaLink className="text-xl" />
            Let&apos;s Connect & Build Something Great!
          </Link>

          <Link
            href="https://drive.google.com/file/d/1g2ZQwyNI0swfVUB43-XKQT_KR2X-e7Vn/view?usp=sharing"
            download
            className="flex items-center justify-center gap-2 px-6 py-3 bg-customLightPink text-customBlack text-base sm:text-sm font-oleo rounded-lg shadow-lg hover:bg-customPink transition"
          >
            <FaDownload className="text-xl" />
            Download Resume
          </Link>
        </div>
      </div>
    </section>
  );
};

"use client";

import Image from "next/image";

export const TechStack = () => {
  const techStack = [
    { src: "/assets/react.png", alt: "React", link: "https://react.dev/" },
    {
      src: "/assets/tailwind.png",
      alt: "Tailwind CSS",
      link: "https://tailwindcss.com/",
    },
    { src: "/assets/nextjs.png", alt: "Next.js", link: "https://nextjs.org/" },
    {
      src: "/assets/html.png",
      alt: "HTML",
      link: "https://www.w3schools.com/html/default.asp",
    },
    {
      src: "/assets/css.png",
      alt: "CSS",
      link: "https://www.w3schools.com/css/default.asp",
    },
    {
      src: "/assets/firebase.png",
      alt: "Firebase",
      link: "https://firebase.google.com/",
    },
    {
      src: "/assets/clerk.png",
      alt: "Clerk",
      link: "https://clerk.com/",
    },
    {
      src: "/assets/c.png",
      alt: "C",
      link: "https://www.w3schools.com/c/index.php",
    },
    {
      src: "/assets/cpp.png",
      alt: "C++",
      link: "https://www.w3schools.com/cpp/default.asp",
    },
    {
      src: "/assets/csharp.png",
      alt: "C#",
      link: "https://learn.microsoft.com/en-us/dotnet/csharp/",
    },
    {
      src: "/assets/typescript.png",
      alt: "TypeScript",
      link: "https://www.typescriptlang.org/",
    },
    {
      src: "/assets/javascript.png",
      alt: "JavaScript",
      link: "https://www.w3schools.com/js/default.asp",
    },
    { src: "/assets/java.png", alt: "Java", link: "https://www.java.com/" },
    {
      src: "/assets/flutter.png",
      alt: "Flutter",
      link: "https://flutter.dev/",
    },
  ];

  return (
    <section
      id="tech-stack"
      className="relative flex flex-col items-center min-h-screen py-20 px-4"
    >
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-oleo font-bold text-customPink text-center mt-4">
        Tech Stack
      </h2>

      <p className="text-base sm:text-lg md:text-xl font-oleo text-customBlack bg-customLightPink hover:bg-customPink hover:scale-105 transition-all p-6 rounded-lg shadow-lg text-center mt-10 max-w-3xl">
        I’ve had the opportunity to work with a wide range of technologies,
        honing my skills and delivering impactful solutions.
      </p>

      {/* Tech Icons Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-6 sm:gap-10 mt-12 w-full max-w-6xl">
        {techStack.map(({ src, alt, link }) => (
          <div key={alt} className="flex flex-col items-center">
            <a href={link} target="_blank" rel="noopener noreferrer">
              <Image
                src={src}
                alt={alt}
                width={80}
                height={80}
                className="hover:scale-110 transition-transform duration-200 cursor-pointer hover:drop-shadow-lg"
              />
            </a>
            <p className="text-xs sm:text-sm text-customBlack font-oleo mt-4 text-center">
              {alt}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center text-customBlack font-oleo text-sm sm:text-base md:text-lg px-2">
        <p>“Code, create, and innovate—tech is what I navigate.”</p>
        <p>“Always learning, always growing, a future in tech—ever knowing.”</p>
      </div>
    </section>
  );
};

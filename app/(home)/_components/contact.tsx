"use client";

import { useEffect, useState } from "react";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
import {
  FaFacebook,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaFile,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

export const Contact = () => {
  const [isHome, setIsHome] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const homeSection = document.getElementById("home");
      if (homeSection) {
        const top = homeSection.getBoundingClientRect().top;
        setIsHome(top >= -200 && top <= 200); // tweak range if needed
      }
    };

    handleScroll(); // initial check
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTarget = isHome
    ? () => {
        const contactSection = document.getElementById("contact");
        contactSection?.scrollIntoView({ behavior: "smooth" });
      }
    : () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <section
      id="contact"
      className="relative flex flex-col items-center min-h-screen py-20 px-4 sm:px-6 lg:px-12"
    >
      {/* Section Title */}
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-oleo font-bold text-customPink text-center mt-4">
        Contact Me
      </h2>

      {/* Contact Information */}
      <div className="mt-10 flex flex-col space-y-6 w-full max-w-3xl text-customBlack font-oleo text-base sm:text-lg items-center">
        <a
          href="tel:09318773906"
          className="flex items-center space-x-4 hover:text-customPink transition"
        >
          <FaPhone className="text-2xl text-customPink" />
          <span className="break-words">09318773906 / 09764658354</span>
        </a>
        <a
          href="mailto:lapizannamie18@gmail.com"
          className="flex items-center space-x-4 hover:text-customPink transition"
        >
          <FaEnvelope className="text-2xl text-customPink" />
          <span className="underline break-all">lapizannamie18@gmail.com</span>
        </a>
        <a
          href="https://www.facebook.com/photo?fbid=3828163037502123&set=a.1409934605991657"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-4 hover:text-customPink transition"
        >
          <FaFacebook className="text-2xl text-customPink" />
          <span className="break-words">Annamie Lapiz</span>
        </a>
        <a
          href="https://www.linkedin.com/in/annamie-lapiz-9854912a0"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-4 hover:text-customPink transition"
        >
          <FaLinkedin className="text-2xl text-customPink" />
          <span className="break-words">Annamie Lapiz</span>
        </a>
        <a
          href="https://drive.google.com/file/d/1g2ZQwyNI0swfVUB43-XKQT_KR2X-e7Vn/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-4 hover:text-customPink transition"
        >
          <FaFile className="text-2xl text-customPink" />
          <span>Resume Link</span>
        </a>
      </div>

      {/* Contact Form */}
      <div className="w-full max-w-4xl py-5 text-center">
        <Label className="block text-lg sm:text-xl font-bold font-oleo text-customPink mb-4">
          Get in Touch
        </Label>
        <ContactForm />
      </div>

      {/* Footer */}
      <div
        className="text-center text-customBlack font-oleo text-base sm:text-lg py-4 cursor-pointer hover:text-customPink transition"
        onClick={() => (window.location.href = "/admin")}
      >
        © 2025 AVL Portfolio
      </div>

      {/* Scroll Button */}
      <Button
        onClick={scrollTarget}
        className="fixed bottom-5 right-5 p-4 bg-customLightPink text-customBlack rounded-full shadow-lg hover:bg-customPink transition"
      >
        {isHome ? (
          <FaArrowDown className="text-1xl" />
        ) : (
          <FaArrowUp className="text-1xl" />
        )}
      </Button>
    </section>
  );
};

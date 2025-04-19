"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { FaBars, FaTimes } from "react-icons/fa";

export const HomeNavbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `/#${id}`);
      setActiveSection(id);
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    const sectionIds = [
      "home",
      "about",
      "tech-stack",
      "projects",
      "achievements",
      "testimonials",
      "contact",
    ];
    let lastId = activeSection;
    let timeout: NodeJS.Timeout;

    const handleScrollSpy = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        for (const id of sectionIds) {
          const section = document.getElementById(id);
          if (section) {
            const top = section.getBoundingClientRect().top;
            if (top <= 100 && top >= -300) {
              if (lastId !== id) {
                lastId = id;
                setActiveSection(id);
                if (window.location.hash !== `#${id}`) {
                  window.history.replaceState(null, "", `/#${id}`);
                }
              }
              break;
            }
          }
        }
      }, 200);
    };

    handleScrollSpy();
    window.addEventListener("scroll", handleScrollSpy);
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [activeSection]);

  return (
    <nav className="p-4 fixed top-0 left-0 w-full bg-customVeryLightPink shadow-md z-50">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        <button
          onClick={() => handleScroll("home")}
          className="flex items-center gap-3 text-2xl sm:text-3xl font-oleo font-bold text-customPink focus:outline-none"
        >
          <Image
            src="/logo.png"
            alt="AVL Logo"
            width={60}
            height={60}
            className="object-contain sm:w-[50px] sm:h-[50px]"
          />
          <span className="pt-1 items-center mb-3 ml-5 text-customDarkPink">
            Annamie V. Lapiz
          </span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-4 text-sm sm:text-base md:text-lg font-oleo text-customBlack">
          {[
            { id: "home", label: "Home" },
            { id: "about", label: "About Me" },
            { id: "tech-stack", label: "Tech Stack" },
            { id: "projects", label: "Projects" },
            { id: "achievements", label: "Achievements" },
            { id: "testimonials", label: "Testimonials" },
            { id: "contact", label: "Contact" },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleScroll(id)}
              className={clsx(
                "relative px-4 py-2 rounded-md transition-all duration-300",
                activeSection === id
                  ? "bg-customLightPink text-customWBlack shadow-inner"
                  : "hover:text-customPink"
              )}
            >
              {label}
              {activeSection === id && (
                <span className="absolute inset-0 border-2 border-customPink rounded-md animate-in fade-in zoom-in" />
              )}
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-customPink text-2xl focus:outline-none"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 px-4 flex flex-col gap-3 font-oleo text-base text-customBlack">
          {[
            { id: "home", label: "Home" },
            { id: "about", label: "About Me" },
            { id: "tech-stack", label: "Tech Stack" },
            { id: "projects", label: "Projects" },
            { id: "achievements", label: "Achievements" },
            { id: "testimonials", label: "Testimonials" },
            { id: "contact", label: "Contact" },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleScroll(id)}
              className={clsx(
                "w-full text-left px-4 py-2 rounded-md transition",
                activeSection === id
                  ? "bg-customLightPink text-customWBlack"
                  : "hover:text-customPink"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

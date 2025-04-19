"use client";

import { HomeHero } from "./_components/home-hero";
import { HomeNavbar } from "./_components/home-navbar";
import { AboutMe } from "./_components/about-me";
import { TechStack } from "./_components/tech-stack";
import { Projects } from "./_components/projects";
import { Achievements } from "./_components/achievements";
import { Contact } from "./_components/contact";
import { Testimonial } from "./_components/testimonials";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <HomeNavbar />

      {/* Home Section */}
      <section id="home" className="relative min-h-screen flex flex-col">
        <div className="relative z-10">
          <HomeHero />
        </div>
      </section>

      {/* About Me Section */}
      <section id="about">
        <AboutMe />
      </section>

      {/* Tech Stack Section */}
      <section id="tech-stack">
        <TechStack />
      </section>

      {/* Projects Section */}
      <section id="projects">
        <Projects />
      </section>

      {/* Achievements Section */}
      <section id="achievements">
        <Achievements />
      </section>

      {/* Testimonials Section */}
      <section id="testimonials">
        <Testimonial />
      </section>

      {/* Contact Section */}
      <section id="contact">
        <Contact />
      </section>
    </div>
  );
};

export default HomePage;

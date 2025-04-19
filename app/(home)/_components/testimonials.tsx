"use client";

import TestimonialForm from "@/components/TestimonialForm";
import Testimonials from "@/components/Testimonials";

export const Testimonial = () => {
  return (
    <section
      id="testimonials"
      className="relative flex flex-col items-center min-h-screen py-20 px-4 sm:px-6 lg:px-12"
    >
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-oleo font-bold text-customPink text-center mt-4">
        Testimonials
      </h2>

      {/* Form */}
      <div className="w-full max-w-4xl py-10 text-center">
        <div className="block text-lg sm:text-xl font-bold font-oleo text-customPink mb-6">
          Leave a Testimonial
        </div>
        <TestimonialForm />
      </div>

      {/* Displayed Testimonials */}
      <div className="w-full max-w-4xl">
        <Testimonials />
      </div>
    </section>
  );
};

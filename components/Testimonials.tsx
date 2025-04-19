"use client";

import { useEffect, useState } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase/config";
import { Card, CardContent } from "@/components/ui/card";

type Testimonial = {
  id: string;
  name: string;
  message: string;
};

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const q = query(
        collection(firestore, "testimonials"),
        where("approved", "==", true),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Testimonial, "id">),
      }));
      setTestimonials(data);
    };

    fetchTestimonials();
  }, []);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-12 flex flex-col items-center justify-center">
      {/* Title */}
      <h2 className="text-3xl sm:text-4xl font-bold font-oleo text-customPink text-center mb-8">
        What Others Say
      </h2>

      {/* Testimonials Grid */}
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <Card
            key={t.id}
            className="bg-customLightPink shadow-md border-none backdrop-blur-sm h-full"
          >
            <CardContent className="p-6 flex flex-col justify-between h-full rounded-lg shadow-lg transition-all transform hover:scale-105 hover:bg-customPink">
              <p className="text-customBlack italic font-oleo mb-4">
                “{t.message}”
              </p>
              <p className="text-sm text-right text-customBlack font-oleo">
                — {t.name}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {testimonials.length === 0 && (
        <p className="text-gray-500 font-oleo text-center mt-6">
          No testimonials yet.
        </p>
      )}
    </section>
  );
}

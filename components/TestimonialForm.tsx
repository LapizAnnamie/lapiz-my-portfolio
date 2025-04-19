"use client";

import { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { firestore } from "@/firebase/config";

export default function TestimonialForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const name = (
      formRef.current.elements.namedItem("name") as HTMLInputElement
    )?.value;
    const message = (
      formRef.current.elements.namedItem("message") as HTMLTextAreaElement
    )?.value;

    if (!name || !message) return;

    setLoading(true);
    try {
      await addDoc(collection(firestore, "testimonials"), {
        name,
        message,
        timestamp: serverTimestamp(),
        approved: false,
      });

      toast.success("Testimonial submitted! Awaiting approval.");
      formRef.current.reset();
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      viewport={{ once: true }}
      className="w-full flex justify-center px-4 sm:px-6 lg:px-12 xl:px-24"
    >
      <div className="w-full max-w-4xl">
        <Card className="shadow-md bg-customPink border-none backdrop-blur-sm w-full">
          <CardContent className="p-6 sm:p-8 space-y-5">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-5 flex flex-col"
            >
              <Input
                name="name"
                placeholder="Your Name"
                required
                className="w-full bg-customVeryLightPink font-oleo text-customBlack"
              />
              <Textarea
                name="message"
                placeholder="Your Testimonial"
                rows={5}
                required
                className="w-full bg-customVeryLightPink font-oleo text-customBlack"
              />
              <div className="flex">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:ml-auto sm:w-fit bg-customLightPink text-customBlack font-oleo hover:bg-customBlack hover:text-customWhite transition text-center whitespace-normal break-words"
                >
                  {loading ? "Submitting..." : "Submit Testimonial"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}

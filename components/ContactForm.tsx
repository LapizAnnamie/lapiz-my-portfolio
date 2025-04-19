"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { firestore } from "@/firebase/config";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setLoading(true);

    const formData = {
      name: (formRef.current.elements.namedItem("name") as HTMLInputElement)
        .value,
      email: (formRef.current.elements.namedItem("email") as HTMLInputElement)
        .value,
      message: (
        formRef.current.elements.namedItem("message") as HTMLTextAreaElement
      ).value,
    };

    try {
      await emailjs.sendForm(
        "service_3oxf4m4",
        "template_hs0cy0f",
        formRef.current,
        "PrQscLMljYHs4hsRT"
      );
      await addDoc(collection(firestore, "contactMessages"), {
        ...formData,
        createdAt: serverTimestamp(),
      });

      toast.success("Message Sent! Thank you for reaching out!");
      formRef.current?.reset();
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error("Oops! Something went wrong! Please try again later.");
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
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full bg-customVeryLightPink font-oleo text-customBlack"
            />
            <Textarea
              name="message"
              placeholder="Your Message"
              rows={2}
              required
              className="w-full bg-customVeryLightPink font-oleo text-customBlack"
            />
            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-customLightPink text-customBlack font-oleo hover:bg-customBlack hover:text-customWhite transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}

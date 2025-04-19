"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { firestore } from "@/firebase/config";
import { FaMedal } from "react-icons/fa";

interface Achievement {
  title: string;
  institution: string;
}

export const Achievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const q = query(
          collection(firestore, "achievements"),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => doc.data() as Achievement);
        setAchievements(data);
      } catch (error) {
        console.error("Failed to fetch achievements:", error);
      }
    };

    fetchAchievements();
  }, []);

  return (
    <section
      id="achievements"
      className="relative flex flex-col items-center min-h-screen py-20 px-4"
    >
      {/* Section Title */}
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-oleo font-bold text-customPink text-center mt-4">
        Achievements
      </h2>

      {/* Achievements List */}
      <div className="mt-10 w-full max-w-4xl space-y-4">
        {achievements.map(({ title, institution }, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:items-center bg-customLightPink text-customBlack p-4 sm:p-5 rounded-lg shadow-lg transition-all transform hover:scale-105 hover:bg-customPink"
          >
            {/* Medal Icon */}
            <div className="flex-shrink-0 mb-2 sm:mb-0 sm:mr-4 flex items-center justify-center">
              <FaMedal className="text-customPink text-2xl sm:text-3xl transition-all hover:text-white" />
            </div>

            {/* Achievement Details */}
            <p className="text-base sm:text-lg font-oleo text-center sm:text-left transition-all hover:text-white">
              <span className="font-bold">{title}</span> – {institution}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

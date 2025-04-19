"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { firestore } from "@/firebase/config";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  role: string;
  documentationLink?: string;
  websiteLink?: string;
  logo?: string;
  images?: string[];
}

export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const q = query(
        collection(firestore, "projects"),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Project, "id">),
      }));
      setProjects(data);
    };

    fetchProjects();
  }, []);

  return (
    <section
      id="projects"
      className="relative flex flex-col items-center min-h-screen py-20 px-4"
    >
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-oleo font-bold text-customPink text-center mt-4">
        Projects
      </h2>

      <p className="text-lg font-oleo text-customBlack bg-customLightPink transition-all transform hover:scale-105 hover:bg-customPink p-6 rounded-lg shadow-lg text-center mt-8 max-w-8xl">
        Most of these projects were developed collaboratively with a team, where
        I took on various roles, including front-end developer, back-end
        developer, and UI/UX designer. For more details about the projects, a
        compiled reference document is available.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-full max-w-7xl">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="bg-customVeryLightPink p-4 rounded-2xl shadow-lg flex flex-col items-center transition-all hover:scale-[1.02]"
          >
            <CardHeader className="flex flex-col items-center space-y-2">
              <Avatar className="h-24 w-24 shadow-lg border-2 border-customPink hover:border-customLightPink">
                <AvatarImage
                  src={project.logo || ""}
                  alt={`${project.title} Logo`}
                  referrerPolicy="no-referrer"
                />
                <AvatarFallback className="bg-customLightPink text-customBlack font-oleo text-xl">
                  {project.title
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .substring(0, 2)
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <CardTitle className="text-xl font-oleo text-customPink text-center">
                {project.title}
              </CardTitle>
              <CardDescription className="text-sm italic text-customBlack text-center">
                {project.category}
              </CardDescription>
            </CardHeader>

            <CardContent className="bg-customLightPink rounded-lg p-4 w-full text-sm font-oleo text-customBlack text-center min-h-[100px]">
              {project.description}
            </CardContent>

            <CardFooter className="mt-6">
              <Link
                href={`/${project.id}`}
                className="px-6 py-2 bg-customPink text-customBlack font-oleo rounded-lg shadow-lg hover:text-customWhite hover:bg-[#B86E92] transition-all transform hover:scale-105"
              >
                More Details
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

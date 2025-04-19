"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/firebase/config";
import { Spinner } from "@/components/spinner";
import { ProjectDetails } from "../_components/project-details";
import { toast } from "sonner";

interface Project {
  title: string;
  category: string;
  description: string;
  role: string;
  documentationLink?: string;
  websiteLink?: string;
  logo?: string;
  images?: string[];
}

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const ref = doc(firestore, "projects", params.id);
        const snapshot = await getDoc(ref);

        if (!snapshot.exists()) {
          toast.error("Project not found.");
          if (
            window.location.pathname !== "/" ||
            window.location.hash !== "#projects"
          ) {
            router.replace("/#projects");
          }

          return;
        }

        setProject(snapshot.data() as Project);
      } catch (err) {
        console.error("Failed to fetch project:", err);
        toast.error("Error loading project.");
        if (
          window.location.pathname !== "/" ||
          window.location.hash !== "#projects"
        ) {
          router.replace("/#projects");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="icon" text="default" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-20 text-red-500 font-bold text-xl">
        Project not found.
      </div>
    );
  }

  return <ProjectDetails {...project} />;
}

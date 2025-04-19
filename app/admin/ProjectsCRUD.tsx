"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { firestore } from "@/firebase/config";
import { serverTimestamp } from "firebase/firestore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface ProjectForm {
  title: string;
  category: string;
  description: string;
  role: string;
  documentationLink?: string;
  websiteLink?: string;
  logo?: string;
  images: string[];
  createdAt?: any;
}

export default function ProjectsCRUD() {
  const [projects, setProjects] = useState<(ProjectForm & { id: string })[]>(
    []
  );
  const [newProject, setNewProject] = useState<ProjectForm>({
    title: "",
    category: "",
    description: "",
    role: "",
    documentationLink: "",
    websiteLink: "",
    logo: "",
    images: [],
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const q = query(collection(firestore, "projects"), orderBy("title"));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<ProjectForm, "id">),
    }));
    setProjects(data);
  };

  const handleAdd = async () => {
    if (!newProject.title || !newProject.category) {
      return toast.error("Project title and category are required");
    }

    await addDoc(collection(firestore, "projects"), {
      ...newProject,
      createdAt: serverTimestamp(),
    });

    toast.success("Project added");

    setNewProject({
      title: "",
      category: "",
      description: "",
      role: "",
      documentationLink: "",
      websiteLink: "",
      logo: "",
      images: [],
    });

    fetchProjects();
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(firestore, "projects", id));
    toast.success("Project deleted");
    fetchProjects();
  };

  const handleUpdate = async (id: string, updated: ProjectForm) => {
    await updateDoc(doc(firestore, "projects", id), updated as any);
    toast.success("Project updated");
    fetchProjects();
  };

  return (
    <section className="my-10">
      <h3 className="text-2xl font-bold text-customPink font-oleo mb-4">
        Manage Projects
      </h3>

      <div className="grid gap-2 mb-4">
        <Input
          placeholder="Title"
          className="flex-1 bg-customLightPink text-customBlack font-semibold"
          value={newProject.title}
          onChange={(e) =>
            setNewProject({ ...newProject, title: e.target.value })
          }
        />
        <Input
          placeholder="Category"
          className="flex-1 bg-customLightPink text-customBlack font-semibold"
          value={newProject.category}
          onChange={(e) =>
            setNewProject({ ...newProject, category: e.target.value })
          }
        />
        <Textarea
          className="bg-customLightPink text-customBlack font-semibold"
          placeholder="Description"
          value={newProject.description}
          onChange={(e) =>
            setNewProject({ ...newProject, description: e.target.value })
          }
        />
        <Input
          placeholder="Role"
          className="flex-1 bg-customLightPink text-customBlack font-semibold"
          value={newProject.role}
          onChange={(e) =>
            setNewProject({ ...newProject, role: e.target.value })
          }
        />
        <Input
          placeholder="Documentation Link"
          className="flex-1 bg-customLightPink text-customBlack font-semibold"
          value={newProject.documentationLink}
          onChange={(e) =>
            setNewProject({ ...newProject, documentationLink: e.target.value })
          }
        />
        <Input
          placeholder="Website Link"
          className="flex-1 bg-customLightPink text-customBlack font-semibold"
          value={newProject.websiteLink}
          onChange={(e) =>
            setNewProject({ ...newProject, websiteLink: e.target.value })
          }
        />
        <Input
          placeholder="Logo URL"
          className="flex-1 bg-customLightPink text-customBlack font-semibold"
          value={newProject.logo}
          onChange={(e) =>
            setNewProject({ ...newProject, logo: e.target.value })
          }
        />
        <Textarea
          className="bg-customLightPink text-customBlack font-semibold"
          placeholder="Image URLs (comma-separated) (you can upload it in: https://imgur.com/upload)"
          value={newProject.images.join(",")}
          onChange={(e) =>
            setNewProject({
              ...newProject,
              images: e.target.value.split(",").map((i) => i.trim()),
            })
          }
        />
        <Button
          variant="secondary"
          onClick={handleAdd}
          className="bg-customPink"
        >
          Add Project
        </Button>
      </div>

      <div className="grid gap-4 mt-8">
        {projects.map((proj) => (
          <Card key={proj.id} className="bg-customLightPink shadow-md">
            <CardContent className="p-4 grid gap-2">
              <Input
                className="bg-customPink text-customBlack font-semibold"
                value={proj.title}
                onChange={(e) =>
                  setProjects((prev) =>
                    prev.map((p) =>
                      p.id === proj.id ? { ...p, title: e.target.value } : p
                    )
                  )
                }
              />
              <Input
                className="bg-customPink text-customBlack font-semibold"
                value={proj.category}
                onChange={(e) =>
                  setProjects((prev) =>
                    prev.map((p) =>
                      p.id === proj.id ? { ...p, category: e.target.value } : p
                    )
                  )
                }
              />
              <Textarea
                className="bg-customPink text-customBlack font-semibold"
                value={proj.description}
                onChange={(e) =>
                  setProjects((prev) =>
                    prev.map((p) =>
                      p.id === proj.id
                        ? { ...p, description: e.target.value }
                        : p
                    )
                  )
                }
              />
              <Input
                className="bg-customPink text-customBlack font-semibold"
                value={proj.role}
                onChange={(e) =>
                  setProjects((prev) =>
                    prev.map((p) =>
                      p.id === proj.id ? { ...p, role: e.target.value } : p
                    )
                  )
                }
              />
              <Input
                className="bg-customPink text-customBlack font-semibold"
                placeholder="Documentation"
                value={proj.documentationLink ?? ""}
                onChange={(e) =>
                  setProjects((prev) =>
                    prev.map((p) =>
                      p.id === proj.id
                        ? { ...p, documentationLink: e.target.value }
                        : p
                    )
                  )
                }
              />
              <Input
                className="bg-customPink text-customBlack font-semibold"
                placeholder="Website"
                value={proj.websiteLink ?? ""}
                onChange={(e) =>
                  setProjects((prev) =>
                    prev.map((p) =>
                      p.id === proj.id
                        ? { ...p, websiteLink: e.target.value }
                        : p
                    )
                  )
                }
              />
              <Input
                className="bg-customPink text-customBlack font-semibold"
                placeholder="Logo"
                value={proj.logo ?? ""}
                onChange={(e) =>
                  setProjects((prev) =>
                    prev.map((p) =>
                      p.id === proj.id ? { ...p, logo: e.target.value } : p
                    )
                  )
                }
              />
              <Textarea
                className="bg-customPink text-customBlack font-semibold"
                placeholder="Image URLs (comma-separated)"
                value={proj.images.join(",")}
                onChange={(e) =>
                  setProjects((prev) =>
                    prev.map((p) =>
                      p.id === proj.id
                        ? {
                            ...p,
                            images: e.target.value
                              .split(",")
                              .map((i) => i.trim()),
                          }
                        : p
                    )
                  )
                }
              />
              <div className="flex gap-2 mt-2">
                <Button
                  variant="secondary"
                  onClick={() =>
                    handleUpdate(proj.id, {
                      title: proj.title,
                      category: proj.category,
                      description: proj.description,
                      role: proj.role,
                      documentationLink: proj.documentationLink,
                      websiteLink: proj.websiteLink,
                      logo: proj.logo,
                      images: proj.images,
                    })
                  }
                >
                  Update
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(proj.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

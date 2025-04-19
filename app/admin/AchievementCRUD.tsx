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
import { serverTimestamp } from "firebase/firestore";
import { firestore } from "@/firebase/config";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

interface Achievement {
  id: string;
  title: string;
  institution: string;
}

export default function ProjectAchievement() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newInstitution, setNewInstitution] = useState("");

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    const q = query(
      collection(firestore, "achievements"),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Achievement, "id">),
    }));
    setAchievements(data);
  };

  const handleAdd = async () => {
    if (!newTitle || !newInstitution) return toast.error("Fill in all fields.");

    await addDoc(collection(firestore, "achievements"), {
      title: newTitle,
      institution: newInstitution,
      createdAt: serverTimestamp(),
    });

    toast.success("Achievement added!");
    setNewTitle("");
    setNewInstitution("");
    fetchAchievements();
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(firestore, "achievements", id));
    toast.success("Achievement deleted!");
    fetchAchievements();
  };

  const handleUpdate = async (id: string, updated: Achievement) => {
    await updateDoc(doc(firestore, "achievements", id), {
      title: updated.title,
      institution: updated.institution,
    });
    toast.success("Achievement updated!");
    fetchAchievements();
  };

  return (
    <section className="my-10">
      <h3 className="text-2xl font-bold text-customPink font-oleo mb-4">
        Manage Achievements
      </h3>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Input
          placeholder="Achievement Title"
          className="flex-1 bg-customLightPink text-customBlack font-semibold"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <Input
          placeholder="Institution"
          className="flex-1 bg-customLightPink text-customBlack font-semibold"
          value={newInstitution}
          onChange={(e) => setNewInstitution(e.target.value)}
        />
        <Button
          variant="secondary"
          onClick={handleAdd}
          className="bg-customPink"
        >
          Add
        </Button>
      </div>

      <div className="grid gap-4 mt-8">
        {achievements.map((ach) => (
          <Card key={ach.id} className="bg-customLightPink shadow-md">
            <CardContent className="p-4 space-y-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  className="flex-1 bg-customPink text-customBlack font-semibold"
                  value={ach.title}
                  onChange={(e) =>
                    setAchievements((prev) =>
                      prev.map((a) =>
                        a.id === ach.id ? { ...a, title: e.target.value } : a
                      )
                    )
                  }
                />
                <Input
                  className="flex-1 bg-customPink text-customBlack font-semibold"
                  value={ach.institution}
                  onChange={(e) =>
                    setAchievements((prev) =>
                      prev.map((a) =>
                        a.id === ach.id
                          ? { ...a, institution: e.target.value }
                          : a
                      )
                    )
                  }
                />
                <Button
                  variant="secondary"
                  onClick={() => handleUpdate(ach.id, ach)}
                >
                  Update
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(ach.id)}
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

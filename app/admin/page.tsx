"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/firebase/config";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "sonner";
import { AdminDashboard } from "@/app/admin/AdminDashboard";
import BackgroundParticles from "@/components/BackgroundParticles";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Access granted.");
    } catch (err) {
      toast.error("Invalid email or password.");
      console.error(err);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    toast.success("Logged out.");
  };

  if (authenticated) return <AdminDashboard onLogout={handleLogout} />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-customLightPink">
      <BackgroundParticles />
      <Button
        variant="default"
        className="absolute top-4 left-4 flex items-center gap-2 bg-customLightPink text-customBlack hover:bg-customPink hover:text-white transition font-oleo"
        onClick={() => router.push("/#contact")}
      >
        <FaArrowLeft />
        Back
      </Button>

      <div className="bg-customPink shadow-md rounded-lg p-6 w-full max-w-md space-y-4 relative z-10">
        <h2 className="text-xl font-bold text-customWhite text-center font-oleo">
          Admin Login
        </h2>
        <Input
          type="email"
          placeholder="Enter admin email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-customVeryLightPink text-customBlack font-oleo"
        />
        <Input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-customVeryLightPink text-customBlack font-oleo"
        />
        <Button
          onClick={handleLogin}
          className="w-full bg-customLightPink text-customBlack font-oleo hover:bg-customBlack hover:text-white"
        >
          Login
        </Button>
      </div>
    </div>
  );
}

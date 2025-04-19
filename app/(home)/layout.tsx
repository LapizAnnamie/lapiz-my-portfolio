import BackgroundParticles from "@/components/BackgroundParticles";
const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full overflow-auto bg-customVeryLightPink">
      <BackgroundParticles />
      <div className="mx-auto max-w-screen-xl h-full w-full">{children}</div>
    </main>
  );
};

export default HomeLayout;

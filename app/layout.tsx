import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";
import BackgroundParticles from "@/components/BackgroundParticles"; // ✅ Import here

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} relative bg-customVeryLightPink`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
          storageKey="my-portfolio-theme"
        >
          <Toaster
            position="bottom-center"
            toastOptions={{
              unstyled: false,
              classNames: {
                closeButton: "bg-lime-400",
                loading: "bg-blue-500 text-white",
                success: "bg-green-500 text-white font-bold",
                error: "bg-red-500 text-white font-bold",
                warning: "bg-yellow-400 text-black",
                info: "bg-blue-400 text-white",
              },
            }}
          />

          <main className="relative z-10">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}

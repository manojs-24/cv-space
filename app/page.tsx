import DarkVeil from "@/components/react-bits/DarkVeil";
import Navbar from "@/components/static/Navbar";
import MainSection from "@/section/MainSection";

export default function Home() {
  return (
    <div className="relative h-dvh w-full overflow-hidden">
      {/* Background - Fullscreen */}
      <div className="absolute inset-0 -z-10">
        <DarkVeil />
      </div>

      {/* Content on top of background */}
      <div className="relative z-10 flex flex-col min-h-dvh">
        {/* Sticky Navbar */}
        <header className="sticky top-0 z-20">
          <Navbar />
        </header>

        {/* Main content */}
        <main className="flex-1">
          <MainSection />
        </main>
      </div>
    </div>
  );
}

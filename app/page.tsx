import DarkVeil from "@/components/react-bits/DarkVeil";
import Navbar from "@/components/static/Navbar";
import MainSection from "@/section/MainSection";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full">
      {/* Background - Fullscreen */}
      <div className="fixed inset-0 -z-10">
        <DarkVeil />
      </div>

      {/* Content on top of background */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Sticky Navbar */}
        <header className="sticky top-0 z-20">
          <Navbar />
        </header>

        {/* Main content (will scroll if needed) */}
        <main className="flex-1 overflow-auto">
          <MainSection />
        </main>
      </div>
    </div>
  );
}

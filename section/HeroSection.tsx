"use client";

import React, { useState } from "react";
import SummarizeSection from "./SummarizeSection";
import AtsScoreSection from "./AtsScoreSection";

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<"summarize" | "ats">("summarize");

  return (
    <>
      {/* Title + Description */}
      <div className="flex flex-col items-center justify-center gap-6 mt-6">
        <h1 className="text-4xl lg:text-6xl text-white font-bold text-center px-4">
          Your CV. GEMINI AI. Instant Insight.
        </h1>
        <p className="text-white text-center max-w-4xl text-lg px-6">
          Upload your CV or resume and get an AI-generated professional summary,
          improvement suggestions, and an ATS score based on your target role — all in seconds.
        </p>

        {/* Tab Buttons */}


        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <button
            onClick={() => setActiveTab("summarize")}
            className={`px-6 py-3 rounded-full backdrop-blur-md transition font-semibold cursor-pointer
              ${
                activeTab === "summarize"
                  ? "bg-white text-black shadow"
                  : "text-white border bg-gray-500/20 backdrop-blur-2xl border-white/30"
              }`}
          >
            Summarize
          </button>

          <button
            onClick={() => setActiveTab("ats")}
            className={`px-6 py-3 rounded-full backdrop-blur-md transition font-semibold cursor-pointer
              ${
                activeTab === "ats"
                  ? "bg-white text-black shadow"
                  : "text-white border bg-gray-500/20 backdrop-blur-2xl border-white/30 "
              }`}
          >
            Check ATS Score
          </button>
        </div>
      </div>

      {/* Conditional Sections */}
      <div className="mt-8">
        {activeTab === "summarize" ? <SummarizeSection /> : <AtsScoreSection />}
      </div>
    </>
  );
}

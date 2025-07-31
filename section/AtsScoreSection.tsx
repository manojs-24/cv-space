"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { FaCopy } from "react-icons/fa6";

export default function AtsScoreSection() {
  const [file, setFile] = useState<File | null>(null);
  const [role, setRole] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [points, setPoints] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      toast.error("Please upload a valid PDF file.");
      setFile(null);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error("Please upload your resume.");
      return;
    }

    if (!role.trim()) {
      toast.error("Please enter a job role.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("role", role);

    try {
      setLoading(true);
      const response = await axios.post(
        "https://resume-analyser-server.onrender.com/ats-score",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const result = response.data;

      if (result.success && result.data?.result) {
        const parsed = JSON.parse(
          result.data.result.replace(/```json|```/g, "")
        );
        setScore(parsed.score);
        setPoints(parsed.points);
      } else {
        toast.error(result.message || "Failed to analyze ATS score.");
      }
    } catch (error: any) {
      console.error("ATS API error:", error);
      toast.error("Something went wrong while submitting.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyPoints = async () => {
    const pointsText = points.map((p, i) => `${i + 1}. ${p}`).join("\n");
    try {
      await navigator.clipboard.writeText(pointsText);
      toast.info("ATS feedback copied!");
    } catch (err) {
      toast.error("Failed to copy points.");
    }
  };

  return (
    <div className="flex flex-col gap-6 text-white p-2 md:p-4 md:w-11/12 mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold">ATS Score Analyzer</h1>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="bg-gray-600/40 cursor-pointer border w-full border-gray-700 backdrop-blur-2xl text-white rounded-xl px-2 py-3 "
          />

          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Enter the job role"
            className="bg-gray-600/40 w-full border border-gray-700 backdrop-blur-2xl text-white rounded-xl px-3 py-3"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="cursor-pointer w-fit mx-auto md:mx-0 bg-violet-700 hover:bg-violet-800 px-4 py-3 rounded-2xl text-white disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Get ATS Score"}
        </button>
      </div>
      {/* {score !== null && ( */}
      <div className="relative bg-gray-950 p-4 rounded-2xl mt-4 border border-gray-700">
        {/* Copy Button */}
        <button
          onClick={handleCopyPoints}
          className="absolute cursor-pointer top-4 right-4 text-white bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-full p-2 transition"
          aria-label="Copy ATS points"
        >
          <FaCopy size={18} />
        </button>

        <h2 className="text-xl font-semibold mb-2 mt-2 text-green-400 border w-fit p-3 px-6 rounded-2xl">
          ATS Score: {score ?? "?"}/100
        </h2>

        <ul className={`list-disc pl-5 space-y-1 ${points.length > 0 && "mt-6"}  text-white `}>
          {points.map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
      </div>
      {/* )} */}
    </div>
  );
}

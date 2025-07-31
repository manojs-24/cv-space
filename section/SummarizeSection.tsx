"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { FaCopy } from "react-icons/fa6";

export default function SummarizeSection() {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState("");
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
      toast.error("Please select a PDF file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const response = await axios.post(
        "https://resume-analyser-server.onrender.com/generate-summary",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Log full response
      console.log("API response:", response);

      const result = response.data;

      if (result.success && result.data?.summary) {
        setSummary(result.data.summary);
      } else {
        toast.error(result.message || "Failed to generate summary");
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "API error occurred while uploading."
        );
      } else {
        toast.error("Something went wrong while uploading.");
      }
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };


   const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      toast.info("Summary copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy!");
    }
  };


  return (
    <div className="flex flex-col gap-6 text-white p-2 md:p-4 md:w-11/12 mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold">Summarize CV</h1>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="bg-gray-600/40 border border-gray-700 w-full backdrop-blur-2xl text-white rounded-xl px-2 py-3 cursor-pointer"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="cursor-pointer bg-violet-700 hover:bg-violet-800 px-4 py-3 rounded-2xl text-white disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Summary"}
        </button>
      </div>
    <div className="relative mt-6">

      <button
        onClick={handleCopy}
        className="absolute cursor-pointer top-4 right-4 text-white bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-full p-2 transition"
        aria-label="Copy summary"
      >
        <FaCopy size={18} />
      </button>

      <textarea
        value={summary}
        readOnly
        rows={12}
        className="w-full bg-gray-950 text-white border border-gray-700 rounded-2xl p-3 "
        placeholder="Summary of your CV or resume..."
      />
    </div>
    </div>
  );
}

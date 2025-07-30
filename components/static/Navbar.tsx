import React from "react";
import GlassSurface from "../react-bits/GlassSurface";
import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <div className="w-full px-2">
        <GlassSurface
          borderRadius={32}
          className="w-full rounded-3xl shadow-lg py-3 mt-4"
        >
          <div className="w-full flex justify-between items-center px-6">
            <h2 className="text-white text-xl font-semibold font-eagle">CV-Space</h2>

            <Link href="https://buymeacoffee.com/manojs24" target="_blank" rel="noopener noreferrer">
              <div className="flex items-center space-x-4">
                <img src="/cffe.png" alt="" className="w-7 h-7" />
                <h1 className="text-white hidden md:block">Buy Developer a Coffee</h1>
              </div>
            </Link>
          </div>
        </GlassSurface>
      </div>
    </>
  );
}

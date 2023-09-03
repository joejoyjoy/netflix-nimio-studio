"use client";

import Image from "next/image";
import { downScaleImage } from "@/utils/downScaleImage";
import { minutesToHours } from "@/utils/minutesToHours";
import { FaPlay } from "react-icons/fa";

export default function MovieCard({ data }) {
  return (
    <div className="relative w-full aspect-[3/4] bg-slate-3 overflow-hidden rounded-2xl">
      <Image
        src={downScaleImage(data.cover.secure_url)}
        alt={data.name}
        className="object-cover"
        fill={true}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 50vw"
        priority
      />
      <div className="absolute bottom-0 w-full aspect-[5/1] flex items-center p-4 rounded-2xl backdrop-blur-sm bg-gray-400/40">
        <div className="p-3 bg-gray-300/70 rounded-full">
          <FaPlay className="text-white text-sm" />
        </div>
        <div className="mx-3">
          <h2 className="text-white leading-5 line-clamp-1">{data.name}</h2>
          <p className="text-white text-sm font-light leading-4 line-clamp-1">
            {data.categories[0].name}{" "}
            {data.categories[1]?.name ? " / " + data.categories[1].name : ""}
          </p>
        </div>
      </div>
      <div className="absolute right-3 bottom-20 bg-white px-3 py-1 rounded-full text-amber-900">
        {minutesToHours(data.duration)}
      </div>
    </div>
  );
}

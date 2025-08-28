// src/components/surah/surah-card.tsx
"use client";

import React from "react";
import { Play, MapPin, BookOpen } from "lucide-react"; // pakai lucide
import { cn } from "@/lib/utils";
import type { Surah } from "@/types/quran";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

interface SuratCardProps {
	surah: Surah;
	onPlay?: (surah: Surah) => void;
	className?: string;
}

export const SuratCard: React.FC<SuratCardProps> = ({
	surah,
	onPlay,
	className,
}) => {
	const handlePlay = (e: React.MouseEvent) => {
		e.preventDefault();
		if (onPlay) onPlay(surah);
		else console.log("play surah", surah.nomor, surah.namaLatin);
	};

	return (
		<Link href={`/surah/${surah.nomor}`} className="block h-full">
			<motion.article
				role="article"
				aria-labelledby={`surah-${surah.nomor}`}
				whileHover={{ scale: 1.02, y: -3 }}
				transition={{ type: "spring", stiffness: 200, damping: 15 }}
				className={cn(
					"flex h-full min-h-[7rem] rounded-xl border bg-white/80 p-3 sm:p-4 shadow-sm dark:bg-gray-900 dark:border-zinc-800",
					"items-center gap-3 sm:gap-6 transition-shadow hover:shadow-lg",
					"flex-row text-left",
					className
				)}>
				{/* nomor */}
				<div className="flex-shrink-0 self-center">
					<div className="relative">
						<div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 border-yellow-400/80 flex items-center justify-center">
							<span className="font-semibold text-yellow-600 text-sm sm:text-base">
								{surah.nomor}
							</span>
						</div>
						<Button
							aria-label={`Play surat ${surah.namaLatin}`}
							onClick={handlePlay}
							variant="ghost"
							size="icon"
							className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 sm:translate-x-1/3 sm:-translate-y-1/3"
							title={`Play ${surah.namaLatin}`}>
							<Play className="h-4 w-4 sm:h-5 sm:w-5" />
						</Button>
					</div>
				</div>

				{/* main info */}
				<div className="flex min-w-0 flex-1 flex-col justify-between">
					<div className="flex items-center justify-between gap-3 h-full">
						<div className="min-w-0 flex-1">
							<h3
								id={`surah-${surah.nomor}`}
								className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100">
								{surah.namaLatin}
							</h3>
							<span className="block text-xs sm:text-sm font-normal text-gray-500 dark:text-gray-400">
								({surah.arti})
							</span>

							<div className="mt-1 sm:mt-2 flex flex-wrap gap-1.5 sm:gap-2">
								<span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-medium text-gray-700 dark:bg-zinc-800 dark:text-gray-200">
									<MapPin className="mr-1 h-3 w-3 sm:h-3.5 sm:w-3.5" />
									{surah.tempatTurun}
								</span>

								<span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-medium text-gray-700 dark:bg-zinc-800 dark:text-gray-200">
									<BookOpen className="mr-1 h-3 w-3 sm:h-3.5 sm:w-3.5" />
									{surah.jumlahAyat} Ayat
								</span>
							</div>
						</div>

						{/* Arabic name */}
						<div className="shrink-0 text-green-600 flex items-center justify-center">
							<div className="arabic text-2xl sm:text-3xl  leading-none">
								{surah.nama}
							</div>
						</div>
					</div>
				</div>
			</motion.article>
		</Link>
	);
};

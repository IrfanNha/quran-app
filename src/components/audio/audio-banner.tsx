"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAudio } from "./audio-provider";
import { Play, Pause, RotateCcw, X, ArrowUp } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";
import { QARI_MAP } from "@/constants/qari-map";

export function AudioBanner() {
	const {
		currentTrack,
		isPlaying,
		progress,
		duration,
		togglePlay,
		seek,
		seekTo,
		clearTrack,
	} = useAudio();

	return (
		<AnimatePresence>
			{currentTrack && (
				<motion.div
					initial={{ y: 100, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: 100, opacity: 0 }}
					transition={{ type: "spring", stiffness: 200, damping: 20 }}
					className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] sm:w-[400px] rounded-2xl bg-background/90 backdrop-blur shadow-lg border p-4 flex flex-col gap-3 z-50">
					{/* Info + Close Button */}
					<div className="flex items-center justify-between text-sm">
						<div className="flex items-center gap-2">
							<div className="flex flex-col">
								<Link
									href={`/surah/${currentTrack.surahId}`}
									className="font-medium hover:underline flex items-center gap-1"
									title="Kembali ke Surah">
									<span>{currentTrack.surah}</span>
									<ArrowUp className="h-4 w-4 text-green-600 dark:text-green-400" />
								</Link>
								<span className="text-muted-foreground">
									{QARI_MAP[currentTrack.qari] ||
										currentTrack.qari}
								</span>
							</div>
						</div>

						<Button
							size="icon"
							variant="ghost"
							onClick={clearTrack}
							aria-label="Tutup">
							<X className="h-5 w-5" />
						</Button>
					</div>

					{/* Progress Bar */}
					<div className="flex items-center gap-2">
						<span className="text-xs text-muted-foreground w-10 text-right">
							{formatTime(progress)}
						</span>
						<Slider
							value={[progress]}
							max={duration}
							step={1}
							className="flex-1"
							onValueChange={(val) => seekTo(val[0])}
						/>
						<span className="text-xs text-muted-foreground w-10">
							{formatTime(duration)}
						</span>
					</div>

					{/* Controls */}
					<div className="flex items-center justify-center gap-4">
						<Button
							size="icon"
							variant="ghost"
							onClick={() => seek(-10)}
							aria-label="Mundur 10 detik">
							<RotateCcw className="h-5 w-5" />
						</Button>

						<Button
							size="icon"
							variant="outline"
							onClick={togglePlay}>
							{isPlaying ? (
								<Pause className="h-6 w-6" />
							) : (
								<Play className="h-6 w-6" />
							)}
						</Button>

						<Button
							size="icon"
							variant="ghost"
							onClick={() => seek(10)}
							aria-label="Maju 10 detik">
							<RotateCcw className="h-5 w-5 rotate-180" />
						</Button>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

function formatTime(sec: number) {
	if (!sec || isNaN(sec)) return "0:00";
	const m = Math.floor(sec / 60);
	const s = Math.floor(sec % 60);
	return `${m}:${s.toString().padStart(2, "0")}`;
}

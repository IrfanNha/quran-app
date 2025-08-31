"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowRight, BookOpen } from "lucide-react";
import TafsirModal from "../surah/tafsir-modal";
import { useRandomAyatStore } from "@/store/useRandomAyatStore";
import { toPng } from "html-to-image";

export default function RandomAyatBanner() {
	const router = useRouter();
	const { ayat, loading, fetchRandomAyat } = useRandomAyatStore();
	const [tafsirOpen, setTafsirOpen] = React.useState(false);
	const [countdown, setCountdown] = React.useState(0);
	const bannerRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		fetchRandomAyat();
	}, [fetchRandomAyat]);

	React.useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date();
			const nextDay = new Date(
				now.getFullYear(),
				now.getMonth(),
				now.getDate() + 1
			);
			setCountdown(nextDay.getTime() - now.getTime());
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	const handleExportPNG = React.useCallback(async () => {
		if (!bannerRef.current || !ayat) return;
		try {
			const dataUrl = await toPng(bannerRef.current, {
				filter: (node) => !(node instanceof HTMLButtonElement),
				pixelRatio: 2,
				backgroundColor:
					window.getComputedStyle(bannerRef.current)
						.backgroundColor || "#fff",
				style: { fontFamily: "'Poppins', sans-serif" },
			});
			const link = document.createElement("a");
			link.href = dataUrl;
			link.download = `QuranApp-RandomAyat-${ayat.surahLatin}-${ayat.ayatNumber}.png`;
			link.click();
		} catch (err) {
			console.error("Failed to export banner as PNG", err);
		}
	}, [ayat]);

	if (loading || !ayat) {
		return (
			<div className="animate-pulse bg-green-100/50 p-6 rounded-2xl max-w-3xl mx-auto space-y-2">
				<div className="h-6 w-3/4 bg-green-300 rounded" />
				<div className="h-4 w-full bg-green-200 rounded" />
				<div className="h-4 w-full bg-green-200 rounded" />
			</div>
		);
	}

	const hours = Math.floor(countdown / 1000 / 3600);
	const minutes = Math.floor((countdown / 1000 / 60) % 60);

	return (
		<div className="w-full flex justify-center items-center">
			<motion.div
				ref={bannerRef}
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				style={{
					fontFamily: "'Poppins', sans-serif",
					direction: "ltr",
				}}
				className="relative w-full max-w-4xl rounded-2xl border p-6 lg:py-14 bg-green-100/30 dark:bg-gray-900 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
				<div className="flex-1 min-w-0 text-center md:text-left">
					<p className="text-sm md:text-md mt-1 font-base mb-3">
						Q.S {ayat.surahLatin} ({ayat.ayatNumber})
					</p>
					<h2 className="text-lg md:text-xl font-semibold arabic">
						{ayat.teksArab}
					</h2>
					<p className="text-sm md:text-base mt-1 italic">
						{ayat.teksIndonesia}
					</p>
					<p className="text-xs text-green-700 mt-2 dark:text-green-400">
						Next random ayat in: {hours}h {minutes}m
					</p>
				</div>

				<div className="flex gap-2 flex-wrap mt-4 md:mt-0">
					<Button
						variant="outline"
						size="sm"
						onClick={() =>
							router.push(
								`/surah/${ayat.surahId}#ayat-${ayat.surahId}-${ayat.ayatNumber}`
							)
						}>
						<ArrowRight className="mr-1 h-4 w-4" /> Buka
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => setTafsirOpen(true)}>
						<BookOpen className="mr-1 h-4 w-4" /> Tafsir
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={handleExportPNG}>
						Export PNG
					</Button>
				</div>

				{tafsirOpen && (
					<TafsirModal
						open={tafsirOpen}
						onOpenChange={setTafsirOpen}
						surahId={ayat.surahId}
						ayatNumber={ayat.ayatNumber}
						surahNameLatin={ayat.surahLatin}
					/>
				)}

				<div className="absolute bottom-2 right-2 text-xs text-green-600 dark:text-green-400 opacity-50">
					QuranApp
				</div>
			</motion.div>
		</div>
	);
}

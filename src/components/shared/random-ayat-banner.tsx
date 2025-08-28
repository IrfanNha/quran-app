"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowRight, BookOpen } from "lucide-react";
import TafsirModal from "../surah/tafsir-modal";
import { getAllSurat, getSurat } from "@/lib/api";
import { useRandomAyatStore, AyatRandom } from "@/store/useRandomAyatStore";

export default function RandomAyatBanner() {
	const router = useRouter();
	const { ayat, date, setAyat } = useRandomAyatStore();
	const [loading, setLoading] = React.useState(!ayat);
	const [tafsirOpen, setTafsirOpen] = React.useState(false);
	const [countdown, setCountdown] = React.useState(0);

	// Fetch hanya sekali per hari
	React.useEffect(() => {
		const today = new Date().toISOString().split("T")[0];
		if (date === today && ayat) {
			setLoading(false);
			return; // Sudah ada data hari ini
		}

		async function fetchRandomAyat() {
			setLoading(true);
			try {
				const allSurah = (await getAllSurat()).data ?? [];
				if (!allSurah.length) return;

				const surah =
					allSurah[Math.floor(Math.random() * allSurah.length)];
				const surahDetail = await getSurat(surah.nomor);
				const ayatList = surahDetail.data.ayat ?? [];
				if (!ayatList.length) return;

				const ayNo = Math.floor(Math.random() * ayatList.length);
				const ayatData = ayatList[ayNo];

				const randomAyat: AyatRandom = {
					surahId: surah.nomor,
					surahLatin: surah.namaLatin,
					ayatNumber: ayatData.nomorAyat,
					teksArab: ayatData.teksArab,
					teksLatin: ayatData.teksLatin,
					teksIndonesia: ayatData.teksIndonesia,
				};

				setAyat(randomAyat, today); // Simpan di Zustand + localStorage
			} catch (err) {
				console.error("Failed to fetch random ayat", err);
			} finally {
				setLoading(false);
			}
		}

		fetchRandomAyat();
	}, [ayat, date, setAyat]);

	// Hitung countdown ke tengah malam
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

	if (loading) {
		return (
			<div className="animate-pulse bg-green-100/50 p-6 rounded-2xl max-w-3xl mx-auto space-y-2">
				<div className="h-6 w-3/4 bg-green-300 rounded" />
				<div className="h-4 w-full bg-green-200 rounded" />
				<div className="h-4 w-full bg-green-200 rounded" />
			</div>
		);
	}

	if (!ayat) return null;

	const hours = Math.floor(countdown / 1000 / 3600);
	const minutes = Math.floor((countdown / 1000 / 60) % 60);

	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			className="relative w-full max-w-3xl mx-auto p-6 rounded-2xl border bg-green-100/30 dark:bg-gray-900 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
			<div className="flex-1 min-w-0">
				<p className="text-sm md:text-md mt-1 font-base mb-3">
					Q.S {ayat.surahLatin} ({ayat.ayatNumber})
				</p>
				<h2 className="text-lg md:text-xl font-semibold arabic">
					{ayat.teksArab}
				</h2>
				<p className="text-sm md:text-base mt-1 italic">
					{ayat.teksIndonesia}
				</p>
				<p className="text-xs text-green-700 mt-2">
					Next random ayat in: {hours}h {minutes}m
				</p>
			</div>

			<div className="flex gap-2 flex-wrap mt-4 md:mt-0">
				<Button
					variant="outline"
					size="sm"
					onClick={() =>
						router.push(
							`/surah/${ayat.surahId}#ayat-${ayat.ayatNumber}`
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
		</motion.div>
	);
}

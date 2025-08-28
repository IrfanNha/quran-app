// src/components/surah/surah-body.tsx
"use client";

import * as React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import AyatCard from "./ayat-card";
import TafsirModal from "./tafsir-modal";
import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAudio } from "../audio/audio-provider";
import { QARI_MAP } from "@/constants/qari-map";
import { cn } from "@/lib/utils";
import { useBookmarkStore } from "@/store/useBookmarkStore";

type SurahData = {
	nomor: number;
	nama: string;
	namaLatin: string;
	arti: string;
	jumlahAyat: number;
	tempatTurun: string;
	audioFull: Record<string, string>;
	ayat: Array<{
		nomorAyat: number;
		teksArab: string;
		teksLatin: string;
		teksIndonesia: string;
		audio: Record<string, string>;
	}>;
};

export default function SurahBody({ surah }: { surah: SurahData }) {
	const [showLatin, setShowLatin] = React.useState(true);
	const [showTrans, setShowTrans] = React.useState(true);
	const [qari, setQari] = React.useState<"01" | "02" | "03" | "04" | "05">(
		"05"
	);
	const [tafsir, setTafsir] = React.useState<{
		open: boolean;
		ayat: number | null;
	}>({ open: false, ayat: null });

	const { currentIdx, isPlaying, playTrack, togglePlay } = useAudio();
	const { bookmarks } = useBookmarkStore();

	// play per ayat
	const handlePlayAyat = (idx: number) => {
		const nextAyat = () => {
			const next = idx + 1;
			if (next < surah.ayat.length) {
				handlePlayAyat(next);
				document
					.getElementById(`ayah-${surah.ayat[next].nomorAyat}`)
					?.scrollIntoView({ behavior: "smooth", block: "center" });
			}
		};

		playTrack(
			{
				surah: surah.namaLatin,
				qari: QARI_MAP[qari] || "Unknown Qari",
				url: surah.ayat[idx].audio[qari],
				surahId: surah.nomor, // tambahkan ini
				ayatNumber: surah.ayat[idx].nomorAyat, // tambahkan ini
			},
			idx,
			nextAyat
		);

		document
			.getElementById(`ayah-${surah.ayat[idx].nomorAyat}`)
			?.scrollIntoView({ behavior: "smooth", block: "center" });
	};

	// play/pause full audio
	const handlePlayFull = () => {
		if (isPlaying && currentIdx === null) {
			togglePlay();
		} else {
			playTrack({
				surah: surah.namaLatin,
				qari: QARI_MAP[qari] || "Unknown Qari",
				url: surah.audioFull[qari],
			});
		}
	};

	return (
		<div className="space-y-6">
			{/* Controls */}
			<div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
				<div className="flex flex-wrap items-center gap-4">
					{/* Transliterasi */}
					<div className="flex items-center gap-2">
						<Label htmlFor="latin">Transliterasi</Label>
						<Switch
							id="latin"
							checked={showLatin}
							onCheckedChange={setShowLatin}
						/>
					</div>
					{/* Terjemahan */}
					<div className="flex items-center gap-2">
						<Label htmlFor="trans">Terjemahan</Label>
						<Switch
							id="trans"
							checked={showTrans}
							onCheckedChange={setShowTrans}
						/>
					</div>
					{/* Qari */}
					<div className="flex items-center gap-2">
						<Label>Qari</Label>
						<Select
							value={qari}
							onValueChange={(v) => setQari(v as any)}>
							<SelectTrigger className="w-56">
								<SelectValue placeholder="Pilih qari" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="01">
									Abdullah Al-Juhany
								</SelectItem>
								<SelectItem value="02">
									Abdul Muhsin Al-Qasim
								</SelectItem>
								<SelectItem value="03">
									Abdurrahman As-Sudais
								</SelectItem>
								<SelectItem value="04">
									Ibrahim Al-Dossari
								</SelectItem>
								<SelectItem value="05">
									Misyari Rasyid Al-Afasy
								</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				{/* Play/Pause Full */}
				<Button onClick={handlePlayFull} variant="outline">
					<AnimatePresence mode="wait" initial={false}>
						{isPlaying ? (
							<motion.div
								key="pause"
								initial={{ opacity: 0, y: -5 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 5 }}
								transition={{ duration: 0.2 }}
								className="flex items-center">
								<Pause className="h-4 w-4 mr-2" />
								Jeda
							</motion.div>
						) : (
							<motion.div
								key="play"
								initial={{ opacity: 0, y: -5 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 5 }}
								transition={{ duration: 0.2 }}
								className="flex items-center">
								<Play className="h-4 w-4 mr-2" />
								Putar Full Audio
							</motion.div>
						)}
					</AnimatePresence>
				</Button>
			</div>

			{/* Daftar ayat */}
			<div className="space-y-4">
				{surah.ayat.map((a, idx) => {
					const isActive = currentIdx === idx;
					return (
						<div
							key={a.nomorAyat}
							id={`ayah-${a.nomorAyat}`}
							className={cn(
								"transition-shadow duration-300 rounded-xl",
								isActive
									? "shadow-xl bg-yellow-50 dark:bg-yellow-900/30"
									: "shadow-none bg-card hover:shadow-md hover:bg-yellow-50/10 dark:hover:bg-yellow-900/10"
							)}>
							<AyatCard
								index={idx}
								number={a.nomorAyat}
								arab={a.teksArab}
								latin={a.teksLatin}
								indo={a.teksIndonesia}
								audioUrl={a.audio[qari]}
								showLatin={showLatin}
								showTrans={showTrans}
								onPlay={handlePlayAyat}
								isPlaying={isActive}
								onOpenTafsir={(no) =>
									setTafsir({ open: true, ayat: no })
								}
								surahId={surah.nomor}
								surahLatin={surah.namaLatin}
							/>
						</div>
					);
				})}
			</div>

			{/* Modal Tafsir */}
			{tafsir.ayat != null && (
				<TafsirModal
					open={tafsir.open}
					onOpenChange={(v) => setTafsir((s) => ({ ...s, open: v }))}
					surahId={surah.nomor}
					ayatNumber={tafsir.ayat}
					surahNameLatin={surah.namaLatin}
				/>
			)}
		</div>
	);
}

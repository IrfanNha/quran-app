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
	const [qari, setQari] = React.useState<keyof typeof QARI_MAP>("05");
	const [tafsir, setTafsir] = React.useState<{
		open: boolean;
		ayat: number | null;
	}>({ open: false, ayat: null });

	const { currentIdx, currentTrack, isPlaying, playTrack, togglePlay } =
		useAudio();

	// Play per ayat
	const handlePlayAyat = (idx: number) => {
		const ayatUrl = surah.ayat[idx].audio[qari];

		const nextAyat = () => {
			const next = idx + 1;
			if (next < surah.ayat.length) {
				handlePlayAyat(next);
			}
		};

		// Scroll ke ayat yang sedang diputar
		setTimeout(() => {
			document
				.getElementById(`ayah-${surah.ayat[idx].nomorAyat}`)
				?.scrollIntoView({ behavior: "smooth", block: "center" });
		}, 100);

		playTrack(
			{
				surah: surah.namaLatin,
				qari,
				url: ayatUrl,
				surahId: surah.nomor,
				ayatNumber: idx + 1,
			},
			idx,
			nextAyat
		);
	};

	// Play/pause full audio
	const handlePlayFull = () => {
		const fullAudioUrl = surah.audioFull[qari];

		if (currentTrack?.url === fullAudioUrl && isPlaying) {
			togglePlay();
			return;
		}

		playTrack(
			{
				surah: surah.namaLatin,
				qari,
				url: fullAudioUrl,
				surahId: surah.nomor,
			},
			undefined, // undefined untuk full audio
			undefined
		);
	};

	return (
		<div className="space-y-6">
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
							onValueChange={(v: keyof typeof QARI_MAP) =>
								setQari(v)
							}>
							<SelectTrigger className="w-56">
								<SelectValue placeholder="Pilih qari" />
							</SelectTrigger>
							<SelectContent>
								{Object.entries(QARI_MAP).map(([key, name]) => (
									<SelectItem key={key} value={key}>
										{name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>

				{/* Play/Pause Full */}
				<Button onClick={handlePlayFull} variant="outline">
					<AnimatePresence mode="wait" initial={false}>
						{isPlaying &&
						currentTrack?.url === surah.audioFull[qari] ? (
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
				{surah.ayat.map((a, idx) => (
					<div
						key={a.nomorAyat}
						className={cn(
							"transition-shadow duration-300 rounded-xl",
							currentIdx === idx
								? "shadow-xl bg-yellow-50 dark:bg-yellow-900/30"
								: "shadow-none bg-card"
						)}
						id={`ayah-${a.nomorAyat}`}>
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
							isPlaying={currentIdx === idx && isPlaying} // highlight aktif hanya jika ayat ini sedang diputar
							onOpenTafsir={(no) =>
								setTafsir({ open: true, ayat: no })
							}
							surahId={surah.nomor}
							surahLatin={surah.namaLatin}
						/>
					</div>
				))}
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

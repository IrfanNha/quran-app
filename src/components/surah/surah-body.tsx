"use client";

import * as React from "react";
import AyatCard from "./ayat-card";
import TafsirModal from "./tafsir-modal";
import { useAudio } from "../audio/audio-provider";
import { QARI_MAP } from "@/constants/qari-map";
import { cn } from "@/lib/utils";
import SurahSettings from "./surah-setting";

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
	const { currentTrack, isPlaying, playTrack } = useAudio();

	const handlePlayAyat = (idx: number) => {
		const ayat = surah.ayat[idx];
		const ayatUrl = ayat.audio[qari];

		const nextAyat = () => {
			const next = idx + 1;
			if (next < surah.ayat.length) {
				handlePlayAyat(next);
			}
		};

		setTimeout(() => {
			document
				.getElementById(`ayat-${surah.nomor}-${ayat.nomorAyat}`)
				?.scrollIntoView({ behavior: "smooth", block: "center" });
		}, 100);

		playTrack(
			{
				surah: surah.namaLatin,
				qari,
				url: ayatUrl,
				surahId: surah.nomor,
				ayatNumber: ayat.nomorAyat,
			},
			idx,
			nextAyat
		);
	};

	return (
		<div className="space-y-6">
			{/* Surah Settings */}
			<SurahSettings
				showLatin={showLatin}
				setShowLatin={setShowLatin}
				showTrans={showTrans}
				setShowTrans={setShowTrans}
				qari={qari}
				setQari={setQari}
				surah={{
					nomor: surah.nomor,
					namaLatin: surah.namaLatin,
					audioFull: surah.audioFull,
				}}
			/>

			{/* Daftar ayat */}
			<div className="space-y-4">
				{surah.ayat.map((a, idx) => {
					const isCurrent =
						currentTrack?.surahId === surah.nomor &&
						currentTrack?.ayatNumber === a.nomorAyat;

					return (
						<div
							key={a.nomorAyat}
							className={cn(
								"transition-shadow duration-300 rounded-xl",
								isCurrent
									? "shadow-xl bg-yellow-50 dark:bg-yellow-900/30"
									: "shadow-none bg-card"
							)}
							id={`ayat-${surah.nomor}-${a.nomorAyat}`}>
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
								isPlaying={isCurrent && isPlaying}
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

			{/* Tafsir Modal */}
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

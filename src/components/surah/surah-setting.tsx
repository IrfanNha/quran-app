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
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Play, Pause, Settings } from "lucide-react";
import { QARI_MAP } from "@/constants/qari-map";
import { useAudio } from "../audio/audio-provider";
import { useUIStore } from "@/store/useSurahSettingStore";

type SurahSettingsProps = {
	showLatin: boolean;
	setShowLatin: (v: boolean) => void;
	showTrans: boolean;
	setShowTrans: (v: boolean) => void;
	qari: keyof typeof QARI_MAP;
	setQari: (v: keyof typeof QARI_MAP) => void;
	surah: {
		nomor: number;
		namaLatin: string;
		audioFull: Record<string, string>;
	};
};

export default function SurahSettings({
	showLatin,
	setShowLatin,
	showTrans,
	setShowTrans,
	qari,
	setQari,
	surah,
}: SurahSettingsProps) {
	const { currentTrack, isPlaying, playTrack, togglePlay } = useAudio();

	const { surahSettingsOpen, setSurahSettingsOpen } = useUIStore();

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
			undefined,
			undefined
		);
	};

	return (
		<div className="z-50 sticky top-19 right-4">
			<AnimatePresence initial={false}>
				{/* Panel Terbuka */}
				{surahSettingsOpen && (
					<motion.div
						key="open"
						initial={{ opacity: 0, scale: 0.95, y: -10 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: -10 }}
						transition={{ duration: 0.25 }}
						className="rounded-2xl border border-green-500 bg-muted/30 backdrop-blur-md p-5 flex flex-col justify-between gap-4 shadow-lg">
						{/* Tombol minimize */}
						<div className="self-end mb-2 md:mb-0">
							<Button
								size="sm"
								variant="outline"
								onClick={() => setSurahSettingsOpen(false)}
								className="flex items-center gap-1 border-green-500 text-green-600 dark:text-green-400">
								<Settings className="w-4 h-4" />
								<span className="text-sm font-medium">
									Perkecil
								</span>
							</Button>
						</div>

						{/* Konten utama */}
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
										{Object.entries(QARI_MAP).map(
											([key, name]) => (
												<SelectItem
													key={key}
													value={key}>
													{name}
												</SelectItem>
											)
										)}
									</SelectContent>
								</Select>
							</div>

							<div className="flex items-center justify-end">
								{/* Play/Pause Full */}
								<Button
									onClick={handlePlayFull}
									variant="outline"
									className="mt-2 md:mt-0">
									{currentTrack?.url ===
										surah.audioFull[qari] && isPlaying ? (
										<div className="flex items-center gap-2">
											<Pause className="w-4 h-4" /> Jeda
										</div>
									) : (
										<div className="flex items-center gap-2">
											<Play className="w-4 h-4" /> Putar
											Full Audio
										</div>
									)}
								</Button>
							</div>
						</div>
					</motion.div>
				)}

				{/* Panel Minimized */}
				{!surahSettingsOpen && (
					<motion.div
						key="closed"
						initial={{ opacity: 0, scale: 0.6 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.6 }}
						transition={{ duration: 0.25 }}
						className="fixed top-19 right-4 rounded-full border border-green-500 bg-muted/40 backdrop-blur-md p-2 shadow-lg cursor-pointer flex items-center justify-center gap-1"
						onClick={() => setSurahSettingsOpen(true)} // 🔥 simpan ke store
					>
						<Settings className="w-5 h-5 text-green-600 dark:text-green-400" />
						<span className="text-sm font-medium text-green-600 dark:text-green-400">
							Perbesar
						</span>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

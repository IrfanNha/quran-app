"use client";

import * as React from "react";
import { useBookmarkStore } from "@/store/useBookmarkStore";
import AyatCard from "@/components/surah/ayat-card";
import { BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TafsirModal from "@/components/surah/tafsir-modal";
import Link from "next/link";

export default function BookmarkPage() {
	const { bookmarks } = useBookmarkStore();

	const [tafsir, setTafsir] = React.useState<{
		open: boolean;
		ayat: number | null;
		surahId?: number;
		surahLatin?: string;
	}>({ open: false, ayat: null });

	return (
		<div className="container mx-auto p-6 py-12">
			<h1 className="text-3xl font-bold mb-10 text-center flex items-center justify-center gap-2">
				<BookOpen className="w-8 h-8 text-green-600" />
				Bookmarks
			</h1>

			{!bookmarks.length ? (
				<div className="text-center text-gray-500 py-20">
					Belum ada bookmark.
				</div>
			) : (
				<AnimatePresence>
					<div className="space-y-4 md:space-y-6">
						{bookmarks.map((b, idx) => (
							<motion.div
								key={`${b.surahId}-${b.ayatNumber}`}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								transition={{ duration: 0.2 }}>
								<Link
									href={`/surah/${b.surahId}#ayat-${b.surahId}-${b.ayatNumber}`}>
									<AyatCard
										index={idx}
										number={b.ayatNumber}
										arab={b.arab}
										latin={b.latin}
										indo={b.indo}
										showLatin={true}
										showTrans={true}
										onPlay={() => {}}
										isPlaying={false}
										onOpenTafsir={() => {}}
										surahId={b.surahId}
										surahLatin={b.surahLatin}
										hidePlayer
									/>
								</Link>
								{tafsir.ayat != null &&
									tafsir.surahId &&
									tafsir.surahLatin && (
										<TafsirModal
											open={tafsir.open}
											onOpenChange={(v) =>
												setTafsir((s) => ({
													...s,
													open: v,
												}))
											}
											surahId={tafsir.surahId}
											ayatNumber={tafsir.ayat}
											surahNameLatin={tafsir.surahLatin}
										/>
									)}
							</motion.div>
						))}
					</div>
				</AnimatePresence>
			)}
		</div>
	);
}

"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Copy, BookOpen, Bookmark, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

import { useBookmarkStore } from "@/store/useBookmarkStore";

type Props = {
	index: number;
	number: number;
	arab: string;
	latin?: string;
	indo?: string;
	audioUrl?: string;
	showLatin: boolean;
	showTrans: boolean;
	onPlay: (index: number) => void;
	isPlaying: boolean;
	onOpenTafsir: (ayat: number) => void;
	surahId?: number;
	surahLatin?: string;
};

export default function AyatCard({
	index,
	number,
	arab,
	latin,
	indo,
	audioUrl,
	showLatin,
	showTrans,
	onPlay,
	isPlaying,
	onOpenTafsir,
	surahId,
	surahLatin,
}: Props) {
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => setMounted(true), []);

	const copyAyat = async () => {
		const parts = [arab, showLatin && latin, showTrans && indo]
			.filter(Boolean)
			.join("\n");
		await navigator.clipboard.writeText(parts);
	};

	const { addBookmark, removeBookmark, isBookmarked } = useBookmarkStore();

	if (!mounted) {
		// skeleton untuk SSR
		return (
			<article className="rounded-2xl border p-4 md:p-5">
				<div className="h-10 bg-gray-200/50 rounded" />
			</article>
		);
	}

	const bookmarked = surahId ? isBookmarked(surahId, number) : false;

	const toggleBookmark = () => {
		if (!surahId || !surahLatin) return;
		if (bookmarked) removeBookmark(surahId, number);
		else
			addBookmark({
				surahId,
				surahLatin,
				ayatNumber: number,
				arab,
				latin,
				indo,
			});
	};

	return (
		<article
			id={`ayah-${number}`}
			className={cn(
				"rounded-2xl border p-4 md:p-5 transition-shadow duration-300",
				isPlaying
					? "shadow-xl bg-yellow-50 dark:bg-yellow-900/30"
					: "bg-card"
			)}>
			<div className="flex items-start justify-between gap-3">
				<div className="flex items-center gap-2">
					<span className="inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-yellow-400/80 text-xs text-yellow-600">
						{number}
					</span>
				</div>

				<div className="flex items-center gap-1">
					<Button
						variant="ghost"
						size="icon"
						aria-label={isPlaying ? "Pause" : "Play"}
						onClick={() => onPlay(index)}
						title={isPlaying ? "Jeda" : "Putar ayat"}>
						{isPlaying ? (
							<Pause className="h-5 w-5" />
						) : (
							<Play className="h-5 w-5" />
						)}
					</Button>

					<Button
						variant="ghost"
						size="icon"
						onClick={() => onOpenTafsir(number)}
						title="Tafsir">
						<BookOpen className="h-5 w-5" />
					</Button>

					<Button
						variant="ghost"
						size="icon"
						onClick={copyAyat}
						title="Salin">
						<Copy className="h-5 w-5" />
					</Button>

					<Button
						variant="ghost"
						size="icon"
						title={bookmarked ? "Hapus Bookmark" : "Bookmark"}
						onClick={toggleBookmark}>
						<Bookmark
							className={cn(
								"h-5 w-5 transition-colors",
								bookmarked ? "text-yellow-500" : "text-gray-400"
							)}
						/>
					</Button>
				</div>
			</div>

			<div className="mt-4 arabic text-2xl md:text-3xl leading-loose text-right">
				{arab}
			</div>

			{showLatin && latin && (
				<p className="mt-3 text-muted-foreground text-sm">{latin}</p>
			)}
			{showTrans && indo && <p className="mt-2">{indo}</p>}
		</article>
	);
}

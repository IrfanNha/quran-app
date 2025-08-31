"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
	Copy,
	BookOpen,
	Bookmark,
	Play,
	Pause,
	Check,
	Link2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

import { useBookmarkStore } from "@/store/useBookmarkStore";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

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
	show?: boolean;
};

export default function AyatCard({
	index,
	number,
	arab,
	latin,
	indo,
	showLatin,
	showTrans,
	onPlay,
	isPlaying,
	onOpenTafsir,
	surahId,
	surahLatin,
	show,
}: Props) {
	const [mounted, setMounted] = React.useState(false);
	const [copied, setCopied] = React.useState(false);

	React.useEffect(() => setMounted(true), []);

	const copyAyat = async () => {
		const parts = [arab, showLatin && latin, showTrans && indo]
			.filter(Boolean)
			.join("\n");
		await navigator.clipboard.writeText(parts);

		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	};

	const { addBookmark, removeBookmark, isBookmarked } = useBookmarkStore();

	if (!mounted) {
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
			className={cn(
				"rounded-2xl border p-4 md:p-5 transition-shadow duration-300",
				isPlaying
					? "shadow-xl bg-green-100/40 backdrop-blur dark:bg-green-900/30"
					: "bg-card"
			)}>
			{show && surahLatin && (
				<>
					<Badge className="px-2 py-1 border border-green-500 text-green-700 dark:text-green-400 dark:border-green-400 bg-transparent rounded-md text-sm font-medium">
						{surahLatin} : {number}
					</Badge>

					<Separator className="my-3"></Separator>
				</>
			)}

			<div className="flex items-start justify-between gap-3">
				<div className="flex items-center gap-2">
					<span className="inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-yellow-400/80 text-xs text-yellow-600">
						{number}
					</span>
				</div>

				<div className="flex items-center gap-1">
					{show && (
						<Link
							href={`/surah/${surahId}#ayat-${surahId}-${number}`}
							title="Buka Ayat"
							className="inline-block">
							<Button
								variant="outline"
								className="flex items-center gap-2 border-gray-300 hover:border-green-400">
								<Link2 className="h-5 w-5 text-gray-600" />
								<span>Ke Ayat</span>
							</Button>
						</Link>
					)}
					{!show && (
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
					)}

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
						<AnimatePresence mode="wait" initial={false}>
							{copied ? (
								<motion.div
									key="check"
									initial={{ opacity: 0, scale: 0.5 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.5 }}
									transition={{ duration: 0.2 }}>
									<Check className="h-5 w-5 text-green-500" />
								</motion.div>
							) : (
								<motion.div
									key="copy"
									initial={{ opacity: 0, scale: 0.5 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.5 }}
									transition={{ duration: 0.2 }}>
									<Copy className="h-5 w-5" />
								</motion.div>
							)}
						</AnimatePresence>
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

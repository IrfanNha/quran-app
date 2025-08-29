"use client";

import * as React from "react";
import { getTafsir } from "@/lib/api";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, BookOpen } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

type Props = {
	open: boolean;
	onOpenChange: (v: boolean) => void;
	surahId: number;
	ayatNumber: number;
	surahNameLatin: string;
};

export default function TafsirModal({
	open,
	onOpenChange,
	surahId,
	ayatNumber,
	surahNameLatin,
}: Props) {
	const [loading, setLoading] = React.useState(false);
	const [text, setText] = React.useState<string | null>(null);

	React.useEffect(() => {
		if (!open) return;
		let active = true;
		(async () => {
			setLoading(true);
			try {
				const res = await getTafsir(surahId);
				const item = res.data.tafsir.find((t) => t.ayat === ayatNumber);
				if (active) setText(item?.teks ?? "Tafsir tidak tersedia.");
			} catch {
				if (active) setText("Gagal memuat tafsir.");
			} finally {
				if (active) setLoading(false);
			}
		})();
		return () => {
			active = false;
		};
	}, [open, surahId, ayatNumber]);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-3xl w-full max-w-[calc(100%-1.5rem)] p-6 sm:p-8 lg:py-6 rounded-2xl">
				<DialogTitle className="flex items-center gap-3">
					<BookOpen className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0" />
					<div className="flex flex-col">
						<span className="text-lg sm:text-xl font-semibold truncate">
							{surahNameLatin}
						</span>
						<span className="text-sm sm:text-base text-muted-foreground">
							Ayat {ayatNumber}
						</span>
					</div>
				</DialogTitle>

				<DialogDescription className="text-sm sm:text-base text-muted-foreground mt-2">
					Tafsir per ayat dari {surahNameLatin}, ayat ke-{ayatNumber}.
				</DialogDescription>

				{loading ? (
					<div className="flex items-center justify-center gap-2 text-muted-foreground mt-6">
						<Loader2 className="h-5 w-5 animate-spin" />
						<span className="text-sm sm:text-base">
							Memuat tafsir...
						</span>
					</div>
				) : (
					<ScrollArea className="max-h-[70vh] mt-4 pr-2 sm:pr-4">
						<div className="prose prose-base prose-slate dark:prose-invert max-w-none whitespace-pre-wrap leading-relaxed text-sm sm:text-base">
							{text}
						</div>
					</ScrollArea>
				)}
			</DialogContent>
		</Dialog>
	);
}

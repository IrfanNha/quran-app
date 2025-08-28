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
			<DialogContent className="sm:max-w-2xl w-full max-w-[calc(100%-2rem)] p-6 rounded-2xl">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2 text-lg font-semibold">
						<BookOpen className="h-5 w-5" />
						Tafsir {surahNameLatin} : Ayat {ayatNumber}
					</DialogTitle>
					<DialogDescription className="text-sm text-muted-foreground mt-1">
						Tafsir per ayat dari {surahNameLatin}, ayat ke-
						{ayatNumber}.
					</DialogDescription>
				</DialogHeader>

				{loading ? (
					<div className="flex items-center gap-2 text-muted-foreground mt-4">
						<Loader2 className="h-4 w-4 animate-spin" />
						Memuat tafsir...
					</div>
				) : (
					<ScrollArea className="max-h-[70vh] pr-4 mt-4">
						<div className="prose prose-base prose-slate dark:prose-invert max-w-none whitespace-pre-wrap leading-relaxed text-sm sm:text-base">
							{text}
						</div>
					</ScrollArea>
				)}
			</DialogContent>
		</Dialog>
	);
}

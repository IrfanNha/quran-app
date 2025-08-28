"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

type Surah = {
	nomor: number;
	namaLatin: string;
};

type Props = {
	prevSurah: Surah | null;
	nextSurah: Surah | null;
};

export default function SurahNavigation({ prevSurah, nextSurah }: Props) {
	const btnAnim = {
		initial: { opacity: 0, y: -5 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: 5 },
		transition: { duration: 0.2 },
	};

	return (
		<div className="flex justify-between mb-6">
			{prevSurah ? (
				<Link href={`/surah/${prevSurah.nomor}`} passHref>
					<motion.div {...btnAnim}>
						<Button
							variant="outline"
							className="flex items-center gap-2 border-green-600 text-green-600 hover:bg-green-50">
							<ChevronLeft className="w-4 h-4" />
							{prevSurah.namaLatin}
						</Button>
					</motion.div>
				</Link>
			) : (
				<div />
			)}

			{nextSurah ? (
				<Link href={`/surah/${nextSurah.nomor}`} passHref>
					<motion.div {...btnAnim}>
						<Button
							variant="outline"
							className="flex items-center gap-2 border-green-600 text-green-600 hover:bg-green-50">
							{nextSurah.namaLatin}
							<ChevronRight className="w-4 h-4" />
						</Button>
					</motion.div>
				</Link>
			) : (
				<div />
			)}
		</div>
	);
}

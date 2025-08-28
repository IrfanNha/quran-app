"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useHeroStore } from "@/store/useHeroStore";

export const InfoBanner: React.FC = () => {
	const { bannerClosed, closeBanner } = useHeroStore();

	if (bannerClosed) return null;

	return (
		<div className="relative w-full bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md animate-fadeIn">
			<div className="flex-1 text-sm sm:text-base">
				Dukung pengembangan QuranApp oleh{" "}
				<span className="font-semibold text-blue-200-300">Irfan</span>.
				Kunjungi web kreator atau support via Trakteer!
			</div>
			<div className="flex gap-2">
				<Button asChild size="sm" variant="outline">
					<a
						href="https://irfan-nuha.vercel.app"
						target="_blank"
						rel="noopener noreferrer">
						Kunjungi Web
					</a>
				</Button>
				<Button asChild size="sm" variant="default">
					<a
						href="https://trakteer.id/irfan-nha"
						target="_blank"
						rel="noopener noreferrer">
						Support Dev
					</a>
				</Button>
			</div>
			<button
				onClick={closeBanner}
				className="absolute top-2 right-2 p-1 rounded-full hover:bg-green-200 dark:hover:bg-green-800 transition"
				aria-label="Close Banner">
				<X className="h-4 w-4" />
			</button>
		</div>
	);
};

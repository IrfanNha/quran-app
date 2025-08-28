import React from "react";
import { getAllSurat } from "@/lib/api";
import SearchBar from "@/components/search-bar";

import type { Surah } from "@/types/quran";
import { Container } from "@/components/layout/container";
import RandomAyatBanner from "@/components/shared/random-ayat-banner";

export default async function SurahPage() {
	let surahData: Surah[] = [];

	try {
		const res = await getAllSurat();
		surahData = res.data ?? [];
	} catch (err) {
		console.error("Failed to load surah list", err);
	}

	return (
		<Container>
			<div className="py-10 space-y-10">
				<RandomAyatBanner />

				<SearchBar initialSurahList={surahData} />
			</div>
		</Container>
	);
}

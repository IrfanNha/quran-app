"use client";

import React, { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import type { Surah } from "@/types/quran";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { BookOpen, Hash, MapPin, Search } from "lucide-react";
import { SuratCard } from "./surah/surah-card";

export default function SearchBar({
	initialSurahList,
}: {
	initialSurahList: Surah[];
}) {
	const [filteredSurah, setFilteredSurah] =
		useState<Surah[]>(initialSurahList);
	const [filterTempat, setFilterTempat] = useState<string>("All");
	const [filterJuz, setFilterJuz] = useState<string>("All");
	const [filterNomor, setFilterNomor] = useState<string>("All");
	const [query, setQuery] = useState<string>("");

	// Fuse.js untuk search
	const fuse = useMemo(
		() =>
			new Fuse<Surah>(initialSurahList, {
				keys: [
					{ name: "namaLatin", weight: 0.6 },
					{ name: "nama", weight: 0.2 },
					{ name: "arti", weight: 0.3 },
					{ name: "nomor", weight: 0.1 },
				],
				threshold: 0.35,
				includeScore: true,
			}),
		[initialSurahList]
	);

	useEffect(() => {
		let results: Surah[] = initialSurahList;

		// filter tempat
		if (filterTempat !== "All")
			results = results.filter((s) => s.tempatTurun === filterTempat);

		// filter nomor surah
		if (filterNomor !== "All")
			results = results.filter((s) => s.nomor === Number(filterNomor));

		// filter Juz
		if (filterJuz !== "All") {
			const juzMap: Record<number, number[]> = {
				1: [1, 2],
				2: [2],
				3: [2, 3],
				4: [3, 4],
				5: [4],
				6: [4, 5],
				7: [5, 6],
				8: [6, 7],
				9: [7, 8],
				10: [8, 9],
				11: [9, 10, 11],
				12: [11, 12],
				13: [12, 14],
				14: [15, 16],
				15: [17, 18],
				16: [19, 20],
				17: [21, 22],
				18: [23, 25],
				19: [26, 27],
				20: [28, 29],
				21: [30, 33],
				22: [34, 36],
				23: [37, 39],
				24: [40, 41],
				25: [42, 45],
				26: [46, 51],
				27: [52, 57],
				28: [58, 66],
				29: [67, 77],
				30: [78, 114],
			};
			results = results.filter((s) =>
				juzMap[Number(filterJuz)]?.includes(s.nomor)
			);
		}

		// Fuse search
		if (query) {
			const found = fuse.search(query);
			results = results.filter((s) =>
				found.some((f) => f.item.nomor === s.nomor)
			);
		}

		setFilteredSurah(results);
	}, [filterTempat, filterNomor, filterJuz, query, initialSurahList, fuse]);

	return (
		<section aria-labelledby="search-heading" className="space-y-6">
			<div className="w-full max-w-3xl mx-auto space-y-4">
				<h2
					id="search-heading"
					className="text-center text-3xl font-semibold">
					Cari Surat Al-Quran
				</h2>
				<p className="text-center text-sm text-gray-500">
					Filter berdasarkan nama surat, nomor, tempat turun, atau Juz
				</p>

				{/* Input Search */}
				<div className="relative">
					<Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
					<Input
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Cari surat..."
						aria-label="Cari surat"
						className="pl-12"
					/>
				</div>

				{/* Filters */}
				<div className="flex flex-wrap justify-center gap-4 mt-2">
					{/* Tempat Turun */}
					<Select
						value={filterTempat}
						onValueChange={setFilterTempat}>
						<SelectTrigger className="w-36 flex items-center justify-between">
							<span className="flex items-center gap-1">
								<MapPin className="h-4 w-4 text-green-600" />
								<SelectValue placeholder="Tempat Turun" />
							</span>
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="All">Semua</SelectItem>
							<SelectItem value="Mekah">Mekah</SelectItem>
							<SelectItem value="Madinah">Madinah</SelectItem>
						</SelectContent>
					</Select>

					{/* Juz */}
					<Select value={filterJuz} onValueChange={setFilterJuz}>
						<SelectTrigger className="w-36 flex items-center justify-between">
							<span className="flex items-center gap-1">
								<BookOpen className="h-4 w-4 text-green-600" />
								<SelectValue placeholder="Juz" />
							</span>
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="All">Semua Juz</SelectItem>
							{[...Array(30)].map((_, i) => (
								<SelectItem key={i + 1} value={`${i + 1}`}>
									{i + 1}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					{/* Nomor Surah */}
					<Select value={filterNomor} onValueChange={setFilterNomor}>
						<SelectTrigger className="w-40 flex items-center justify-between">
							<span className="flex items-center gap-1">
								<Hash className="h-4 w-4 text-green-600" />
								<SelectValue placeholder="Nomor Surah" />
							</span>
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="All">Semua Nomor</SelectItem>
							{initialSurahList.map((s) => (
								<SelectItem key={s.nomor} value={`${s.nomor}`}>
									{s.nomor}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>

			{/* Hasil */}
			<div className="container mx-auto mt-6">
				<h3 className="mb-4 text-center text-2xl font-semibold">
					{filteredSurah.length} Surat Al-Quran
				</h3>
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
					{filteredSurah.map((s) => (
						<SuratCard key={s.nomor} surah={s} />
					))}
				</div>
			</div>
		</section>
	);
}

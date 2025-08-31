"use client";

import React, { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import type { Surah } from "@/types/quran";
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
import { JUZ_MAP } from "@/constants/juz-map";

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

		if (filterTempat !== "All") {
			results = results.filter((s) => s.tempatTurun === filterTempat);
		}

		if (filterNomor !== "All") {
			results = results.filter((s) => s.nomor === Number(filterNomor));
		}

		if (filterJuz !== "All") {
			const juzSurah = JUZ_MAP[Number(filterJuz)] || [];
			results = results.filter((s) => juzSurah.includes(s.nomor));
		}

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
							{Array.from({ length: 30 }, (_, i) => i + 1).map(
								(juz) => (
									<SelectItem key={juz} value={`${juz}`}>
										{juz}
									</SelectItem>
								)
							)}
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
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
					{filteredSurah.map((s) => (
						<SuratCard key={s.nomor} surah={s} />
					))}
				</div>
			</div>
		</section>
	);
}

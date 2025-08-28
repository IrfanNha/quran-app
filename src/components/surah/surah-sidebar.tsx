"use client";

import Link from "next/link";
import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { Surah } from "@/types/quran";
import { cn } from "@/lib/utils";

type Props = {
	list: Surah[];
	activeId?: number;
};

export default function SurahSidebar({ list, activeId }: Props) {
	const [q, setQ] = React.useState("");

	const filtered = React.useMemo(() => {
		const s = q.trim().toLowerCase();
		if (!s) return list;
		return list.filter(
			(x) =>
				String(x.nomor).includes(s) ||
				x.namaLatin.toLowerCase().includes(s) ||
				x.arti.toLowerCase().includes(s)
		);
	}, [list, q]);

	return (
		<div className="rounded-2xl border">
			<div className="p-4 border-b">
				<h3 className="font-semibold">Daftar Surah</h3>
				<div className="mt-3 relative">
					<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						value={q}
						onChange={(e) => setQ(e.target.value)}
						placeholder="Cari surat..."
						className="pl-8"
					/>
				</div>
			</div>

			<ScrollArea className="h-[72vh]">
				<ul className="p-2">
					{filtered.map((s) => (
						<li key={s.nomor}>
							<Link
								href={`/surah/${s.nomor}`}
								className={cn(
									"flex items-center justify-between gap-3 rounded-lg px-3 py-2 hover:bg-muted",
									activeId === s.nomor && "bg-muted"
								)}>
								<div className="flex items-center gap-3 min-w-0">
									<span
										className={cn(
											"inline-flex h-7 w-7 items-center justify-center rounded-full text-xs",
											activeId === s.nomor
												? "border-2 border-yellow-400 text-yellow-400"
												: "border"
										)}>
										{s.nomor}
									</span>
									<div className="min-w-0">
										<p className="truncate text-sm font-medium">
											{s.namaLatin}
										</p>
										<p className="truncate text-xs text-muted-foreground">
											{s.arti}
										</p>
									</div>
								</div>
								<span className="arabic text-green-600 text-lg">
									{s.nama}
								</span>
							</Link>
						</li>
					))}
				</ul>
			</ScrollArea>
		</div>
	);
}

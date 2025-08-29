import { getAllSurat, getSurat } from "@/lib/api";
import { notFound } from "next/navigation";
import SurahBody from "@/components/surah/surah-body";
import SurahSidebar from "@/components/surah/surah-sidebar";
import { Separator } from "@/components/ui/separator";
import SurahNavigation from "@/components/surah/surah-navigation";
import { BookOpen, MapPin } from "lucide-react";
import ScrollManager from "@/components/surah/surah-scroll-manager";

export const revalidate = 86400;

type SurahSummary = {
	nomor: number;
	nama: string;
	namaLatin: string;
	jumlahAyat: number;
	tempatTurun: string;
};

export async function generateStaticParams() {
	const list = await getAllSurat().then((r) => r.data ?? []);
	return list.map((s: SurahSummary) => ({ id: String(s.nomor) }));
}

export default async function SurahPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const surahId = Number(id);

	if (isNaN(surahId) || surahId < 1 || surahId > 114) {
		return notFound();
	}

	const [surahRes, allRes] = await Promise.all([
		getSurat(surahId),
		getAllSurat(),
	]);

	const surah = surahRes?.data;
	const all = allRes?.data ?? [];

	if (!surah) return notFound();

	const surahIndex = all.findIndex((s) => s.nomor === surahId);
	const prevSurah = surahIndex > 0 ? all[surahIndex - 1] : null;
	const nextSurah = surahIndex < all.length - 1 ? all[surahIndex + 1] : null;

	return (
		<div className="container mx-auto px-4 py-6">
			<div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
				{/* Sidebar (desktop) */}
				<aside className="hidden lg:block">
					<div className="sticky top-19">
						<SurahSidebar list={all} activeId={surahId} />
					</div>
				</aside>

				{/* Body */}
				<div>
					{/* Header*/}
					<div className="rounded-2xl border bg-muted/30 p-5">
						<div className="flex items-start justify-between">
							<div className="min-w-0">
								<h1 className="text-2xl font-bold break-words">
									{surah.namaLatin}
								</h1>
								<p className="mt-1 text-muted-foreground text-sm break-words">
									{surah.arti}
								</p>

								<div className="mt-2 flex flex-wrap gap-2 text-sm text-muted-foreground">
									<span className="px-2 py-0.5 rounded-full bg-muted flex items-center gap-1 border">
										<MapPin className="h-3 w-3" />
										{surah.tempatTurun}
									</span>
									<span className="px-2 py-0.5 rounded-full bg-muted flex items-center gap-1 border">
										<BookOpen className="h-3 w-3" />
										{surah.jumlahAyat} Ayat
									</span>
								</div>
							</div>

							<div className="ml-4 shrink-0 arabic text-2xl md:text-3xl font-semibold text-green-600 leading-snug">
								{surah.nama}
							</div>
						</div>
					</div>

					<Separator className="my-6" />
					<ScrollManager />
					<SurahBody surah={surah} />
					<div className="pt-10">
						<SurahNavigation
							prevSurah={prevSurah}
							nextSurah={nextSurah}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

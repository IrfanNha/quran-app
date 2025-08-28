// src/lib/api.ts
import {
	ApiResponse,
	Surah,
	SurahDetail,
	Tafsir,
	TafsirResponse,
} from "@/types/quran";

const BASE_URL = process.env.NEXT_PUBLIC_EQURAN_BASE!;

async function fetcher<T>(endpoint: string): Promise<T> {
	try {
		const res = await fetch(`${BASE_URL}${endpoint}`, {
			next: { revalidate: 60 }, // ISR cache 1 menit
		});
		if (!res.ok) {
			throw new Error(`API error ${res.status}`);
		}
		const json = await res.json();
		return json as T;
	} catch (error) {
		console.error("Fetch error:", error);
		throw error;
	}
}

// Get all surat
export async function getAllSurat(): Promise<ApiResponse<Surah[]>> {
	const res = await fetch(`${BASE_URL}/surat`, { next: { revalidate: 60 } });
	if (!res.ok) throw new Error("Failed fetching surat");
	return res.json();
}

// Get detail surat
export async function getSurat(nomor: number) {
	return fetcher<ApiResponse<SurahDetail>>(`/surat/${nomor}`);
}

// Get tafsir surat
export async function getTafsir(id: string | number) {
	const base = process.env.NEXT_PUBLIC_EQURAN_BASE!;
	const res = await fetch(`${BASE_URL}/tafsir/${id}`, {
		next: { revalidate: 60 * 60 * 24 },
	});
	if (!res.ok) throw new Error("Failed to fetch tafsir");
	return (await res.json()) as TafsirResponse;
}

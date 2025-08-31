import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getAllSurat, getSurat } from "@/lib/api";

export interface AyatRandom {
	surahId: number;
	surahLatin: string;
	ayatNumber: number;
	teksArab: string;
	teksLatin: string;
	teksIndonesia: string;
}

interface RandomAyatState {
	ayat: AyatRandom | null;
	date: string | null;
	loading: boolean;
	fetchRandomAyat: () => Promise<void>;
	clearAyat: () => void;
}

export const useRandomAyatStore = create(
	persist<RandomAyatState>(
		(set, get) => ({
			ayat: null,
			date: null,
			loading: false,

			clearAyat: () => set({ ayat: null, date: null }),

			fetchRandomAyat: async () => {
				const today = new Date().toISOString().split("T")[0];

				// Jika ayat sudah ada dan masih hari ini, tidak fetch
				if (get().date === today && get().ayat) return;

				set({ loading: true });
				try {
					const allSurah = (await getAllSurat()).data ?? [];
					if (!allSurah.length) return;

					const surah =
						allSurah[Math.floor(Math.random() * allSurah.length)];
					const surahDetail = await getSurat(surah.nomor);
					const ayatList = surahDetail.data.ayat ?? [];
					if (!ayatList.length) return;

					const ayNo = Math.floor(Math.random() * ayatList.length);
					const ayatData = ayatList[ayNo];

					const randomAyat: AyatRandom = {
						surahId: surah.nomor,
						surahLatin: surah.namaLatin,
						ayatNumber: ayatData.nomorAyat,
						teksArab: ayatData.teksArab,
						teksLatin: ayatData.teksLatin,
						teksIndonesia: ayatData.teksIndonesia,
					};

					set({ ayat: randomAyat, date: today });
				} catch (err) {
					console.error("Failed to fetch random ayat", err);
				} finally {
					set({ loading: false });
				}
			},
		}),
		{
			name: "random-ayat-store",
			storage: createJSONStorage(() => localStorage),
		}
	)
);

// src/store/useRandomAyatStore.ts
import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

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
	setAyat: (ayat: AyatRandom, date: string) => void;
	clearAyat: () => void;
}

// Helper wrapper untuk localStorage agar kompatibel dengan PersistStorage
const createStorage = (): PersistOptions<
	RandomAyatState,
	RandomAyatState
>["storage"] => ({
	getItem: (name) => {
		if (typeof window === "undefined") return null;
		const item = localStorage.getItem(name);
		return item ? JSON.parse(item) : null;
	},
	setItem: (name, value) => {
		if (typeof window === "undefined") return;
		localStorage.setItem(name, JSON.stringify(value));
	},
	removeItem: (name) => {
		if (typeof window === "undefined") return;
		localStorage.removeItem(name);
	},
});

export const useRandomAyatStore = create<RandomAyatState>()(
	persist(
		(set) => ({
			ayat: null,
			date: null,
			setAyat: (ayat, date) => set({ ayat, date }),
			clearAyat: () => set({ ayat: null, date: null }),
		}),
		{
			name: "random-ayat-store",
			storage: createStorage(),
		}
	)
);

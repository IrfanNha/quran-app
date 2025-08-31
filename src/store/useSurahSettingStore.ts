import { create } from "zustand";
import { persist } from "zustand/middleware";

type UIState = {
	surahSettingsOpen: boolean;
	setSurahSettingsOpen: (open: boolean) => void;
};

export const useUIStore = create<UIState>()(
	persist(
		(set) => ({
			surahSettingsOpen: true, // default terbuka saat pertama kali
			setSurahSettingsOpen: (open) => set({ surahSettingsOpen: open }),
		}),
		{
			name: "ui-store", // key di localStorage
		}
	)
);

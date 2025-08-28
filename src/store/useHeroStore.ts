// src/store/hero-store.ts
import { create } from "zustand";

interface HeroState {
	bannerClosed: boolean;
	closeBanner: () => void;
}

export const useHeroStore = create<HeroState>((set) => ({
	bannerClosed:
		typeof window !== "undefined"
			? sessionStorage.getItem("bannerClosed") === "true"
			: false,
	closeBanner: () =>
		set(() => {
			if (typeof window !== "undefined")
				sessionStorage.setItem("bannerClosed", "true");
			return { bannerClosed: true };
		}),
}));

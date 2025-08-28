// src/store/useBookmarkStore.ts
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface BookmarkAyat {
	surahId: number;
	surahLatin: string;
	ayatNumber: number;
	arab: string;
	latin?: string;
	indo?: string;
}

interface BookmarkState {
	bookmarks: BookmarkAyat[];
	addBookmark: (ayat: BookmarkAyat) => void;
	removeBookmark: (surahId: number, ayatNumber: number) => void;
	isBookmarked: (surahId: number, ayatNumber: number) => boolean;
}

export const useBookmarkStore = create<BookmarkState>()(
	persist(
		(set, get) => ({
			bookmarks: [],
			addBookmark: (ayat) => {
				const exists = get().bookmarks.some(
					(b) =>
						b.surahId === ayat.surahId &&
						b.ayatNumber === ayat.ayatNumber
				);
				if (!exists) set({ bookmarks: [...get().bookmarks, ayat] });
			},
			removeBookmark: (surahId, ayatNumber) => {
				set({
					bookmarks: get().bookmarks.filter(
						(b) =>
							!(
								b.surahId === surahId &&
								b.ayatNumber === ayatNumber
							)
					),
				});
			},
			isBookmarked: (surahId, ayatNumber) =>
				get().bookmarks.some(
					(b) => b.surahId === surahId && b.ayatNumber === ayatNumber
				),
		}),
		{
			name: "bookmark-store",
			storage: createJSONStorage(() => localStorage),
		}
	)
);

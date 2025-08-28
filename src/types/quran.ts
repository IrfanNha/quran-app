// src/types/quran.ts
export interface ApiResponse<T> {
	code: number;
	message: string;
	data: T;
}

// Daftar surat
export interface Surah {
	nomor: number;
	nama: string;
	namaLatin: string;
	jumlahAyat: number;
	tempatTurun: string;
	arti: string;
	deskripsi: string;
	audioFull: Record<string, string>;
	ayat: Ayat[];
}

// Detail surat
export interface Ayat {
	nomorAyat: number;
	teksArab: string;
	teksLatin: string;
	teksIndonesia: string;
	audio: Record<string, string>;
}

export interface SurahDetail extends Surah {
	ayat: Ayat[];
}

// Tafsir utama (untuk detail surat + metadata)
export interface Tafsir {
	nomor: number;
	nama: string;
	namaLatin: string;
	jumlahAyat: number;
	tempatTurun: string;
	arti: string;
	deskripsi: string;
	tafsir: {
		id: string;
	};
}

// Response dari endpoint /tafsir/:id
export type TafsirResponse = {
	code: number;
	message: string;
	data: {
		nomor: number;
		nama: string;
		namaLatin: string;
		jumlahAyat: number;
		tempatTurun: string;
		arti: string;
		tafsir: Array<{
			ayat: number;
			teks: string;
		}>;
	};
};

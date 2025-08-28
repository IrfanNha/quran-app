// src/store/useAudioStore.ts
"use client";

import { create } from "zustand";
import { Howl, Howler } from "howler";

export type TrackMeta = {
	id?: string;
	title?: string;
	qari?: string;
	qariName?: string;
	surahNumber?: number;
	surahName?: string;
	url: string;
	surah?: string;
};

type AudioState = {
	isPlaying: boolean;
	isLoading: boolean;
	progress: number;
	duration: number;
	currentTrack: TrackMeta | null;
	currentIdx: number | null; // indeks ayat atau track
	qari?: string;
	onEnded: (() => void) | null;

	playTrack: (track: TrackMeta, idx?: number, onEnd?: () => void) => void;
	playUrl: (url: string, meta?: Partial<TrackMeta>) => void;
	pause: () => void;
	resume: () => void;
	stop: () => void;
	togglePlay: () => void;
	seek: (seconds: number) => void;
	skipSeconds: (delta: number) => void;
	setQari: (id: string, name?: string) => void;
	setVolume: (vol: number) => void;
	setRate: (rate: number) => void;
	setOnEnded: (fn: (() => void) | null) => void;
};

export const useAudioStore = create<AudioState>((set, get) => {
	let howl: Howl | null = null;
	let progressTimer: number | null = null;

	const cleanup = () => {
		if (progressTimer != null) {
			window.clearInterval(progressTimer);
			progressTimer = null;
		}
		if (howl) {
			try {
				howl.off();
				howl.unload();
			} catch {}
			howl = null;
		}
		set({ currentIdx: null });
	};

	const startProgressTimer = () => {
		if (progressTimer != null) return;
		progressTimer = window.setInterval(() => {
			if (!howl) return;
			const seek = howl.seek() as number;
			const dur = howl.duration() || 0;
			set({
				progress: Number.isFinite(seek) ? seek : 0,
				duration: Number.isFinite(dur) ? dur : 0,
			});
		}, 500);
	};

	const attachHowlEvents = (h: Howl, onEnd?: () => void) => {
		h.off();
		h.on("play", () => {
			set({ isPlaying: true, isLoading: false });
			startProgressTimer();
		});
		h.on("pause", () => set({ isPlaying: false }));
		h.on("stop", () => set({ isPlaying: false, progress: 0 }));
		h.on("end", () => {
			set({ isPlaying: false, progress: h.duration() || 0 });
			if (onEnd) onEnd();
			const cb = get().onEnded;
			if (cb) cb();

			cleanup();
			set({ currentTrack: null, duration: 0 });
		});
		h.on("load", () =>
			set({ duration: h.duration() || 0, isLoading: false })
		);
		h.on("loaderror", () => set({ isLoading: false }));
		h.on("playerror", () => set({ isPlaying: false, isLoading: false }));
	};

	return {
		isPlaying: false,
		isLoading: false,
		progress: 0,
		duration: 0,
		currentTrack: null,
		currentIdx: null,
		qari: undefined,
		onEnded: null,

		playTrack: (track: TrackMeta, idx?: number, onEnd?: () => void) => {
			cleanup();
			set({
				isLoading: true,
				isPlaying: false,
				currentTrack: track,
				currentIdx: idx ?? null,
				progress: 0,
				duration: 0,
			});

			howl = new Howl({
				src: [track.url],
				html5: true,
			});

			attachHowlEvents(howl, onEnd);

			try {
				howl.play();
			} catch (err) {
				console.error("Howl play error:", err);
				set({ isLoading: false });
			}
		},

		playUrl: (url: string, meta = {}) => {
			const t: TrackMeta = { url, ...meta };
			get().playTrack(t);
		},

		pause: () => {
			if (howl && howl.playing()) {
				howl.pause();
				set({ isPlaying: false });
			}
		},

		resume: () => {
			if (howl && !howl.playing()) {
				howl.play();
				set({ isPlaying: true });
				startProgressTimer();
			}
		},

		togglePlay: () => {
			if (!howl) return;
			if (howl.playing()) get().pause();
			else get().resume();
		},

		stop: () => {
			if (howl) {
				howl.stop();
				cleanup();
			}
			set({
				isPlaying: false,
				isLoading: false,
				progress: 0,
				duration: 0,
				currentTrack: null,
				currentIdx: null,
			});
		},

		seek: (seconds: number) => {
			if (!howl) return;
			const dur = howl.duration() || 0;
			const pos = Math.max(0, Math.min(dur, seconds));
			try {
				howl.seek(pos);
				set({ progress: pos });
			} catch {}
		},

		skipSeconds: (delta: number) => {
			if (!howl) return;
			const cur = (howl.seek() as number) || 0;
			get().seek(cur + delta);
		},

		setQari: (id: string, name?: string) => {
			set({ qari: id });
			set((s) => ({
				currentTrack: s.currentTrack
					? {
							...s.currentTrack,
							qari: id,
							qariName: name ?? s.currentTrack.qariName,
					  }
					: s.currentTrack,
			}));
		},

		setVolume: (vol: number) => {
			Howler.volume(Math.max(0, Math.min(1, vol)));
		},

		setRate: (rate: number) => {
			if (howl) {
				try {
					howl.rate(rate);
				} catch {}
			}
		},

		setOnEnded: (fn) => set({ onEnded: fn }),
	};
});

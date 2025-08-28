// src/store/useAudioStore.ts
"use client";

import { create } from "zustand";
import { Howl } from "howler";

export type TrackMeta = {
	id?: string;
	title?: string;
	qari?: string;
	qariName?: string;
	surahNumber?: number;
	surahName?: string;
	url: string;
};

type AudioState = {
	isPlaying: boolean;
	isLoading: boolean;
	progress: number; // seconds
	duration: number; // seconds
	currentTrack: TrackMeta | null;
	qari?: string;

	// actions
	playTrack: (track: TrackMeta) => void;
	playUrl: (url: string, meta?: Partial<TrackMeta>) => void;
	pause: () => void;
	resume: () => void;
	stop: () => void;
	seek: (seconds: number) => void; // absolute seconds
	skipSeconds: (delta: number) => void; // relative
	setQari: (id: string, name?: string) => void;
	setVolume: (vol: number) => void; // 0..1
	setRate: (rate: number) => void; // speed
	onEnded: (() => void) | null;
	setOnEnded: (fn: (() => void) | null) => void;
};

export const useAudioStore = create<AudioState>((set, get) => {
	// internal non-serializable references
	let howl: Howl | null = null;
	let progressTimer: number | null = null;

	// helper: clear Howl and timers
	const cleanup = () => {
		if (progressTimer != null) {
			window.clearInterval(progressTimer);
			progressTimer = null;
		}
		if (howl) {
			try {
				howl.off(); // remove all listeners
				howl.unload();
			} catch {
				// ignore
			}
			howl = null;
		}
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

	const attachHowlEvents = (h: Howl) => {
		h.off();
		h.on("play", () => {
			set({ isPlaying: true, isLoading: false });
			startProgressTimer();
		});
		h.on("pause", () => {
			set({ isPlaying: false });
		});
		h.on("stop", () => {
			set({ isPlaying: false, progress: 0 });
		});
		h.on("end", () => {
			// when track ended, stop and call onEnded callback (if any)
			set({ isPlaying: false, progress: h.duration() || 0 });
			const cb = get().onEnded;
			if (cb) cb();
			// automatic cleanup: unload howler and clear timer
			cleanup();
			set({ currentTrack: null, duration: 0 });
		});
		h.on("load", () => {
			set({ duration: h.duration() || 0, isLoading: false });
		});
		h.on("loaderror", () => {
			set({ isLoading: false });
		});
		h.on("playerror", () => {
			set({ isPlaying: false, isLoading: false });
		});
	};

	return {
		isPlaying: false,
		isLoading: false,
		progress: 0,
		duration: 0,
		currentTrack: null,
		qari: undefined,
		onEnded: null,

		playTrack: (track: TrackMeta) => {
			// stop existing
			cleanup();
			set({
				isLoading: true,
				isPlaying: false,
				currentTrack: track,
				progress: 0,
				duration: 0,
			});

			howl = new Howl({
				src: [track.url],
				html5: true, // stream large files reliably
				onend: () => {
					// fallback in case event handlers above miss
					set({ isPlaying: false });
					const cb = get().onEnded;
					if (cb) cb();
				},
			});

			attachHowlEvents(howl);
			try {
				howl.play();
			} catch (err) {
				// sometimes Play() rejects due to autoplay policy
				console.error("howl play error:", err);
				set({ isLoading: false });
			}
		},

		playUrl: (url: string, meta = {}) => {
			const t: TrackMeta = {
				url,
				...meta,
			};
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
			});
		},

		seek: (seconds: number) => {
			if (!howl) return;
			const dur = howl.duration() || 0;
			const pos = Math.max(0, Math.min(dur, seconds));
			try {
				howl.seek(pos);
				set({ progress: pos });
			} catch {
				// noop
			}
		},

		skipSeconds: (delta: number) => {
			if (!howl) return;
			const cur = (howl.seek() as number) || 0;
			get().seek(cur + delta);
		},

		setQari: (id: string, name?: string) => {
			set({ qari: id });
			// also update currentTrack metadata qariName if present
			set((s) => ({
				currentTrack: s.currentTrack
					? {
							...s.currentTrack,
							qari: id,
							qariName: name ?? s.currentTrack?.qariName,
					  }
					: s.currentTrack,
			}));

			if (howl && get().isPlaying && get().currentTrack?.url) {
				const pos = (howl.seek() as number) || 0;
				const meta = get().currentTrack;
			}
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

		setOnEnded: (fn) => {
			set({ onEnded: fn });
		},
	};
});

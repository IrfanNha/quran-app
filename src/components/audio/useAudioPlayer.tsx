// src/components/audio/useAudioPlayer.tsx
"use client";

import { useCallback } from "react";
import { useAudioStore, TrackMeta } from "@/store/useAudioStore";

export function useAudioPlayer() {
	const isPlaying = useAudioStore((s) => s.isPlaying);
	const isLoading = useAudioStore((s) => s.isLoading);
	const progress = useAudioStore((s) => s.progress);
	const duration = useAudioStore((s) => s.duration);
	const currentTrack = useAudioStore((s) => s.currentTrack);
	const qari = useAudioStore((s) => s.qari);

	const playTrack = useAudioStore((s) => s.playTrack);
	const playUrl = useAudioStore((s) => s.playUrl);
	const pause = useAudioStore((s) => s.pause);
	const resume = useAudioStore((s) => s.resume);
	const stop = useAudioStore((s) => s.stop);
	const seek = useAudioStore((s) => s.seek);
	const skipSeconds = useAudioStore((s) => s.skipSeconds);
	const setQari = useAudioStore((s) => s.setQari);
	const setOnEnded = useAudioStore((s) => s.setOnEnded);

	// memoized helpers
	const play = useCallback(
		(meta: TrackMeta) => {
			playTrack(meta);
		},
		[playTrack]
	);

	const playFromUrl = useCallback(
		(url: string, meta?: Partial<TrackMeta>) => {
			playUrl(url, meta);
		},
		[playUrl]
	);

	return {
		// state
		isPlaying,
		isLoading,
		progress,
		duration,
		currentTrack,
		qari,

		// actions
		play,
		playFromUrl,
		pause,
		resume,
		stop,
		seek,
		skipSeconds,
		setQari,
		setOnEnded,
	} as const;
}

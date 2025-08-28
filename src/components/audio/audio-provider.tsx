"use client";

import { createContext, useContext, useState, useRef, useEffect } from "react";

interface Track {
	surah: string;
	qari: string;
	url: string;
	surahId?: number; // baru
	ayatNumber?: number; // baru
}

interface AudioContextProps {
	currentTrack: Track | null;
	currentIdx: number | null;
	isPlaying: boolean;
	progress: number;
	duration: number;
	playTrack: (track: Track, idx?: number, onEnded?: () => void) => void;
	togglePlay: () => void;
	seek: (amount: number) => void;
	seekTo: (time: number) => void;
	clearTrack: () => void;
}

const AudioContext = createContext<AudioContextProps | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
	const [currentIdx, setCurrentIdx] = useState<number | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [progress, setProgress] = useState(0);
	const [duration, setDuration] = useState(0);

	useEffect(() => {
		if (!audioRef.current) audioRef.current = new Audio();
		const audio = audioRef.current;

		const updateProgress = () => {
			setProgress(audio.currentTime);
			setDuration(audio.duration || 0);
		};

		audio.addEventListener("timeupdate", updateProgress);
		audio.addEventListener("loadedmetadata", updateProgress);

		return () => {
			audio.removeEventListener("timeupdate", updateProgress);
			audio.removeEventListener("loadedmetadata", updateProgress);
		};
	}, []);

	const playTrack = (track: Track, idx?: number, onEnded?: () => void) => {
		if (!audioRef.current) return;

		setCurrentTrack(track);
		setCurrentIdx(idx ?? null);

		audioRef.current.src = track.url;
		audioRef.current.play();
		setIsPlaying(true);

		audioRef.current.onended = () => {
			setIsPlaying(false);
			setCurrentTrack(null);
			setCurrentIdx(null);
			if (onEnded) onEnded();
		};
	};

	const togglePlay = () => {
		if (!audioRef.current) return;
		if (isPlaying) audioRef.current.pause();
		else audioRef.current.play();
		setIsPlaying(!isPlaying);
	};

	const seek = (amount: number) => {
		if (!audioRef.current) return;
		audioRef.current.currentTime += amount;
	};

	const seekTo = (time: number) => {
		if (!audioRef.current) return;
		audioRef.current.currentTime = time;
	};

	const clearTrack = () => {
		setCurrentTrack(null);
		setIsPlaying(false);
		audioRef.current?.pause();
		audioRef.current = null;
	};

	return (
		<AudioContext.Provider
			value={{
				currentTrack,
				currentIdx,
				isPlaying,
				progress,
				duration,
				playTrack,
				togglePlay,
				seek,
				seekTo,
				clearTrack,
			}}>
			{children}
		</AudioContext.Provider>
	);
}

export function useAudio() {
	const ctx = useContext(AudioContext);
	if (!ctx) throw new Error("useAudio must be used within AudioProvider");
	return ctx;
}

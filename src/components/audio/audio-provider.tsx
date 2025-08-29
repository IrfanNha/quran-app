"use client";

import { createContext, useContext, useState, useRef, useEffect } from "react";

interface Track {
	surah: string;
	qari: string;
	url: string;
	surahId?: number;
	ayatNumber?: number;
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

	const rafRef = useRef<number | null>(null);

	useEffect(() => {
		if (!audioRef.current) audioRef.current = new Audio();
		const audio = audioRef.current;

		const syncMeta = () => {
			setDuration(audio.duration || 0);
		};

		audio.addEventListener("loadedmetadata", syncMeta);

		return () => {
			audio.removeEventListener("loadedmetadata", syncMeta);
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
		};
	}, []);

	const updateProgressSmooth = () => {
		if (audioRef.current) {
			setProgress(audioRef.current.currentTime);
			rafRef.current = requestAnimationFrame(updateProgressSmooth);
		}
	};

	const playTrack = (track: Track, idx?: number, onEnded?: () => void) => {
		if (!audioRef.current) return;

		const isSameTrack = currentTrack?.url === track.url;

		if (isSameTrack) {
			togglePlay();
			return;
		}

		setCurrentTrack(track);
		setCurrentIdx(idx ?? null);
		audioRef.current.src = track.url;
		audioRef.current.play();
		setIsPlaying(true);

		if (rafRef.current) cancelAnimationFrame(rafRef.current);
		rafRef.current = requestAnimationFrame(updateProgressSmooth);

		audioRef.current.onended = () => {
			setIsPlaying(false);
			setCurrentTrack(null);
			setCurrentIdx(null);
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
			if (onEnded) onEnded();
		};
	};

	const togglePlay = () => {
		if (!audioRef.current) return;

		if (isPlaying) {
			audioRef.current.pause();
			setIsPlaying(false);
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
		} else {
			audioRef.current.play();
			setIsPlaying(true);
			rafRef.current = requestAnimationFrame(updateProgressSmooth);
		}
	};

	const seek = (amount: number) => {
		if (!audioRef.current) return;
		audioRef.current.currentTime += amount;
		setProgress(audioRef.current.currentTime);
	};

	const seekTo = (time: number) => {
		if (!audioRef.current) return;
		audioRef.current.currentTime = time;
		setProgress(time);
	};

	const clearTrack = () => {
		if (audioRef.current) {
			audioRef.current.pause();
			audioRef.current.src = "";
		}
		if (rafRef.current) cancelAnimationFrame(rafRef.current);
		setCurrentTrack(null);
		setCurrentIdx(null);
		setIsPlaying(false);
		setProgress(0);
		setDuration(0);
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

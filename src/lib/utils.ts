import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function range(start: number, end: number): number[] {
	const arr = [];
	for (let i = start; i <= end; i++) arr.push(i);
	return arr;
}

// src/components/layout/footer.tsx
"use client";

import Link from "next/link";
import { Container } from "./container";
import { BookOpen, FileText, Bookmark, Info, BookAudio } from "lucide-react";

export function Footer() {
	return (
		<footer className="border-t backdrop-blur-md bg-background/90">
			<Container className="py-8">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
					<div className="flex flex-col items-start gap-2">
						<Link
							href="/"
							className="flex items-center gap-2 text-lg font-bold bg-gradient-to-r from-green-300 to-green-600 bg-clip-text text-transparent">
							<span className="bg-green-200 p-1.5 rounded-3xl">
								<BookOpen className="h-5 w-5 text-green-600 dark:text-green-400" />
							</span>
							<span className="tracking-normal font-semibold">
								QuranApp
							</span>
						</Link>
						<p className="text-gray-600 dark:text-gray-400 text-sm">
							Aplikasi edukasi Al-Qur&apos;an dengan teks,
							terjemahan, audio, dan fitur bookmark.
						</p>
					</div>

					<div className="flex flex-col items-start gap-2">
						<h4 className="text-gray-700 dark:text-gray-300 font-medium">
							Navigasi
						</h4>
						<Link
							href="/surah"
							className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-600">
							<BookOpen className="w-4 h-4 text-green-600 dark:text-green-400" />
							Surah
						</Link>
						<Link
							href="/bookmark"
							className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-600">
							<Bookmark className="w-4 h-4 text-green-600 dark:text-green-400" />
							Bookmark
						</Link>
						<Link
							href="/bookmark"
							className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-600">
							<BookAudio className="w-4 h-4 text-green-600 dark:text-green-400" />
							Doa
						</Link>
					</div>

					<div className="flex flex-col items-start gap-2">
						<h4 className="text-gray-700 dark:text-gray-300 font-medium">
							Info
						</h4>
						<Link
							href="/legal"
							className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-600">
							<FileText className="w-4 h-4 text-green-600 dark:text-green-400" />
							Legal
						</Link>
						<Link
							href="/about"
							className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-600">
							<Info className="w-4 h-4 text-green-600 dark:text-green-400" />
							About
						</Link>
					</div>
				</div>

				<div className="mt-8 border-t pt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-sm text-gray-500">
					<p>© {new Date().getFullYear()} QuranApp - IrfanWork</p>
					<p className="text-green-600 dark:text-green-400 font-medium">
						Built with ❤️ by{" "}
						<a
							href="http://irfan-nuha.vercel.app"
							target="_blank"
							rel="noopener noreferrer">
							Irfan.
						</a>
					</p>
				</div>
			</Container>
		</footer>
	);
}

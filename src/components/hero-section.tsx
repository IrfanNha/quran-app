"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const HeroSection: React.FC = () => {
	return (
		<section className="relative bg-green-50 dark:bg-gray-900 rounded-xl p-6 md:p-12 text-center overflow-hidden border ">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}>
				<h1 className="text-3xl md:text-5xl font-bold text-green-800 dark:text-green-400">
					Online Quran Reader
				</h1>
				<p className="mt-4 text-gray-700 dark:text-gray-300 max-w-xl mx-auto text-base md:text-lg">
					Jelajahi Al-Quran secara interaktif, dengarkan ayat, baca
					tafsir, dan dukung pengembangan aplikasi ini.
				</p>
				<div className="mt-6 flex justify-center gap-4">
					<Button asChild variant="default">
						<a href="#search-heading">Mulai Membaca</a>
					</Button>
					<Button asChild variant="outline">
						<a href="https://irfan-nuha.vercel.app" target="_blank">
							Kunjungi Web
						</a>
					</Button>
				</div>
			</motion.div>

			<motion.div
				className="absolute top-0 right-0 opacity-20 w-64 h-64 bg-green-300 rounded-full blur-3xl"
				animate={{ rotate: 360 }}
				transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
			/>
		</section>
	);
};

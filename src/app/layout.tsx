import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Poppins, Scheherazade_New, Amiri_Quran } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { AudioProvider } from "@/components/audio/audio-provider";
import { AudioBanner } from "@/components/audio/audio-banner";
import { VercelAnalyticsTracker } from "@/components/analytics/vercel-analytics";

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-poppins",
});
const scheherazade = Scheherazade_New({
	subsets: ["arabic"],
	weight: ["400", "700"],
	variable: "--font-scheherazade",
});
const amiriQuran = Amiri_Quran({
	subsets: ["arabic"],
	weight: ["400"],
	variable: "--font-amiri",
});

export const metadata: Metadata = {
	title: "QuranApp - IrfanApp",
	description:
		"Quran Web App with Surah, Tafsir, Audio Player, and Bookmarks",
	icons: {
		icon: [
			{ url: "/icons/favicon.ico" },
			{
				url: "/icons/favicon-16x16.png",
				sizes: "16x16",
				type: "image/png",
			},
			{
				url: "/icons/favicon-32x32.png",
				sizes: "32x32",
				type: "image/png",
			},
		],
		apple: "/icons/apple-touch-icon.png",
		other: [
			{ rel: "manifest", url: "/icons/site.webmanifest" },
			{
				rel: "android-chrome-192x192",
				url: "/icons/android-chrome-192x192.png",
			},
			{
				rel: "android-chrome-512x512",
				url: "/icons/android-chrome-512x512.png",
			},
		],
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
			<body
				className={`${poppins.className} ${scheherazade.variable} ${amiriQuran.variable} flex min-h-screen flex-col`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem>
					<AudioProvider>
						<VercelAnalyticsTracker />{" "}
						{/* << Track SPA navigation */}
						<Navbar />
						<main className="flex-1">{children}</main>
						<AudioBanner />
						<Footer />
					</AudioProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}

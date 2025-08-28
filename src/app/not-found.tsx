// app/not-found.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchX } from "lucide-react";

export default function NotFound() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center text-center px-4">
			<div className="flex items-center gap-2">
				<h1 className="text-6xl font-bold text-green-600">404 </h1>
				<SearchX className="h-16 w-16 shrink-0 text-green-600" />
			</div>

			<p className="mt-4 text-lg text-gray-600">
				Halaman yang kamu cari tidak ditemukan.
			</p>

			<Link href="/" className="mt-6">
				<Button className="bg-green-700 text-white hover:bg-gray-800 rounded-xl px-6 py-2">
					Kembali ke Beranda
				</Button>
			</Link>
		</div>
	);
}

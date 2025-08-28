// src/app/legal/page.tsx
"use client";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Mail } from "lucide-react";

export default function LegalPage() {
	return (
		<Container className="py-12">
			<h1 className="text-3xl font-bold mb-10 text-center">
				Legal & Disclaimer
			</h1>

			<div className="grid gap-6 md:grid-cols-2">
				{/* Tujuan Penggunaan */}
				<Card className="hover:shadow-lg transition-shadow duration-200">
					<CardHeader>
						<CardTitle>Tujuan Penggunaan</CardTitle>
						<CardDescription>
							Aplikasi ini dibuat untuk tujuan edukasi dan
							pembelajaran Al-Qur'an.
						</CardDescription>
					</CardHeader>
					<CardContent>
						Konten yang disediakan hanya untuk referensi dan studi.
						Tidak dimaksudkan untuk penggunaan komersial atau
						distribusi konten tanpa izin.
					</CardContent>
				</Card>

				{/* Sumber Data */}
				<Card className="hover:shadow-lg transition-shadow duration-200">
					<CardHeader>
						<CardTitle>Sumber Data</CardTitle>
						<CardDescription>
							Semua teks Al-Qur'an, transliterasi, terjemahan, dan
							audio diambil dari API{" "}
							<a
								href="https://equran.id"
								target="_blank"
								className="text-green-600 underline">
								equran.id
							</a>
							.
						</CardDescription>
					</CardHeader>
					<CardContent>
						Penggunaan API dilakukan dengan atribusi penuh. Data
						hanya digunakan untuk keperluan edukasi dan referensi.
					</CardContent>
				</Card>

				{/* Hak Cipta & Disclaimer */}
				<Card className="hover:shadow-lg transition-shadow duration-200">
					<CardHeader>
						<CardTitle>Hak Cipta & Disclaimer</CardTitle>
						<CardDescription>
							Semua hak cipta dan lisensi konten tetap dimiliki
							oleh pemilik aslinya.
						</CardDescription>
					</CardHeader>
					<CardContent>
						Aplikasi ini tidak mengklaim kepemilikan konten
						Al-Qur'an. Pengguna bertanggung jawab untuk menggunakan
						konten sesuai dengan hukum dan etika.
					</CardContent>
				</Card>

				{/* Kredit */}
				<Card className="hover:shadow-lg transition-shadow duration-200">
					<CardHeader>
						<CardTitle>Kredit</CardTitle>
						<CardDescription>
							Terima kasih kepada pengembang API equran.id dan
							komunitas open-source yang membantu pembuatan
							aplikasi ini.
						</CardDescription>
					</CardHeader>
					<CardContent>
						Aplikasi ini dibuat oleh Irfan dengan tujuan edukasi.
					</CardContent>
				</Card>

				{/* Kontak */}
				<Card className="hover:shadow-lg transition-shadow duration-200 md:col-span-2">
					<CardHeader>
						<CardTitle>Kontak</CardTitle>
						<CardDescription>
							Jika ada kendala, pertanyaan, atau masalah hak
							cipta, silakan hubungi Irfan melalui email berikut:
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
						<p className="text-sm text-muted-foreground">
							irfannuha@protonmail.com
						</p>
						<Button
							asChild
							variant="outline"
							className="flex items-center gap-2">
							<a href="mailto:irfannuha@protonmail.com">
								<Mail className="h-4 w-4" /> Kirim Email
							</a>
						</Button>
					</CardContent>
				</Card>
			</div>
		</Container>
	);
}

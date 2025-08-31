// src/app/about/page.tsx
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
import { Mail, Github, Info } from "lucide-react";

export default function AboutPage() {
	return (
		<Container className="py-12">
			<h1 className="text-3xl font-bold mb-10 text-center flex items-center justify-center gap-2">
				<Info className="w-8 h-8 text-green-600" />
				About QuranApp
			</h1>
			<div className="grid gap-6 md:grid-cols-2">
				{/* Tentang Aplikasi */}
				<Card className="hover:shadow-lg transition-shadow duration-200 md:col-span-2">
					<CardHeader>
						<CardTitle>Tentang Aplikasi</CardTitle>
						<CardDescription>
							QuranApp adalah aplikasi pembelajaran Al-Qur&apos;an
							berbasis web yang menyediakan teks Arab,
							transliterasi Latin, terjemahan, dan audio qari.
							Tujuannya adalah edukasi dan kemudahan akses belajar
							Al-Qur&apos;an.
						</CardDescription>
					</CardHeader>
					<CardContent>
						Semua data diambil dari API{" "}
						<a
							href="https://equran.id"
							target="_blank"
							className="text-green-600 underline">
							equran.id
						</a>{" "}
						dengan atribusi penuh. Aplikasi ini tidak mengklaim
						kepemilikan konten.
					</CardContent>
				</Card>

				{/* Tentang Pengembang */}
				<Card className="hover:shadow-lg transition-shadow duration-200">
					<CardHeader>
						<CardTitle>Tentang Pengembang</CardTitle>
						<CardDescription>
							Aplikasi ini dibuat oleh Irfan, mahasiswa yang
							tertarik dengan teknologi, sains perilaku, dan
							edukasi digital.
						</CardDescription>
					</CardHeader>
					<CardContent>
						Fokus pengembangan adalah membuat aplikasi edukatif yang
						mudah diakses dan responsif.
					</CardContent>
				</Card>

				{/* Kontak */}
				<Card className="hover:shadow-lg transition-shadow duration-200">
					<CardHeader>
						<CardTitle>Kontak</CardTitle>
						<CardDescription>
							Jika ada pertanyaan, saran, atau ingin
							berkolaborasi, hubungi melalui email atau kunjungi
							repositori GitHub:
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
						<p className="text-sm text-muted-foreground">
							irfannuha@protomail.com
						</p>
						<div className="flex gap-2">
							<Button
								asChild
								variant="outline"
								className="flex items-center gap-2">
								<a href="mailto:irfannuha@gmail.com">
									<Mail className="h-4 w-4" /> Email
								</a>
							</Button>
							<Button
								asChild
								variant="outline"
								className="flex items-center gap-2">
								<a
									href="https://github.com/IrfanNha"
									target="_blank"
									rel="noopener noreferrer">
									<Github className="h-4 w-4" /> GitHub
								</a>
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</Container>
	);
}

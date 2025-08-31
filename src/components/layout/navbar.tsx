"use client";

import Link from "next/link";
import {
	Menu,
	Home,
	BookOpen,
	Bookmark,
	Info,
	FileText,
	ChevronDown,
	BookAudio,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { Container } from "./container";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";

export function Navbar() {
	return (
		<header className="sticky top-0 z-50 border-b backdrop-blur bg-background/90">
			<Container>
				<div className="flex h-16 items-center justify-between">
					{/* Logo */}
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

					{/* Desktop Nav */}
					<nav className="hidden md:flex items-center space-x-6">
						<Link
							href="/"
							className="flex items-center gap-2 text-sm font-medium hover:text-green-600">
							<Home className="h-4 w-4" /> Home
						</Link>
						<Link
							href="/surah"
							className="flex items-center gap-2 text-sm font-medium hover:text-green-600">
							<BookOpen className="h-4 w-4" /> Surah
						</Link>
						<Link
							href="/bookmark"
							className="flex items-center gap-2 text-sm font-medium hover:text-green-600">
							<Bookmark className="h-4 w-4" /> Bookmark
						</Link>
						<Link
							href="/doa"
							className="flex items-center gap-2 text-sm font-medium hover:text-green-600">
							<BookAudio className="h-4 w-4" /> Doa
						</Link>

						{/* Dropdown Menu */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									size="sm"
									className="flex items-center ">
									<Info className="h-4 w-4" /> More{" "}
									<ChevronDown className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="start">
								<DropdownMenuItem asChild>
									<Link
										href="/about"
										className="flex items-center gap-2">
										<Info className="h-4 w-4" /> About
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link
										href="/legal"
										className="flex items-center gap-2">
										<FileText className="h-4 w-4" /> Legal
									</Link>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>

						<ThemeToggle />
					</nav>

					{/* Mobile Nav */}
					<div className="flex md:hidden items-center space-x-2">
						<ThemeToggle />
						<Sheet>
							<SheetTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									aria-label="Open menu">
									<Menu className="h-6 w-6" />
								</Button>
							</SheetTrigger>

							<SheetContent side="right" className="p-4">
								{/* Accessible Header */}
								<SheetHeader>
									<SheetTitle className="font-semibold">
										Menu Navigasi Mobile
									</SheetTitle>
									<SheetDescription>
										Gunakan menu ini untuk berpindah ke
										halaman utama, surah, bookmark, About,
										atau Legal.
									</SheetDescription>
								</SheetHeader>

								{/* Mobile Nav Links */}
								<nav className="flex flex-col space-y-4 mt-4 ml-1">
									{/* Main Links */}
									<Link
										href="/"
										className="flex items-center gap-3 text-lg font-medium hover:text-green-600">
										<Home className="h-5 w-5" /> Home
									</Link>
									<Link
										href="/surah"
										className="flex items-center gap-3 text-lg font-medium hover:text-green-600">
										<BookOpen className="h-5 w-5" /> Surah
									</Link>
									<Link
										href="/bookmark"
										className="flex items-center gap-3 text-lg font-medium hover:text-green-600">
										<Bookmark className="h-5 w-5" />{" "}
										Bookmark
									</Link>
									<Link
										href="/doa"
										className="flex items-center gap-3 text-lg font-medium hover:text-green-600">
										<BookAudio className="h-5 w-5" /> Doa
									</Link>

									<div className="border-t border-muted-foreground/30 my-2" />

									<Link
										href="/about"
										className="mt-3 flex items-center gap-3 text-lg font-medium hover:text-green-600">
										<Info className="h-5 w-5" /> About
									</Link>
									<Link
										href="/legal"
										className="flex items-center gap-3 text-lg font-medium hover:text-green-600">
										<FileText className="h-5 w-5" /> Legal
									</Link>
								</nav>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</Container>
		</header>
	);
}

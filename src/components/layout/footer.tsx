// src/components/layout/footer.tsx
import { Container } from "./container";

export function Footer() {
	return (
		<footer className="border-t  backdrop-blur-md">
			<Container className="flex h-20 items-center justify-between text-sm font-light text-gray-500">
				<p>© {new Date().getFullYear()} QuranApp - IrfanLabs</p>
				<p className="text-green-600 dark:text-green-400 font-medium">
					Built with 💖 by{" "}
					<a
						href="http://irfan-nuha.vercel.app"
						target="_blank"
						rel="noopener noreferrer">
						Irfan.
					</a>
				</p>
			</Container>
		</footer>
	);
}

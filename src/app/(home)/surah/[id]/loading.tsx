//surah/[id]/loading.tsx
export default function Loading() {
	return (
		<div className="container mx-auto px-4 py-6 space-y-4">
			<div className="h-28 w-full rounded-xl bg-muted animate-pulse" />
			<div className="grid grid-cols-1 gap-4">
				{[...Array(6)].map((_, i) => (
					<div
						key={i}
						className="h-32 rounded-xl bg-muted animate-pulse"
					/>
				))}
			</div>
		</div>
	);
}

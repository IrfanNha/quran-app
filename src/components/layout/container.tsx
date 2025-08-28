// src/components/layout/container.tsx
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Container({ className, ...props }: ContainerProps) {
	return (
		<div
			className={cn(
				"mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-8",
				className
			)}
			{...props}
		/>
	);
}

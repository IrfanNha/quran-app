"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function VercelAnalyticsTracker() {
	const pathname = usePathname();

	useEffect(() => {
		// Optional: Log pageview ke console
		console.log("Navigated to:", pathname);
		// Vercel Analytics otomatis track pageview, jadi ini opsional
	}, [pathname]);

	return null;
}

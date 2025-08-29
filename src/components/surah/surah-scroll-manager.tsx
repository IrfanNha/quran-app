"use client";

import { useEffect } from "react";

export default function ScrollManager() {
	const hash = typeof window !== "undefined" ? window.location.hash : "";

	useEffect(() => {
		if (!hash) return;

		const targetId = hash.replace("#", "");
		const el = document.getElementById(targetId);

		if (el) {
			setTimeout(() => {
				el.scrollIntoView({
					behavior: "smooth",
					block: "center",
				});
			}, 300);
		}
	}, [hash]);

	return null;
}

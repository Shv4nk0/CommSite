"use client";

import { Mail, Phone, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Footer = () => {
	const footerRef = useRef<HTMLElement>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const footerElement = footerRef.current;
		if (!footerElement) return;

		const revealFooter = () => {
			setIsVisible(true);
		};

		const checkFooterVisibility = () => {
			if (!footerElement || isVisible) return;

			const rect = footerElement.getBoundingClientRect();
			const viewportHeight = window.innerHeight;

			if (rect.top <= viewportHeight * 0.92) {
				revealFooter();
			}
		};

		const observer =
			typeof IntersectionObserver !== "undefined"
				? new IntersectionObserver(
						([entry]) => {
							if (entry.isIntersecting) {
								revealFooter();
							}
						},
						{
							threshold: 0,
							rootMargin: "0px 0px -8% 0px",
						},
				  )
				: null;

		observer?.observe(footerElement);
		checkFooterVisibility();
		const rafId = window.requestAnimationFrame(checkFooterVisibility);
		const failSafeId = window.setTimeout(revealFooter, 1200);

		window.addEventListener("scroll", checkFooterVisibility, { passive: true });
		window.addEventListener("resize", checkFooterVisibility);

		return () => {
			observer?.disconnect();
			window.cancelAnimationFrame(rafId);
			window.clearTimeout(failSafeId);
			window.removeEventListener("scroll", checkFooterVisibility);
			window.removeEventListener("resize", checkFooterVisibility);
		};
	}, [isVisible]);

	const animatedSectionClass = isVisible
		? "md:translate-y-0 md:opacity-100"
		: "md:translate-y-8 md:opacity-0";

	return (
		<footer className="w-full bg-[#080808] text-white" ref={footerRef}>
			<div className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-16">
				<div
					className={`grid gap-10 border-t border-white/10 pt-10 opacity-100 transition-all duration-700 translate-y-0 md:grid-cols-[1.3fr_1fr] ${animatedSectionClass}`}
				>
					<div className="space-y-4">
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-zinc-950">
								Z
							</div>
							<p className="text-lg font-semibold tracking-[0.12em]">
								ZAKAZNOY
							</p>
						</div>

						<p className="max-w-md text-sm leading-6 text-white/60">
							Пространство для отдыха, встреч и спокойного времени за городом.
						</p>
					</div>

					<div className="space-y-4">
						<p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
							Контакты
						</p>

						<div className="space-y-3 text-sm text-white/70">
							<a
								href="tel:+79991234567"
								className="flex items-center gap-3 transition hover:text-white"
							>
								<Phone className="h-4 w-4 flex-shrink-0 text-white/50" />
								<span>+7 (999) 123-45-67</span>
							</a>

							<a
								href="mailto:info@zakaznoy.ru"
								className="flex items-center gap-3 transition hover:text-white"
							>
								<Mail className="h-4 w-4 flex-shrink-0 text-white/50" />
								<span>info@zakaznoy.ru</span>
							</a>

							<a
								href="https://t.me/zakaznoy_support"
								target="_blank"
								rel="noreferrer"
								className="flex items-center gap-3 transition hover:text-white"
							>
								<Send className="h-4 w-4 flex-shrink-0 text-white/50" />
								<span>@zakaznoy_support</span>
							</a>
						</div>
					</div>
				</div>

				<div
					className={`mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-white/45 opacity-100 transition-all duration-700 delay-100 translate-y-0 md:flex-row md:items-center md:justify-between ${animatedSectionClass}`}
				>
					<p>&copy; 2026 Zakaznoy</p>
					<p>Бронь и вопросы по телефону или в Telegram</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

interface HeaderProps {
	heading?: string;
	phone?: string;
	email?: string;
	telegram?: string;
}

type SectionTarget = "hero" | "services" | "contact";

const Header = ({
	heading = "Загородный отдых",
	phone = "+7 (901) 565-51-23",
	email = "tatianaminikova25@gmail.com",
	telegram = "tatianaminikova25",
}: HeaderProps) => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		const heroElement = document.getElementById("hero");
		if (!heroElement) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsScrolled(!entry.isIntersecting);
			},
			{ threshold: 0, rootMargin: "0px 0px -50px 0px" },
		);

		observer.observe(heroElement);

		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		const closeMenu = () => setIsMobileMenuOpen(false);
		window.addEventListener("resize", closeMenu);

		return () => window.removeEventListener("resize", closeMenu);
	}, []);

	const scrollToSection = (target: SectionTarget) => {
		const element = document.getElementById(target);
		if (!element) return;

		element.scrollIntoView({ behavior: "smooth", block: "center" });
		setIsMobileMenuOpen(false);
	};

	const headerSurface = isScrolled
		? "bg-white/80 shadow-md backdrop-blur-md"
		: "bg-black/10 backdrop-blur-sm";
	const navSurface = isScrolled
		? "bg-zinc-100/80 text-zinc-950"
		: "bg-white/10 text-white";
	const accentText = isScrolled ? "text-zinc-950" : "text-white";
	const mutedText = isScrolled ? "text-zinc-600" : "text-white/70";

	return (
		<header
			className={`fixed inset-x-0 top-0 z-30 w-full transition-all duration-500 ${headerSurface}`}
		>
			<div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 md:px-8">
				<div className="flex items-center justify-between gap-3 md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
					<div className="flex min-w-0 items-center gap-3 justify-self-start">
						<span
							className={`h-9 w-px transition-colors duration-500 ${
								isScrolled ? "bg-zinc-300" : "bg-white/40"
							}`}
							aria-hidden="true"
						/>
						<div className="flex flex-col">
							<p
								className={`whitespace-nowrap text-sm font-semibold leading-none tracking-[0.14em] transition-colors duration-500 sm:text-base ${accentText}`}
							>
								{heading}
							</p>
							<p
								className={`mt-1 whitespace-nowrap text-[10px] font-medium uppercase leading-none tracking-[0.24em] transition-colors duration-500 ${mutedText}`}
							>
								баня, чан, прогулки
							</p>
						</div>
					</div>

					<nav
						className={`hidden items-center gap-6 justify-self-center rounded-full px-6 py-3 text-sm font-medium shadow-[0_20px_70px_-40px_rgba(15,23,42,0.4)] backdrop-blur-md transition-all duration-500 md:flex ${navSurface}`}
					>
						<button
							type="button"
							onClick={() => scrollToSection("hero")}
							className="transition hover:opacity-70"
						>
							Главная
						</button>
						<button
							type="button"
							onClick={() => scrollToSection("services")}
							className="transition hover:opacity-70"
						>
							Услуги
						</button>
						<button
							type="button"
							onClick={() => scrollToSection("contact")}
							className="transition hover:opacity-70"
						>
							Контакты
						</button>
					</nav>

					<button
						type="button"
						onClick={() => scrollToSection("contact")}
						className={`hidden items-center justify-center justify-self-end rounded-full px-5 py-3 text-sm font-semibold shadow-sm transition-all duration-500 md:inline-flex ${
							isScrolled
								? "bg-yellow-400 text-zinc-950 hover:bg-yellow-500"
								: "bg-white text-zinc-950 hover:bg-zinc-100"
						}`}
					>
						Связаться
						<span
							className={`ml-3 inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-500 ${
								isScrolled ? "bg-white text-zinc-950" : "bg-zinc-950 text-white"
							}`}
						>
							<ArrowRight className="h-4 w-4" />
						</span>
					</button>

					<button
						type="button"
						className={`inline-flex h-11 w-11 items-center justify-center justify-self-end rounded-full border transition md:hidden ${
							isScrolled
								? "border-zinc-200 bg-white text-zinc-950"
								: "border-white/20 bg-black/15 text-white"
						}`}
						onClick={() => setIsMobileMenuOpen((prev) => !prev)}
						aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
						aria-expanded={isMobileMenuOpen}
					>
						{isMobileMenuOpen ? (
							<X className="h-5 w-5" />
						) : (
							<Menu className="h-5 w-5" />
						)}
					</button>
				</div>

				{/* <div
					className={`mt-3 hidden grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 pt-2 text-[11px] uppercase tracking-[0.3em] transition-colors duration-500 md:grid ${mutedText}`}
				>
					<span className="justify-self-start whitespace-nowrap">
						Тел: {phone}
					</span>
					<span className="justify-self-center whitespace-nowrap">
						Почта: {email}
					</span>
					<span className="justify-self-end whitespace-nowrap">
						Telegram: @{telegram}
					</span>
				</div> */}

				{isMobileMenuOpen ? (
					<div
						className={`mt-3 rounded-3xl border p-4 shadow-lg backdrop-blur-md md:hidden ${
							isScrolled
								? "border-zinc-200 bg-white/95 text-zinc-950"
								: "border-white/10 bg-black/40 text-white"
						}`}
					>
						<nav className="flex flex-col gap-2 text-sm font-medium">
							<button
								type="button"
								className="rounded-2xl px-3 py-2 text-left transition hover:bg-black/5"
								onClick={() => scrollToSection("hero")}
							>
								Главная
							</button>
							<button
								type="button"
								className="rounded-2xl px-3 py-2 text-left transition hover:bg-black/5"
								onClick={() => scrollToSection("services")}
							>
								Услуги
							</button>
							<button
								type="button"
								className="rounded-2xl px-3 py-2 text-left transition hover:bg-black/5"
								onClick={() => scrollToSection("contact")}
							>
								Контакты
							</button>
						</nav>

						<div className="mt-4 space-y-2 text-sm">
							<p>Тел: {phone}</p>
							<p>Почта: {email}</p>
							<p>Telegram: @{telegram}</p>
						</div>

						<button
							type="button"
							className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-yellow-400 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-yellow-500"
							onClick={() => scrollToSection("contact")}
						>
							Связаться
							<ArrowRight className="ml-2 h-4 w-4" />
						</button>
					</div>
				) : null}
			</div>
		</header>
	);
};

export default Header;

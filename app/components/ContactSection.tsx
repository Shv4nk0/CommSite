"use client";

import { Calendar } from "lucide-react";

const ContactSection = () => {
	return (
		<section
			id="contact"
			className="mx-auto w-full max-w-7xl px-4 py-20 pt-4 md:pt-4 md:px-8 md:py-24"
		>
			<div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
				<p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
					Бронирование
				</p>
				<h2 className="mt-3 text-3xl font-semibold text-zinc-950 md:text-4xl">
					Забронируйте встречу
				</h2>
				<p className="mt-4 text-sm leading-7 text-zinc-600 md:text-base">
					Выберите удобное для вас время и забронируйте консультацию. Наши
					специалисты помогут вам подобрать идеальный вариант отдыха.
				</p>
			</div>

			<div className="grid gap-8 md:grid-cols-2 md:gap-10">
				<div className="relative hidden overflow-hidden rounded-3xl md:block">
					<div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900/90 to-yellow-700/20 bg-zin-950" />
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(250,204,21,0.15),transparent_60%)]" />
					<div className="absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 translate-x-1/3 rounded-full bg-yellow-500/20 blur-3xl" />
					<div className="absolute bottom-10 left-10 h-48 w-48 rounded-full border border-yellow-500/30 backdrop-blur-sm" />
					<div className="absolute right-20 top-20 h-32 w-32 rounded-full border-2 border-yellow-500/30" />

					<div className="relative flex h-2/3 flex-col items-center justify-center p-16 text-center">
						<div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-yellow-500/40 bg-yellow-500/10 backdrop-blur">
							<Calendar className="h-7 w-7 text-yellow-400" />
						</div>
						<h3 className="text-4xl font-bold tracking-tight text-white">
							<span className="bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
								Забронируйте встречу
							</span>
						</h3>

						<p className="mt-2 text-2xl font-light text-white/70">
							Простое и удобное бронирование на удобное для вас время
						</p>
					</div>
				</div>

				<div className="rounded-3xl bg-white p-8 shadow-lg md:p-10 overflow-hidden">
					<iframe
						src="https://n2212239.yclients.com"
						width="100%"
						height="600"
						style={{ border: "none", borderRadius: "0.75rem" }}
						title="Booking calendar"
					/>
				</div>
			</div>
		</section>
	);
};

export default ContactSection;

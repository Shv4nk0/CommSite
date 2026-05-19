"use client";

import { Send } from "lucide-react";
import { useState } from "react";

type ContactFormData = {
	name: string;
	email: string;
	phone: string;
	details: string;
};

const initialFormData: ContactFormData = {
	name: "",
	email: "",
	phone: "",
	details: "",
};

const ContactSectionOriginal = () => {
	const [formData, setFormData] = useState<ContactFormData>(initialFormData);
	const [loading, setLoading] = useState(false);
	const [submitMessage, setSubmitMessage] = useState<{
		type: "success" | "error";
		text: string;
	} | null>(null);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setSubmitMessage(null);

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const result = (await response.json()) as { message?: string };

			if (!response.ok) {
				throw new Error(result.message ?? "Не удалось отправить заявку.");
			}

			setFormData(initialFormData);
			setSubmitMessage({
				type: "success",
				text: "Спасибо! Ваша заявка отправлена.",
			});
		} catch (error) {
			setSubmitMessage({
				type: "error",
				text:
					error instanceof Error
						? error.message
						: "Произошла ошибка при отправке. Попробуйте еще раз.",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<section
			id="contact"
			className="mx-auto w-full max-w-7xl px-4 py-20 pt-4 md:pt-4 md:px-8 md:py-24"
		>
			<div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
				<p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
					Контакты
				</p>
				<h2 className="mt-3 text-3xl font-semibold text-zinc-950 md:text-4xl">
					Оставьте заявку
				</h2>
				<p className="mt-4 text-sm leading-7 text-zinc-600 md:text-base">
					Напишите удобным способом, и мы поможем подобрать подходящий формат
					отдыха.
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
							<Send className="h-7 w-7 text-yellow-400" />
						</div>
						<h3 className="text-4xl font-bold tracking-tight text-white">
							<span className="bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
								Оставьте заявку
							</span>
						</h3>

						<p className="mt-2 text-2xl font-light text-white/70">
							Свяжемся с вами, уточним детали и предложим решение под вашу
							задачу
						</p>
					</div>
				</div>

				<div className="rounded-3xl bg-white p-8 shadow-lg md:p-10">
					<h3 className="mb-8 text-2xl font-bold text-zinc-950">
						Отправьте запрос
					</h3>

					<form onSubmit={handleSubmit} className="space-y-5">
						<div>
							<label className="mb-2 block text-sm font-medium text-zinc-700">
								Ваше имя
							</label>
							<input
								type="text"
								name="name"
								value={formData.name}
								onChange={handleChange}
								placeholder="Иван Петров"
								required
								className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-base text-zinc-950 placeholder-zinc-400 transition focus:border-yellow-500 focus:bg-white focus:outline-none"
							/>
						</div>

						<div>
							<label className="mb-2 block text-sm font-medium text-zinc-700">
								Email
							</label>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								placeholder="name@example.com"
								required
								suppressHydrationWarning
								className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-base text-zinc-950 placeholder-zinc-400 transition focus:border-yellow-500 focus:bg-white focus:outline-none"
							/>
						</div>

						<div>
							<label className="mb-2 block text-sm font-medium text-zinc-700">
								Номер телефона
							</label>
							<input
								type="tel"
								name="phone"
								value={formData.phone}
								onChange={handleChange}
								placeholder="+7 (999) 123-45-67"
								className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-base text-zinc-950 placeholder-zinc-400 transition focus:border-yellow-500 focus:bg-white focus:outline-none"
							/>
						</div>

						<div>
							<label className="mb-2 block text-sm font-medium text-zinc-700">
								Дополнительно
							</label>
							<textarea
								name="details"
								value={formData.details}
								onChange={handleChange}
								placeholder="Расскажите о ваших пожеланиях..."
								rows={5}
								className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-base text-zinc-950 placeholder-zinc-400 transition focus:border-yellow-500 focus:bg-white focus:outline-none"
							/>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full rounded-xl bg-yellow-400 py-3 text-base font-semibold text-zinc-950 transition hover:bg-yellow-500 disabled:opacity-70"
						>
							{loading ? "Отправка..." : "Отправить запрос"}
						</button>

						{submitMessage ? (
							<p
								className={`text-sm ${
									submitMessage.type === "success"
										? "text-green-600"
										: "text-red-600"
								}`}
							>
								{submitMessage.text}
							</p>
						) : null}
					</form>

					<div className="mt-8 border-t border-zinc-200 pt-6">
						<p className="mb-4 text-sm font-medium text-zinc-700">
							Или свяжитесь напрямую:
						</p>
						<div className="space-y-2 text-sm">
							<p>
								<a
									href="tel:+79015655123"
									className="text-yellow-600 hover:text-yellow-700"
								>
									+7 (901) 565-51-23
								</a>
							</p>
							<p>
								<a
									href="mailto:tatianaminikova25@gmail.com"
									className="text-yellow-600 hover:text-yellow-700"
								>
									tatianaminikova25@gmail.com
								</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ContactSectionOriginal;

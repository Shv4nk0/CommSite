import Image from "next/image";

const FeaturedService = () => {
	return (
		<section className="w-full py-8">
			<div className="mx-auto max-w-7xl px-4 md:px-8">
				<div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white/90 shadow-sm">
					<div className="grid gap-0 md:grid-cols-[1.4fr_1fr]">
						<div className="relative h-80 w-full overflow-hidden md:h-full">
							<Image
								src="/katamaran1.jpg"
								alt="Электрокатамаран"
								fill
								className="object-cover"
							/>
						</div>
						<div className="p-8 md:p-10">
							<span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
								Популярно
							</span>
							<h3 className="mt-4 text-3xl font-semibold text-zinc-950">
								Электрокатамаран на воде
							</h3>
							<p className="mt-4 text-base leading-7 text-zinc-600">
								Арендуйте электрокатамаран для прогулок, фотосессий и спокойного
								отдыха вдвоём или с семьёй.
							</p>
							<ul className="mt-6 space-y-3 text-sm text-zinc-600">
								<li>• Тихий электрический ход без запаха</li>
								<li>• Удобный вход и просторная палуба</li>
								<li>• Подходит для прогулок и небольших мероприятий</li>
							</ul>
							<a
								href="#contact"
								className="mt-8 inline-block rounded-2xl bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
							>
								Заказать катамаран
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default FeaturedService;

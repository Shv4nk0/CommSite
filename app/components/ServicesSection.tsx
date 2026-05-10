import { services } from "@/app/data/services";
import FeaturedService from "./FeaturedService";
import ServiceBlock from "./ServiceBlock";

const ServicesSection = () => {
	const groupedByCategory = services.reduce(
		(acc, service) => {
			const category = service.category || "Другое";
			if (!acc[category]) {
				acc[category] = [];
			}
			acc[category].push(service);
			return acc;
		},
		{} as Record<string, typeof services>,
	);

	const categories = Array.from(
		new Map(
			services.map((service) => [
				service.category || "Другое",
				service.category || "Другое",
			]),
		).values(),
	);

	return (
		<section id="services" className="w-full bg-[#fcfcfc] py-20 md:py-24">
			<div className="mx-auto max-w-7xl px-4 md:px-8">
				<div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
					<p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
						Услуги
					</p>
					<h2 className="mt-3 text-3xl font-semibold text-zinc-950 md:text-4xl">
						Форматы отдыха и развлечений
					</h2>
					<p className="mt-4 text-sm leading-7 text-zinc-600 md:text-base">
						Выберите подходящий формат отдыха для вечера, встречи или короткого
						выезда за город.
					</p>
				</div>

				<FeaturedService />

				<div className="mt-14 flex items-center gap-4 md:mt-16">
					<div className="flex-1 border-t border-zinc-300" />
					<div className="text-sm font-medium uppercase tracking-widest text-zinc-400">
						•
					</div>
					<div className="flex-1 border-t border-zinc-300" />
				</div>

				<div className="mt-10 space-y-16 md:mt-12 md:space-y-20">
					{categories.map((category, categoryIndex) => (
						<div key={category}>
							<div className="mb-8 text-center md:mb-10">
								<h3 className="text-3xl font-semibold text-zinc-950 md:text-4xl">
									{category}
								</h3>
							</div>

							<div className="space-y-10 md:space-y-12">
								{(() => {
									const categoryServices = groupedByCategory[category];
									const fullWidthServices = categoryServices.filter(
										(service) => "fullWidth" in service && service.fullWidth,
									);
									const regularServices = categoryServices.filter(
										(service) =>
											!("fullWidth" in service) || !service.fullWidth,
									);

									return (
										<>
											{fullWidthServices.map((service) => (
												<ServiceBlock
													key={service.title}
													id={`service-${service.title
														.toLowerCase()
														.replace(/\s+/g, "-")}`}
													title={service.title}
													description={service.description}
													points={service.points}
													imageSrc={service.imageSrc}
													imageAlt={service.imageAlt}
												/>
											))}

											{Array.from(
												{
													length: Math.ceil(regularServices.length / 2),
												},
												(_, pairIndex) => {
													const pair = regularServices.slice(
														pairIndex * 2,
														pairIndex * 2 + 2,
													);

													return (
														<div
															key={`${category}-pair-${pairIndex}`}
															className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10"
														>
															{pair.map((service) => (
																<ServiceBlock
																	key={service.title}
																	id={`service-${service.title
																		.toLowerCase()
																		.replace(/\s+/g, "-")}`}
																	title={service.title}
																	description={service.description}
																	points={service.points}
																	imageSrc={service.imageSrc}
																	imageAlt={service.imageAlt}
																/>
															))}
														</div>
													);
												},
											)}
										</>
									);
								})()}
							</div>

							{categoryIndex < categories.length - 1 ? (
								<div className="mt-16 flex items-center gap-4 md:mt-20">
									<div className="flex-1 border-t border-zinc-300" />
									<div className="text-sm font-medium uppercase tracking-widest text-zinc-400">
										•
									</div>
									<div className="flex-1 border-t border-zinc-300" />
								</div>
							) : null}
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default ServicesSection;

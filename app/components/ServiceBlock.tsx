interface ServiceBlockProps {
	title: string;
	description: string;
	points: string[];
	imageSrc: string;
	imageAlt: string;
	buttonLabel?: string;
	id?: string;
}

const serviceButtonLabels: Record<string, string> = {
	"Баня на дровах": "Заказать баню на дровах",
	"Сибирский чан": "Заказать сибирский чан",
	"Прогулка на лошадях": "Заказать прогулку на лошадях",
	Бильярд: "Заказать бильярд",
	"Кинозал VIP": "Заказать кинозал VIP",
	Кальян: "Заказать кальян",
	"Номера-апартаменты": "Забронировать апартаменты",
	"Домики на двоих": "Забронировать домик на двоих",
	"Подзорная труба": "Заказать наблюдение",
	Беседка: "Забронировать беседку",
	"Полёты на вертолётах": "Заказать полёт на вертолёте",
};

const ServiceBlock = ({
	title,
	description,
	points,
	imageSrc,
	buttonLabel,
	id,
}: ServiceBlockProps) => {
	const ctaLabel =
		buttonLabel ?? serviceButtonLabels[title] ?? "Оставить заявку";

	return (
		<div
			id={id}
			className="group relative h-96 overflow-hidden rounded-2xl shadow-lg transition-transform hover:scale-105"
			style={{
				backgroundImage: `url(${imageSrc})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<div className="absolute inset-0 bg-black/50 transition-opacity group-hover:bg-black/60" />

			<div className="relative flex h-full flex-col justify-between p-6 text-white md:p-8">
				<div>
					<h3 className="text-3xl font-semibold">{title}</h3>
					<p className="mt-4 text-base leading-7 text-gray-100">
						{description}
					</p>
				</div>

				<div>
					<ul className="mt-6 space-y-2 text-sm text-gray-100">
						{points.map((item) => (
							<li key={item}>• {item}</li>
						))}
					</ul>
					<a
						href="#contact"
						className="mt-6 inline-block rounded-xl bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-gray-100"
					>
						{ctaLabel}
					</a>
				</div>
			</div>
		</div>
	);
};

export default ServiceBlock;

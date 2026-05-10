"use client";

import { services } from "@/app/data/services";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const Carousel = () => {
	const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			loop: true,
			dragFree: false,
			watchDrag: true,
		},
		[
			Autoplay({
				delay: 4500,
				stopOnInteraction: false,
				stopOnMouseEnter: true,
			}),
		],
	);
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		if (!emblaApi) return;
		emblaApi.plugins().autoplay?.play();

		const onSelect = () => {
			setCurrent(emblaApi.selectedScrollSnap());
		};

		emblaApi.on("select", onSelect);
		onSelect();

		return () => {
			emblaApi.off("select", onSelect);
		};
	}, [emblaApi]);

	const handleDotClick = (index: number) => {
		emblaApi?.scrollTo(index);
	};

	const handleScrollToService = (title: string) => {
		const serviceId = `service-${title.toLowerCase().replace(/\s+/g, "-")}`;
		const element = document.getElementById(serviceId);

		if (element) {
			element.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	};

	const handleScrollToContact = () => {
		const element = document.getElementById("contact");

		if (element) {
			element.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	};

	return (
		<div className="embla relative h-full w-full overflow-hidden">
			<div className="h-full w-full overflow-hidden" ref={emblaRef}>
				<div className="flex h-full w-full touch-pan-y touch-pinch-zoom">
					{services.map((service, index) => (
						<div
							key={service.title}
							className="relative h-full w-full flex-[0_0_100%] min-w-0"
						>
							<Image
								src={service.imageSrc}
								alt={service.imageAlt}
								fill
								priority={index === 0}
								className="object-cover"
								sizes="100vw"
							/>
							<div className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/35 to-black/15 md:from-black/75 md:via-black/20 md:to-transparent" />

							<div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-4 pb-20 sm:px-6 sm:pb-24 md:px-8 lg:bottom-24 lg:left-1/2 lg:max-w-5xl lg:-translate-x-1/2 lg:px-6 lg:pb-0">
								<div className="max-w-xl rounded-3xl border border-white/8 bg-black/12 p-5 text-white backdrop-blur-[2px] sm:p-6 lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
									<p className="text-[11px] uppercase tracking-[0.24em] text-zinc-200 sm:text-xs md:text-sm">
										{service.title}
									</p>
									<h2 className="mt-2 text-2xl font-semibold leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
										{service.title}
									</h2>

									<p className="mt-3 max-w-md text-sm leading-6 text-zinc-200 sm:text-base">
										{service.description}
									</p>

									<div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 lg:mt-6">
										<button
											onClick={() => handleScrollToService(service.title)}
											className="pointer-events-auto inline-flex w-full items-center justify-center gap-2 rounded-full bg-yellow-400 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-yellow-500 sm:w-auto sm:px-6"
										>
											Подробнее
											<ArrowDown className="h-4 w-4" />
										</button>
										<button
											onClick={handleScrollToContact}
											className="pointer-events-auto inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/45 hover:bg-white/12 sm:w-auto sm:px-6"
										>
											Забронировать
										</button>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			<button
				className="absolute left-3 top-1/2 z-30 hidden -translate-y-1/2 rounded-full bg-white/20 p-2 transition-colors hover:bg-white/30 md:block"
				onClick={() => {
					emblaApi?.scrollPrev();
				}}
				aria-label="Previous slide"
			>
				<ChevronLeft className="h-6 w-6 text-white" />
			</button>

			<button
				className="absolute right-3 top-1/2 z-30 hidden -translate-y-1/2 rounded-full bg-white/20 p-2 transition-colors hover:bg-white/30 md:block"
				onClick={() => {
					emblaApi?.scrollNext();
				}}
				aria-label="Next slide"
			>
				<ChevronRight className="h-6 w-6 text-white" />
			</button>

			<div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 gap-2 sm:bottom-6 md:bottom-8">
				{services.map((_, index) => (
					<button
						key={index}
						onClick={() => handleDotClick(index)}
						className={`h-2 rounded-full transition-all ${
							index === current
								? "w-7 bg-white sm:w-8"
								: "w-2 bg-white/50 hover:bg-white/70"
						}`}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>
		</div>
	);
};

export default Carousel;

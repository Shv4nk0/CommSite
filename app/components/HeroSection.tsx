import Carousel from "./Carousel";

const HeroSection = () => {
	return (
		<section
			id="hero"
			className="relative flex h-[34rem] w-full items-center justify-center overflow-hidden sm:h-[38rem] lg:h-screen"
		>
			<Carousel />
		</section>
	);
};

export default HeroSection;

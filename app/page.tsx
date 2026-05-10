import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
	return (
		<div className="min-h-screen bg-[#fcfcfc] font-sans text-zinc-950">
			<Header
			// logo="Zakaznoy"
			// phone="+7 (999) 123-45-67"
			// email="info@zakaznoy.ru"
			// telegram="zakaznoy_support"
			/>

			<HeroSection />
			<ServicesSection />
			<ContactSection />
			<Footer />
		</div>
	);
}

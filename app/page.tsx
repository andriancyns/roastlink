import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SupplyTimeline from "@/components/SupplyTimeline";
import FarmerStats from "@/components/FarmerStats";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div id="top" className="flex min-h-[100dvh] flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <SupplyTimeline />
        <FarmerStats />
      </main>
      <Footer />
    </div>
  );
}

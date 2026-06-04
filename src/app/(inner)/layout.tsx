import Navbar from "@/components/Navbar";
import FooterSection from "@/components/sections/FooterSection";

export default function InnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="bg-black pt-32">
        {children}
      </main>
      <FooterSection />
    </>
  );
}

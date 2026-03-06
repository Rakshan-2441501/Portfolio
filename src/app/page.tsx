import CustomCursor from "@/components/ui/CustomCursor";
import HeroSection from "@/components/sections/HeroSection";
import WorkSection from "@/components/sections/WorkSection";
import InternshipSection from "@/components/sections/InternshipSection";
import EducationSection from "@/components/sections/EducationSection";
import InvolvementSection from "@/components/sections/InvolvementSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main className="relative min-h-screen selection:bg-white selection:text-black">
      {/* Hide default cursor and add custom one on non-touch devices via global class if needed, or inline */}
      <div className="hidden lg:block">
        <CustomCursor />
      </div>

      <nav className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center mix-blend-difference text-white">
        <a href="/" className="text-xl tracking-tighter font-bold">
          Portfolio
        </a>
        <ul className="flex gap-4 md:gap-8 text-xs md:text-sm tracking-widest font-mono">
          <li>
            <a href="#work" className="hover:opacity-60 transition-opacity">Work</a>
          </li>
          <li>
            <a href="#experience" className="hover:opacity-60 transition-opacity">Experience</a>
          </li>
          <li>
            <a href="#education" className="hover:opacity-60 transition-opacity">Education</a>
          </li>
          <li>
            <a href="#involvement" className="hover:opacity-60 transition-opacity">Involvement</a>
          </li>
          <li>
            <a href="#contact" className="hover:opacity-60 transition-opacity">Contact</a>
          </li>
        </ul>
      </nav>

      <HeroSection />
      <WorkSection />
      <InternshipSection />
      <EducationSection />
      <InvolvementSection />
      <ContactSection />
    </main>
  );
}

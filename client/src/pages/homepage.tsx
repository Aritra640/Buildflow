
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Sun, Moon } from "lucide-react";
import { ThemeAtom } from "../store/atoms/themeAtom";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [theme, setTheme] = useRecoilState(ThemeAtom);
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(theme === "Dark" ? "Bright" : "Dark");
  };

  return (
    <main
      className={`min-h-screen w-full flex flex-col items-center justify-center px-6 py-12 transition-colors duration-500 
        ${theme === "Dark" ? "bg-[#0a0a0a] text-white" : "bg-white text-gray-900"}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4">
          BuildFlow
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-8">
          Decentralized manufacturing and sourcing made seamless — from parts to full product assembly with milestone-based payments.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button onClick={()=>{navigate("/getstarted");}} className="text-lg px-6 py-3 flex items-center gap-2">
            <Sparkles size={20} /> Get Started
          </Button>
          <Button onClick={() => {navigate("/learnmore")}} variant="outline" className="text-lg px-6 py-3 flex items-center gap-2 font-semibold text-blue-600 border-blue-600 hover:bg-blue-50">
            Learn More <ArrowRight size={20} />
          </Button>
          <Button
            onClick={toggleTheme}
            variant="outline"
            className="text-lg px-6 py-3 flex items-center gap-2 font-semibold text-purple-600 border-purple-600 hover:bg-purple-50"
          >
            {theme === "Dark" ? <Sun size={20} /> : <Moon size={20} />} Toggle Theme
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl px-4"
      >
        {[
          {
            title: "Modular Sourcing",
            desc: "Source components or entire assemblies from verified vendors.",
          },
          {
            title: "Escrow Payments",
            desc: "Release funds only upon verified milestone completion.",
          },
          {
            title: "Open Collaboration",
            desc: "Work with manufacturers worldwide without trust concerns.",
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className={`rounded-2xl p-6 shadow-xl transition-transform duration-300 hover:-translate-y-1 ${
              theme === "Dark"
                ? "bg-[#161616] border border-gray-800"
                : "bg-gray-100 border border-gray-200"
            }`}
          >
            <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
            <p className="text-sm text-muted-foreground">{card.desc}</p>
          </div>
        ))}
      </motion.div>

      <footer className="mt-24 text-center text-sm opacity-50">
        © {new Date().getFullYear()} BuildFlow Inc. All rights reserved.
      </footer>
    </main>
  );
}

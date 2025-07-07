import { useRecoilState } from "recoil";
import { Sun, Moon } from "lucide-react";
import { ThemeAtom } from "../../store/atoms/themeAtom";

export default function SettingsPage() {
  const [theme, setTheme] = useRecoilState(ThemeAtom);

  const toggleTheme = () => {
    setTheme(theme === "Dark" ? "Bright" : "Dark");
  };

  return (
    <div
      className={`min-h-screen transition duration-500 px-6 py-12 md:px-24 ${
        theme === "Dark"
          ? "bg-gradient-to-br from-[#0b0b0b] via-[#1c1c1c] to-[#0a0a0a] text-white"
          : "bg-gradient-to-br from-white via-sky-50 to-sky-100 text-gray-900"
      }`}
    >
      <h1 className="text-4xl font-bold mb-8">⚙️ Settings</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Theme</h2>
        <div
          className={`flex items-center gap-4 p-6 rounded-xl w-fit border shadow ${
            theme === "Dark" ? "bg-[#1c1c1c] border-gray-800" : "bg-white border-gray-200"
          }`}
        >
          <span className="text-lg font-medium">
            Current: {theme === "Dark" ? "Dark" : "Bright"} Mode
          </span>
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 hover:scale-110 transition"
          >
            {theme === "Dark" ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Account</h2>
        <div
          className={`p-6 rounded-xl border shadow ${
            theme === "Dark" ? "bg-[#1c1c1c] border-gray-800" : "bg-white border-gray-200"
          }`}
        >
          <p className="mb-2">Username: <span className="font-medium">@username</span></p>
          <p className="mb-4">Email: <span className="font-medium">user@example.com</span></p>
          <button
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Delete Account
          </button>
        </div>
      </section>

      <footer className="text-center text-sm opacity-50 mt-24">
        © {new Date().getFullYear()} BuildFlow Technologies — All rights reserved
      </footer>
    </div>
  );
}


import { useRecoilState } from "recoil";
import { ThemeAtom } from "../store/atoms/themeAtom";
import {
  Sun,
  Moon,
  PlusCircle,
  Folder,
  LineChart,
  Settings,
  Home,
  Users,
  Blocks,
  ShieldCheck,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const [theme, setTheme] = useRecoilState(ThemeAtom);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(theme === "Dark" ? "Bright" : "Dark");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const navItems = [
    { icon: <Home size={20} />, label: "Overview" },
    { icon: <PlusCircle size={20} />, label: "Create Project" },
    { icon: <Folder size={20} />, label: "My Projects" },
    { icon: <LineChart size={20} />, label: "Track Projects" },
    { icon: <Blocks size={20} />, label: "Components" },
    { icon: <Users size={20} />, label: "Organizations" },
    { icon: <ShieldCheck size={20} />, label: "Security" },
    { icon: <Settings size={20} />, label: "Settings" }
  ];

  const products = [
    { name: "3D Printer Kit", status: "In Production" },
    { name: "CNC Router", status: "Delivered" },
    { name: "Solar Inverter", status: "Delayed" }
  ];

  return (
    <div
      className={`min-h-screen flex transition duration-500 ${
        theme === "Dark"
          ? "bg-gradient-to-br from-[#0b0b0b] via-[#1c1c1c] to-[#0a0a0a] text-white"
          : "bg-gradient-to-br from-white via-sky-50 to-sky-100 text-gray-900"
      }`}
    >
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-30 bg-black bg-opacity-40 backdrop-blur-sm md:hidden"
        ></div>
      )}

      {/* Sidebar for large screens */}
      <aside
        className={`hidden md:flex flex-col w-64 h-full fixed top-0 left-0 z-40 shadow-xl p-6 ${
          theme === "Dark" ? "bg-[#111111]" : "bg-gray-100"
        }`}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">BuildFlow</h2>
          <button onClick={toggleTheme}>{theme === "Dark" ? <Sun size={18} /> : <Moon size={18} />}</button>
        </div>
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold text-xl">
            B
          </div>
          <p className="font-semibold mt-2">@username</p>
        </div>
        <nav className="space-y-3">
          {navItems.map((item, i) => (
            <button
              onClick={()=>{

                if(item.label == "Settings") {
                  navigate("/settings");
                }

                else if(item.label == "Track Projects") {
                  navigate("/track");
                }
              }}
              key={i}
              className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition ${
                theme === "Dark" ? "hover:bg-[#1e1e1e]" : "hover:bg-gray-200"
              }`}
            >
              {item.icon} <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Sidebar for mobile */}
      <aside
        className={`fixed z-50 top-0 left-0 h-full w-64 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${
          theme === "Dark" ? "bg-[#111111]" : "bg-gray-100"
        } shadow-xl p-6 md:hidden`}
      >
        <button
          onClick={closeSidebar}
          className="absolute top-4 right-4"
        >
          <X size={20} />
        </button>
        <div className="mt-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold text-xl">
            B
          </div>
          <p className="font-semibold mt-2">@username</p>
        </div>
        <nav className="mt-8 space-y-3">
          {navItems.map((item, i) => (
            <button
              key={i}
              className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition ${
                theme === "Dark" ? "hover:bg-[#1e1e1e]" : "hover:bg-gray-200"
              }`}
            >
              {item.icon} <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 px-6 md:px-8 py-10 md:ml-64">
        <div className="md:hidden flex justify-between items-center mb-6">
          <button onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
        </div>

        <section className="mb-10">
          <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
            🚀 BuildFlow Dashboard
          </h1>
          <p className="text-xl leading-relaxed mb-4 font-medium">
            Build your products smarter with decentralized manufacturing. Globally connected. Milestone protected.
          </p>
          <div
            className={`rounded-2xl p-6 mt-6 border shadow-2xl ${
              theme === "Dark" ? "bg-[#1c1c1c] border-purple-500" : "bg-white border-purple-200"
            }`}
          >
            <h2 className="text-2xl font-bold mb-2">✨ Why BuildFlow?</h2>
            <ul className="list-disc pl-6 text-base space-y-1">
              <li>Trustless payments using milestone smart contracts</li>
              <li>Track parts from multiple verified suppliers</li>
              <li>Real-time project updates & collaboration tools</li>
              <li>Globally decentralized — source from anywhere</li>
            </ul>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-bold mb-6">📦 Current Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((product, i) => {
              const progress =
                product.status === "Delivered"
                  ? "100%"
                  : product.status === "In Production"
                  ? "50%"
                  : "25%";

              const progressColor =
                product.status === "Delivered"
                  ? "bg-green-500"
                  : product.status === "In Production"
                  ? "bg-yellow-500"
                  : "bg-red-500";

              return (
                <div
                  key={i}
                  className={`p-6 rounded-xl shadow-lg border ${
                    theme === "Dark" ? "bg-[#1a1a1a] border-purple-600" : "bg-white border-purple-300"
                  } hover:scale-105 transition-transform duration-300`}
                >
                  <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
                  <p className="text-sm opacity-80 mb-1">
                    Status: <span className="font-semibold text-purple-500">{product.status}</span>
                  </p>
                  <div className="w-full h-2 bg-gray-300 rounded-full mt-2 overflow-hidden">
                    <div
                      className={`h-full ${progressColor}`}
                      style={{ width: progress }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <footer className="mt-20 text-center text-sm opacity-50">
          © {new Date().getFullYear()} BuildFlow Technologies — Powering Global Makers
        </footer>
      </main>
    </div>
  );
}


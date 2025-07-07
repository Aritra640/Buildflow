import { useRecoilState } from "recoil";
import { motion } from "framer-motion";
import {
  Truck,
  CheckCircle,
  Wrench,
  Calendar,
  DollarSign,
  ShieldCheck,
  Sun,
  Moon,
  Rocket,
  LayoutDashboard
} from "lucide-react";
import { ThemeAtom } from "../../store/atoms/themeAtom";

const projects = [
  {
    name: "3D Printer Kit",
    status: "In Production",
    eta: "2025-08-10",
    milestones: 3,
    totalMilestones: 5,
    location: "Shenzhen, China",
    manager: "Alice Wu",
    paymentStatus: "Partial",
    securityLevel: "Verified"
  },
  {
    name: "CNC Router",
    status: "Delivered",
    eta: "2025-06-12",
    milestones: 5,
    totalMilestones: 5,
    location: "Berlin, Germany",
    manager: "David Schmidt",
    paymentStatus: "Completed",
    securityLevel: "Verified"
  },
  {
    name: "Solar Inverter",
    status: "Delayed",
    eta: "2025-08-25",
    milestones: 2,
    totalMilestones: 6,
    location: "Pune, India",
    manager: "Sneha Rao",
    paymentStatus: "Pending",
    securityLevel: "Unverified"
  }
];

export default function TrackProjectsPage() {
  const [theme, setTheme] = useRecoilState(ThemeAtom);

  return (
    <main
      className={`min-h-screen px-6 py-12 transition-colors duration-500 ${
        theme === "Dark"
          ? "bg-[#0b0b0b] text-white"
          : "bg-white text-gray-900"
      }`}
    >
      <div className="flex justify-between items-center mb-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text"
        >
          📊 Project Tracking Center
        </motion.h1>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-800">
            <Rocket size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-800">
            <LayoutDashboard size={20} />
          </button>
          <button
            onClick={() => setTheme(theme === "Dark" ? "Bright" : "Dark")}
            className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-800"
          >
            {theme === "Dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {projects.map((project, idx) => {
          const progress = (project.milestones / project.totalMilestones) * 100;
          const progressColor =
            project.status === "Delivered"
              ? "bg-green-500"
              : project.status === "In Production"
              ? "bg-yellow-500"
              : "bg-red-500";

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`rounded-2xl p-8 shadow-2xl border space-y-6 hover:scale-[1.02] transition-transform duration-300 ${
                theme === "Dark" ? "bg-[#1a1a1a] border-purple-600" : "bg-white border-purple-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">{project.name}</h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    project.status === "Delivered"
                      ? "bg-green-200 text-green-800"
                      : project.status === "In Production"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {project.status}
                </span>
              </div>

              <div className="space-y-2 text-base">
                <p className="flex items-center gap-2"><Calendar size={18} /> ETA: {project.eta}</p>
                <p className="flex items-center gap-2"><Wrench size={18} /> Milestones: {project.milestones}/{project.totalMilestones}</p>
                <p className="flex items-center gap-2"><Truck size={18} /> Location: {project.location}</p>
                <p className="flex items-center gap-2"><CheckCircle size={18} /> Manager: {project.manager}</p>
                <p className="flex items-center gap-2"><DollarSign size={18} /> Payment: {project.paymentStatus}</p>
                <p className="flex items-center gap-2"><ShieldCheck size={18} /> Security: {project.securityLevel}</p>
              </div>

              <div className="mt-4">
                <p className="text-sm mb-1 font-medium opacity-80">Progress</p>
                <div className="w-full h-3 bg-gray-300 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${progressColor}`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </main>
  );
}


import { useRecoilState } from "recoil";
import { ThemeAtom } from "../store/atoms/themeAtom";
import { Sun, Moon } from "lucide-react";

export default function LearnMorePage() {
  const [theme, setTheme] = useRecoilState(ThemeAtom);

  const toggleTheme = () => {
    setTheme(theme === "Dark" ? "Bright" : "Dark");
  };

  const slides = [
    {
      title: "What is BuildFlow?",
      content:
        "BuildFlow is a decentralized platform designed to streamline global manufacturing. It lets users source parts, coordinate multiple suppliers, manage timelines, and securely track deliveries using smart contracts."
    },
    {
      title: "Why Decentralized Manufacturing?",
      content:
        "Traditional supply chains rely on trust, middlemen, and static contracts. With BuildFlow, every step is transparent, enforceable, and programmable — enabling fair collaboration with global partners."
    },
    {
      title: "How Escrow Payments Work",
      content:
        "Every manufacturing milestone is associated with an escrow release. Smart contracts guarantee that funds are only released when conditions are met, ensuring fairness and accountability."
    },
    {
      title: "Workflow & Project Management",
      content:
        "Manufacturers can split projects into stages — design, prototyping, testing, production. BuildFlow supports milestone planning, document uploads, messaging, and status tracking."
    },
    {
      title: "Integrations with Web3",
      content:
        "Connect wallets like MetaMask, use on-chain identity, integrate with IPFS for document storage, and log all project activity immutably."
    },
    {
      title: "Developer Platform",
      content:
        "RESTful APIs, GraphQL endpoints, and Webhook events enable full customization and automation. Third-party services can plug into your workflow."
    },
    {
      title: "Reputation & Auditing",
      content:
        "Each party earns a verifiable reputation based on deliveries, dispute resolution, and feedback. BuildFlow tracks project logs to enable external audits."
    },
    {
      title: "Get Involved",
      content:
        "Contribute as a manufacturer, project validator, logistics provider, or even build plugins. Help scale a new open manufacturing economy."
    },
  ];

  return (
    <main
      className={`min-h-screen w-full px-6 py-12 transition-colors duration-500 
        ${theme === "Dark" ? "bg-[#0a0a0a] text-white" : "bg-white text-gray-900"}`}
    >
      <div className="flex justify-end max-w-5xl mx-auto mb-4">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 text-sm border px-3 py-2 rounded-lg hover:bg-opacity-10 transition"
        >
          {theme === "Dark" ? <Sun size={16} /> : <Moon size={16} />} Toggle Theme
        </button>
      </div>

      <section className="max-w-5xl mx-auto mb-16">
        <h1 className="text-5xl font-bold mb-6">📘 BuildFlow Documentation</h1>
        <p className="mb-6 text-xl leading-relaxed">
          BuildFlow enables a decentralized approach to manufacturing — from modular sourcing to secure payments and milestone tracking. It's designed for global collaboration with trustless guarantees.
        </p>
        <ul className="list-disc list-inside space-y-2 text-base">
          <li><strong>Getting Started:</strong> How to set up your first project</li>
          <li><strong>Suppliers:</strong> Discover, verify, and rate manufacturers</li>
          <li><strong>Contracts:</strong> Build milestone-based smart contracts</li>
          <li><strong>Payments:</strong> Wallet integrations and on-chain auditing</li>
          <li><strong>APIs:</strong> Automate your workflow with REST or GraphQL</li>
        </ul>
      </section>

      <section className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-semibold mb-6">🖼️ Product Overview Slides</h2>
        <div className="space-y-10">
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className={`rounded-xl p-8 shadow-md transition-all duration-300 border-l-4 ${
                theme === "Dark"
                  ? "bg-[#161616] border-purple-500"
                  : "bg-gray-100 border-purple-600"
              }`}
            >
              <h3 className="text-3xl font-bold mb-3">{slide.title}</h3>
              <p className="text-lg leading-relaxed text-justify">{slide.content}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

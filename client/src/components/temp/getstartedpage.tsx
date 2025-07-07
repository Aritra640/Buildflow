import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ThemeAtom } from "../../store/atoms/themeAtom";
import { curuserAtom } from "../../store/atoms/curuserAtom";
import { curemailAtom } from "../../store/atoms/curemailAtom";
import { useNavigate } from "react-router-dom";

export function UserFormPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const theme = useRecoilValue(ThemeAtom);
  const navigate = useNavigate();

  const nameset = useSetRecoilState(curuserAtom);
  const emailset = useSetRecoilState(curemailAtom);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Set values in Recoil
    nameset(name);
    emailset(email);

    // Optional: Send to backend
    try {
      const res = await fetch(
        `http://localhost:8080/sendmail?username=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`
      );
      if (!res.ok) throw new Error("Failed to send mail");
      console.log("Mail sent");
    } catch (err) {
      console.error(err);
    }

    // Redirect
    navigate("/wishlist");
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-6 py-12 transition-colors duration-500 ${
        theme === "Dark"
          ? "bg-[#0b0b0b] text-white"
          : "bg-gradient-to-r from-indigo-200 to-purple-300 text-gray-900"
      }`}
    >
      <div
        className={`rounded-xl shadow-2xl p-8 max-w-md w-full ${
          theme === "Dark" ? "bg-[#1e1e1e] text-white" : "bg-white text-gray-900"
        }`}
      >
        <h1 className="text-3xl font-bold mb-6 text-center">User Information</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`mt-1 block w-full rounded-md border shadow-sm px-4 py-2 focus:outline-none focus:ring-2 ${
                theme === "Dark"
                  ? "bg-[#2a2a2a] border-gray-600 focus:ring-pink-500"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 block w-full rounded-md border shadow-sm px-4 py-2 focus:outline-none focus:ring-2 ${
                theme === "Dark"
                  ? "bg-[#2a2a2a] border-gray-600 focus:ring-pink-500"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full font-bold py-2 rounded-md transition ${
              theme === "Dark"
                ? "bg-pink-600 hover:bg-pink-700 text-white"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}


import { useRecoilState } from "recoil";
import { curuserAtom } from "../../store/atoms/curuserAtom";
import { curemailAtom } from "../../store/atoms/curemailAtom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import axios from "axios";

export function WatchListPage() {
  const [user] = useRecoilState(curuserAtom);
  const [email] = useRecoilState(curemailAtom);
  const navigate = useNavigate();

  useEffect(() => {
    // if (user && email) {
    //   axios
    //     .post("http://localhost:8080/sendmail", {
    //       username: user,
    //       useremail: email,
    //     })
    //     .then((res) => console.log("Mail sent successfully", res.data))
    //     .catch((err) => console.error("Error sending mail", err));
    // }
    document.title = "BuildFlow - WatchList";
  }, [user,email]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16 bg-gradient-to-br from-[#0b0b0b] via-[#1c1c1c] to-[#0a0a0a] text-white text-center">
      <div className="max-w-xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-pink-500">
          🚧 Feature Coming Soon!
        </h1>
        <p className="text-lg sm:text-xl mb-4">
          Hello <span className="font-semibold">{user}</span>, thank you for
          your interest.
        </p>
        <p className="text-base mb-6">
          The WatchList feature is currently under development. We'll notify you
          at <span className="font-semibold">{email}</span> when it's ready to
          use.
        </p>
        <p className="text-base mb-6">
          Meanwhile, you can check out the live demo to explore how BuildFlow
          empowers global manufacturing.
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-4 inline-block px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg shadow-md transition"
        >
          🔍 View Demo Dashboard
        </button>
      </div>
    </div>
  );
}

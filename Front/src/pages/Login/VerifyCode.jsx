import React from "react";
import { useState } from "react";
import ArrowSVG from "../../assets/SVG/ArrowSVG";
import { useNavigate } from "react-router-dom";

export default function VerifyCode() {
  const email = localStorage.getItem("email");
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleBackCLick = () => {
    navigate("/login/sendcode/");
  };

  const isFormValid = () => {
    return code;
  };

  const verifyCode = async () => {
    const response = await fetch("http://localhost:8000/verify/email_code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        code,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Code verified");
      localStorage.setItem("access_token", data.access_token);
      navigate("/login/newpwd");
    } else {
      console.error("Invalid code");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          verifyCode();
        }}
        className="flex flex-col relative items-center w-full sm:max-w-[500px] space-y-3 border border-black/15 shadow-2xl px-20 py-9 rounded-3xl -mt-24"
      >
        <button
          type="button"
          onClick={handleBackCLick}
          className="absolute left-10 flex gap-1 justify-center items-center"
        >
          <ArrowSVG degree={90} /> Back
        </button>
        <span className="text-2xl font-medium pb-8 pt-4">Verify code</span>
        <input
          required
          type="text"
          name="code"
          placeholder="Code"
          className="input-reset w-full h-[50px] rounded-full p-4"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button
          type="submit"
          className={`w-full h-[50px] rounded-full p-4 text-white text-center shadow-lg ${
            isFormValid()
              ? "bg-green-500 active:bg-green-500"
              : "bg-green-500 cursor-not-allowed"
          }`}
          disabled={!isFormValid()}
        >
          Verify
        </button>
      </form>
    </div>
  );
}

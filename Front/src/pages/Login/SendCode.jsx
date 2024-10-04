import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowSVG from "../../assets/SVG/ArrowSVG";
import { useState } from "react";

export default function SendCode() {
  const [email, setEmail] = useState("");
  const [, setErrors] = useState({});
  const navigate = useNavigate();

  const sendResetPwdEmail = async () => {
    const response = await fetch("http://localhost:8000/reset/password/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    if (response.ok) {
      console.log("Email sent");
      localStorage.setItem("email", email);
      navigate("/login/verifycode");
    } else {
      console.error("Email not sent");
    }
  };

  const handleInvalid = (e) => {
    e.preventDefault();
    const { name, validationMessage } = e.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: validationMessage }));
  };

  const handleInput = (e) => {
    const { name } = e.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const isFormValid = () => {
    return email;
  };

  const handleBackCLick = () => {
    navigate("/login/");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendResetPwdEmail();
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
        <span className="text-2xl font-medium pb-8 pt-6">Send Code</span>
        <input
          required
          type="email"
          name="email"
          placeholder="Email"
          className="input-reset w-full h-[50px] rounded-full p-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onInvalid={handleInvalid}
          onInput={handleInput}
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
          Send
        </button>
      </form>
    </div>
  );
}

import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowSVG from "../../assets/SVG/ArrowSVG";
import { useState } from "react";
import Spinner from "../../components/Spinner";

export default function SendCode() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const sendResetPwdEmail = async () => {
    setIsLoading(true);

    setTimeout(async () => {
      const response = await fetch("http://localhost:8000/reset/password/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      setIsLoading(false);

      if (response.status === 400) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Account with such email does not exist",
        }));
        return;
      }

      if (response.ok) {
        console.log("Email sent");
        localStorage.setItem("email", email);
        navigate("/login/verifycode");
      } else {
        console.error("Email not sent");
      }
    }, 1000);
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

  const handleBackCLick = () => {
    navigate("/login/");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        action="POST"
        className={`relative flex flex-col items-center w-full sm:max-w-[500px] space-y-3 border border-black/15 shadow-2xl px-20 py-9 rounded-3xl -mt-24 ${
          isLoading ? "opacity-100" : ""
        }`}
        onSubmit={(e) => {
          e.preventDefault();
          sendResetPwdEmail();
        }}
      >
        {isLoading && (
          <div className="absolute z-50 inset-0 m-auto flex shadow-xl justify-center items-center bg-white/70 rounded-3xl ">
            <Spinner></Spinner>
          </div>
        )}
        <button
          type="button"
          onClick={handleBackCLick}
          className="absolute left-10 flex gap-1 justify-center items-center"
        >
          <ArrowSVG degree={90} /> Back
        </button>
        <span className="text-2xl font-medium pb-8 pt-6">Type Email</span>
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
        {errors.email && (
          <span className="text-red-500 px-5 text-left w-full">
            {errors.email}
          </span>
        )}
        <button
          type="submit"
          className={` shadow-xl active:shadow-none btn-primary w-full h-[50px] rounded-full p-4 text-white bg-green-500`}
        >
          Send
        </button>
      </form>
    </div>
  );
}

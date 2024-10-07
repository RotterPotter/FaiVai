import React from "react";
import { useState, useEffect } from "react";
import ArrowSVG from "../../assets/SVG/ArrowSVG";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";

export default function VerifyCode() {
  const email = localStorage.getItem("email");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const sendCodeAgain = async () => {
    setIsLoading(true);
    await fetch("http://localhost:8000/reset/password/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });
    setIsLoading(false);
    setTimer(30);
  };

  const handleBackCLick = () => {
    navigate("/login/");
  };

  const handleInvalid = (e) => {
    e.preventDefault();
    const { name, validationMessage } = e.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: validationMessage }));
  };

  const verifyCode = async () => {
    setIsLoading(true);

    setTimeout(async () => {
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
      setIsLoading(false);

      if (response.status === 406) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          code: "Invalid code",
        }));
        return;
      }

      if (response.ok) {
        const data = await response.json();
        console.log("Code verified");
        localStorage.setItem("access_token", data.access_token);
        navigate("/login/newpwd");
      } else {
        console.error("Invalid code");
      }
    }, 1000); // 1000 milliseconds = 1 second
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
          verifyCode();
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
        <span className="text-2xl font-medium pb-8 pt-4">Verify code</span>
        <input
          required
          type="text"
          name="code"
          placeholder="Code"
          className="input-reset w-full h-[50px] rounded-full p-4"
          value={code}
          onInvalid={handleInvalid}
          onChange={(e) => setCode(e.target.value)}
        />
        {errors.code && (
          <span className="text-red-500 px-5 text-left w-full">
            {errors.code}
          </span>
        )}
        <div className="flex w-full justify-end gap-5 px-5">
          <button
            type="button"
            onClick={sendCodeAgain}
            disabled={timer > 0}
            className={`${timer > 0 ? "text-black/30" : "text-black"}`}
          >
            Send code again
          </button>
          {timer > 0 && (
            <span className={`${timer > 0 ? "text-black/30" : "text-white"}`}>
              {timer}
            </span>
          )}
        </div>

        <button
          type="sumbit"
          className={` shadow-xl active:shadow-none btn-primary w-full h-[50px] rounded-full p-4 text-white bg-green-500`}
          // disabled={!isFormValid()}
        >
          Verify
        </button>
      </form>
    </div>
  );
}

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Spinner from "../../components/Spinner";
import EyeSVG from "../../assets/SVG/EyeSVG";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [token, setToken] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const passwordInputRef = useRef(null);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();
  const [isEmailNotVerified, setIsEmailNotVerified] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const login = async () => {
    setIsLoading(true);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "password",
        username: email,
        password: password,
        scope: "",
        client_id: "",
        client_secret: "",
      }),
    };

    const response = await fetch("http://localhost:8000/token", requestOptions);

    console.log(response.status);
    if (response.status === 401) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Incorrect username or password",
      }));
      setIsLoading(false);
      return;
    }

    if (response.status === 423) {
      setIsEmailNotVerified(true);
      setTimer(0); // Reset the timer
      setIsLoading(false);
      return;
    }

    if (response.ok) {
      const data = await response.json();
      setToken(data.access_token);
      navigate("/");
    } else {
      const errorData = await response.json();
      console.error("Login failed", errorData);
    }

    setIsLoading(false);
  };

  const sendVerifyEmail = async () => {
    setIsLoading(true);

    const response = await fetch("http://localhost:8000/verify/email/get", {
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
    } else {
      console.error("Email not sent");
    }

    setTimer(30);
    setIsLoading(false);
  };

  const handleResetClick = () => {
    navigate("/login/sendcode");
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
    return email && password;
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
          login();
        }}
      >
        {isLoading && (
          <div className="absolute z-50 inset-0 m-auto flex shadow-xl justify-center items-center bg-white/70 rounded-3xl ">
            <Spinner></Spinner>
          </div>
        )}
        <span className="text-2xl font-medium pb-8">Login</span>

        <div className="w-full">
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
            <span className="text-red-500 px-5">{errors.email}</span>
          )}
        </div>
        <div className="w-full">
          <div className="w-full relative">
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="input-reset w-full h-[50px] rounded-full p-4"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onInvalid={handleInvalid}
              onInput={handleInput}
              ref={passwordInputRef}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-3 flex items-center"
              onClick={() => {
                setShowPassword(!showPassword);
                setTimeout(() => {
                  const input = passwordInputRef.current;
                  input.focus();
                  const length = input.value.length;
                  input.setSelectionRange(length, length); // Set cursor position to the end
                }, 0);
              }}
            >
              <EyeSVG show={showPassword} />
            </button>
          </div>
          {errors.password && (
            <span className="text-red-500 px-5">{errors.password}</span>
          )}
        </div>
        {isEmailNotVerified && (
          <div className="flex w-full justify-end gap-5 px-5">
            <button
              type="button"
              onClick={sendVerifyEmail}
              disabled={timer > 0}
              className={`${timer > 0 ? "text-black/30" : "text-black"}`}
            >
              Send code again
            </button>
            {timer > 0 && <span>{timer}</span>}
          </div>
        )}

        <button
          type="submit"
          className={` shadow-xl active:shadow-none btn-primary w-full h-[50px] rounded-full p-4 text-white bg-green-500`}
          // disabled={!isFormValid()}
        >
          Login
        </button>
        <div className="flex flex-col text-left pt-2 gap-1">
          <span className="">
            Haven't got any account?{" "}
            <Link to={"/signup"} className="text-green-500">
              Sign up
            </Link>
          </span>
          <span className="">
            Forgot your password?{" "}
            <button
              type="button"
              onClick={handleResetClick}
              className="text-green-500"
            >
              Reset
            </button>
          </span>
        </div>
      </form>
    </div>
  );
}

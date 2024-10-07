import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import EyeSVG from "../assets/SVG/EyeSVG";

export default function SignUp() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoadng] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);
  const navigate = useNavigate();

  const register = async () => {
    if (!isPasswordStrong(password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password:
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
      }));
      return;
    }

    setIsLoadng(true);

    try {
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
          confirm_password: confirmPassword,
        }),
      });

      if (response.status === 409) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Email already exists",
        }));
        return;
      }

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();
      console.log("Success:", data);
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoadng(false);
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

  const isPasswordStrong = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  };

  const isFormValid = () => {
    return (
      firstname &&
      lastname &&
      email &&
      password &&
      confirmPassword &&
      password === confirmPassword &&
      isPasswordStrong(password)
    );
  };

  const passwordsMatch = password === confirmPassword;

  return (
    <div className=" flex justify-center items-center h-screen">
      <form
        action="POST"
        className={`relative flex flex-col items-center w-full sm:max-w-[500px] space-y-3 border border-black/15 shadow-2xl px-20 py-9 rounded-3xl -mt-24 ${
          isLoading ? "opacity-100" : ""
        }`}
        onSubmit={(e) => {
          e.preventDefault();
          register();
        }}
      >
        {isLoading && (
          <div className="absolute inset-0 m-auto flex shadow-xl justify-center items-center bg-white/70 rounded-3xl ">
            <Spinner></Spinner>
          </div>
        )}
        <span className="text-2xl font-medium mb-4">Sign Up</span>
        <div className="w-full">
          <input
            required
            type="text"
            name="firstname"
            placeholder="First Name"
            className="input-reset w-full h-[50px] rounded-full p-4"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            onInvalid={handleInvalid}
            onInput={handleInput}
          />
          {errors.firstname && (
            <span className="text-red-500">{errors.firstname}</span>
          )}
        </div>
        <div className="w-full">
          <input
            required
            type="text"
            name="lastname"
            placeholder="Last Name"
            className="input-reset w-full h-[50px] rounded-full p-4"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            onInvalid={handleInvalid}
            onInput={handleInput}
          />
          {errors.lastname && (
            <span className="text-red-500">{errors.lastname}</span>
          )}
        </div>
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
          {errors.email && <span className="text-red-500">{errors.email}</span>}
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
            <span className="text-red-500">{errors.password}</span>
          )}
        </div>
        <div className="w-full">
          <div className="w-full relative">
            <input
              required
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              className="input-reset w-full h-[50px] rounded-full p-4"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onInvalid={handleInvalid}
              onInput={handleInput}
              ref={confirmPasswordInputRef}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-3 flex items-center"
              onClick={() => {
                setShowPassword(!showPassword);
                setTimeout(() => {
                  const input = confirmPasswordInputRef.current;
                  input.focus();
                  const length = input.value.length;
                  input.setSelectionRange(length, length); // Set cursor position to the end
                }, 0);
              }}
            >
              <EyeSVG show={showPassword} />
            </button>
          </div>

          {errors.confirmPassword && (
            <span className="text-red-500">{errors.confirmPassword}</span>
          )}
          {!passwordsMatch && (
            <span className="text-red-500">Passwords do not match</span>
          )}
        </div>
        <button
          type="submit"
          className={` shadow-xl active:shadow-none btn-primary w-full h-[50px] rounded-full p-4 text-white bg-green-500`}
          // disabled={!isFormValid()}
        >
          Register
        </button>
        <span className="pt-2">
          Already have an account?{" "}
          <Link to={"/login"} className="text-green-500">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
}

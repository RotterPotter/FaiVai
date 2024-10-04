import React from "react";
import { useState } from "react";
import ArrowSVG from "../../assets/SVG/ArrowSVG";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isTypingPassword, setIsTypingPassword] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const email = localStorage.getItem("email");

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
    return password && confirmPassword && isPasswordStrong(password);
  };

  const handleBackCLick = () => {
    navigate("/login/verifycode");
  };

  const passwordsMatch = password === confirmPassword;

  const setNewPassword = async () => {
    const response = await fetch(
      `http://localhost:8000/reset/password/update?token=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    if (response.ok) {
      console.log("Set new password");
      navigate("/login");
      localStorage.clear();
    } else {
      console.error("Error");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        action="POST"
        className="flex flex-col relative items-center w-full sm:max-w-[500px] space-y-3 border border-black/15 shadow-2xl px-20 py-9 rounded-3xl -mt-24"
        onSubmit={(e) => {
          e.preventDefault();
          setNewPassword();
        }}
      >
        <button
          type="button"
          onClick={handleBackCLick}
          className="absolute left-10 flex gap-1 justify-center items-center"
        >
          <ArrowSVG degree={90} /> Back
        </button>
        <span className="text-2xl font-medium mb-4">New Password</span>
        <div className="w-full">
          <input
            required
            type="password"
            name="password"
            placeholder="Password"
            className="input-reset w-full h-[50px] rounded-full p-4"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setIsTypingPassword(true);
            }}
            onBlur={() => setIsTypingPassword(false)}
            onInvalid={handleInvalid}
            onInput={handleInput}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password}</span>
          )}
          {!isPasswordStrong(password) && isTypingPassword && (
            <span className="text-red-500">
              Password must be at least 8 characters long and include uppercase,
              lowercase, number, and special character.
            </span>
          )}
        </div>
        <div className="w-full">
          <input
            required
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="input-reset w-full h-[50px] rounded-full p-4"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onInvalid={handleInvalid}
            onInput={handleInput}
          />
          {errors.confirmPassword && (
            <span className="text-red-500">{errors.confirmPassword}</span>
          )}
          {!passwordsMatch && (
            <span className="text-red-500">Passwords do not match</span>
          )}
        </div>
        <button
          type="submit"
          className={`btn-primary w-full h-[50px] rounded-full p-4 text-white ${
            isFormValid() ? "bg-green-500" : "bg-green-500 cursor-not-allowed"
          }`}
          disabled={!isFormValid()}
        >
          Save
        </button>
      </form>
    </div>
  );
}

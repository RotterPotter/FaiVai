import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isTypingPassword, setIsTypingPassword] = useState(false);
  const navigate = useNavigate();

  const register = async () => {
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
    <div className="flex justify-center items-center h-screen">
      <form
        action="POST"
        className="flex flex-col items-center w-full sm:max-w-[500px] space-y-3 border border-black/15 shadow-2xl px-20 py-9 rounded-3xl -mt-24"
        onSubmit={(e) => {
          e.preventDefault();
          register();
        }}
      >
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

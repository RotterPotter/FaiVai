import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import React, { useState, useContext } from "react";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [token, setToken] = useContext(UserContext);
  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState({});

  const login = async () => {
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

    setResponse(response);

    if (response.ok) {
      const data = await response.json();
      setToken(data.access_token);
      console.log(token);
      navigate("/");
    } else {
      const errorData = await response.json();
      console.error("Login failed", errorData);
    }
  };

  const handleVerifyCLick = async () => {
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
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}
        className="flex flex-col items-center w-full sm:max-w-[500px] space-y-3 border border-black/15 shadow-2xl px-20 py-9 rounded-3xl -mt-24"
      >
        <span className="text-2xl font-medium mb-4">Login</span>
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
          {response.status === 423 && (
            <div className="flex justify-between w-[300px] px-5 pt-1 ">
              <span className="text-red-500">Email not verified</span>
              <button type="button" onClick={handleVerifyCLick}>
                Send email
              </button>
            </div>
          )}
        </div>
        <div className="w-full">
          <input
            required
            type="password"
            name="password"
            placeholder="Password"
            className="input-reset w-full h-[50px] rounded-full p-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onInvalid={handleInvalid}
            onInput={handleInput}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password}</span>
          )}
        </div>
        <button
          type="submit"
          className={`w-full h-[50px] rounded-full p-4 text-white text-center shadow-lg ${
            isFormValid()
              ? "bg-green-500 active:bg-green-500"
              : "bg-green-500 cursor-not-allowed"
          }`}
          disabled={!isFormValid()}
        >
          Login
        </button>
        <span className="pt-2">
          Haven't got any account?{" "}
          <Link to={"/signup"} className="text-green-500">
            Sign up
          </Link>
        </span>
      </form>
    </div>
  );
}
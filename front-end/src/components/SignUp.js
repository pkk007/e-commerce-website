import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //if signup/login already then block signup button
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const collectData = async () => {
    console.warn(name, email, password);
    let result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    localStorage.setItem("user", JSON.stringify(result.result)); //for login purpose and make a key named user
    localStorage.setItem("token", JSON.stringify(result.auth));
    navigate("/");
  };

  return (
    <div>
      <div className="register">
        <h1>Register</h1>
        <input
          className="inputBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="enter your name"
        />
        <input
          className="inputBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="enter your email"
        />
        <input
          className="inputBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="enter your password"
        />
        <button className="appButton" onClick={collectData} type="button">
          SignUp
        </button>
      </div>
    </div>
  );
};

export default SignUp;

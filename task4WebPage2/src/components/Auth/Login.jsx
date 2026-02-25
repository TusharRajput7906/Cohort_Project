import React from "react";
import { useState } from "react";
const Login = ({handleLogin}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function formSubmit(e) {
    e.preventDefault();
    handleLogin(email,password);
    setEmail("");
    setPassword("");
  }
  return (
    <div className="h-screen flex items-center justify-center">
      <form
        onSubmit={(e) => {
          formSubmit(e);
        }}
        className="h-75 w-90 bg-gray-200 border-green-500 border-2 flex flex-col items-center justify-center gap-4"
      >
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
          className="px-4 py-1 border-2 rounded-3xl  text-xl"
          type="email"
          value={email}
          placeholder="Enter your Email"
        />
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
          className="px-4 py-1 border-2 rounded-3xl  text-xl"
          type="password"
          value={password}
          placeholder="Enter password"
        />
        <button className="bg-green-800 active:scale-97 px-27 py-1.5 rounded-2xl">
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;

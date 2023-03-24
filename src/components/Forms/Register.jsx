import Cookies from "js-cookie";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../tools/useFetch";

export default function SignUp() {
  const [form, setForm] = useState({
    user: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setForm({
      ...form,
      user: {
        ...form.user,
        [e.target.id]: e.target.value,
      },
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const sendData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    };

    const data = await useFetch(
      " http://localhost:3000/users",
      sendData
    );
    const token = await data.token;

    Cookies.set("user_token", token);

    navigate("/");
  }

  return (
    <>
      <h1>S'inscrire</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" id="email" onChange={handleChange} />

        <label>Password</label>
        <input type="password" id="password" onChange={handleChange} />

        <button type="submit">S'inscrire</button>
      </form>
    </>
  );
}

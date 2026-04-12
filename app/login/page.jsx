"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const login = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      alert("Login Success");
      router.push("/dashboard");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen text-white bg-black">
      <div className="p-6 border rounded-xl w-96">
        <h1 className="mb-4 text-2xl">Login</h1>

        <input
          placeholder="Email"
          className="w-full p-2 mb-2 bg-gray-900"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Password"
          type="password"
          className="w-full p-2 mb-2 bg-gray-900"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button onClick={login} className="w-full p-2 bg-green-500 rounded">
          Login
        </button>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const register = async () => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Account created");
      router.push("/login");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen text-white bg-black">
      <div className="p-6 border rounded-xl w-96">
        <h1 className="mb-4 text-2xl">Register</h1>

        <input
          placeholder="Name"
          className="w-full p-2 mb-2 bg-gray-900"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

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

        <button
          onClick={register}
          className="w-full p-2 bg-blue-500 rounded"
        >
          Create Account
        </button>
      </div>
    </div>
  );
}
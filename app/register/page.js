"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    aadhaar: "",
    password: "",
  });

  const register = async () => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
      "Content-Type": "application/json", // 🔥 ADD THIS
    },
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
      <div className="p-6 border w-96 rounded-xl">
        <h1 className="mb-4 text-2xl">Register</h1>

        {["name","email","phone","aadhaar","password"].map((f)=>(
          <input
            key={f}
            placeholder={f}
            type={f==="password"?"password":"text"}
            className="w-full p-2 mb-2 bg-gray-900"
            onChange={(e)=>setForm({...form,[f]:e.target.value})}
          />
        ))}

        <button onClick={register} className="w-full p-2 bg-blue-500 rounded">
          Create Account
        </button>
      </div>
    </div>
  );
}
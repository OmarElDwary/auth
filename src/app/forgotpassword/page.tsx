"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [error, setError] = useState("");
  const [right, setRight] = useState(false);


  const trueEmail = async (email: string) => {
    try {
        await axios.post("/api/users/forgotpassword", {
            email,
        });
        //console.log("Success", response.data);
        setRight(true);
    } catch (error: any) {
      setError(error.message);
      console.log("Error", error.message);
    }
  }

  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <label htmlFor="newPassword">Enter Your Email</label>
        <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            placeholder="Email"
            type="email"
            name="Email"
            id="Email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
        />
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={buttonDisabled}
            onClick={() => trueEmail(email)}
        >
            Submit Mail
        </button>
    </div>
  );
}

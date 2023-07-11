"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);
  const [verified, setVerified] = useState(false);

  const resetPassword = async () => {
    try {
      await axios.post("/api/users/resetpassword", { token, newPassword });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log("Error", error.message);
    }
  };
  
  const onSubmit = async () => {
    try {
      
      router.push("/login");
      setNewPassword("");
    } catch (error: any) {
      console.log("Error", error.message);
    } finally {
      toast.success("Password Changed");
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    console.log("Token:", urlToken);
    setToken(urlToken || "" );
    }, []);

  

  useEffect(() => {
    try {
      if(token.length > 0) {
        resetPassword();
      }
    } catch (error: any) {
      console.log("Error", error.message);
    }
  }, [token]);
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {verified && (
        <div>
          <label htmlFor="newPassword">New Password</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            placeholder="New Password"
            type="password"
            name="newPassword"
            id="newPassword"
            value={newPassword}
            onChange={(ev) => setNewPassword(ev.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={buttonDisabled}
            onClick={onSubmit}
          >
            Submit
          </button>
        </div>
      )}
      {error && <div>Invalid Token</div>}
    </div>
  );
}

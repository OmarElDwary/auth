"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [token, setToken] = useState("");

  const verifyEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
    }
  }

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "" );
    }, []);

  useEffect(() => {
    if(token.length > 0) {
      verifyEmail();
    }
}, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="text-2xl p-2">{token ? `${token}` : "no token"}</h2>
            {verified && (
                <div>
                    <h2 className="text-2xl p-2">Email verified successfully!</h2>
                    <Link href="/login">
                        Login
                    </Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl p-2">{error}</h2>
                    <Link href="/login">
                        Login
                    </Link>
                </div>
            )}
        </div>
    );  

}
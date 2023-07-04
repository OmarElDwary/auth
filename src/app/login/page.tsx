"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";


export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        username: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login", user);
            console.log("Success", response.data);
            toast.success("User Logged In");
            router.push("/profile");
        } catch (error: any) {
            console.log("Error", error.message);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user.username.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <label htmlFor="username">Username</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" type="text" name="username" id="username" value={user.username} onChange={(ev) => setUser({ ...user, username: ev.target.value })} />
            <label htmlFor="password">Password</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" type="password" name="password" id="password" value={user.password} onChange={(ev) => setUser({ ...user, password: ev.target.value })} />
            <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" onClick={onLogin}>Login</button>
            <Link className="p-2 rounded-lg mb-4 focus:outline-none focus:border-gray-600" href="/signup">
                go to signup
            </Link>
        </div>
    )
}
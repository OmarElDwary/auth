"use client";
import axios from "axios";
import Link from "next/link";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {

    const router = useRouter();
    const [data, setData] = useState("nothing");

    const logout = async () => {
        try {
            const response = await axios.get("/api/users/logout");
            console.log(response);
            toast.success("Logout successful");
            router.push("/login");
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data);
        }
    }

    // const getProfile = async () => {
    //     const response = await axios.get("/api/users/user");
    //     console.log(response);
    //     setData(response.data.data._id);
    // }

    useEffect(() => {
        const getProfile = async () => {
            const response = await axios.get("/api/users/user");
            console.log(response);
            setData(response.data.data.username);
        }
        getProfile();
    }, [])
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>{data}</p>
            <hr />
            <button onClick={logout} className="bg-blue-500 mt-4 hover:bg-blue-700 text-white rounded py-2 px-4">Logout</button>
            {/* <button onClick={getProfile} className="bg-blue-500 mt-4 hover:bg-blue-700 text-white rounded py-2 px-4">get user details</button> */}
        </div>
    )
}
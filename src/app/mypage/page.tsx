'use client';

import { Avatar, Button } from "@mui/material";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Image from "next/image";
import { Input } from "postcss";
import { useState } from "react";
import { auth } from "../lib/firebase";

export default function Mypage (){

    const [email,setEmail] = useState("");
    const [myname,setMyname] = useState("");

    const doResetEmail = async(e:any) => {
        e.preventDefault();
        const actionCodeSettings = {
            // パスワード再設定後にログイン画面にリダイレクトさせる
            url : "http://localhost:3000/signin",
            handleCodeInApp: false,
        };

        // Firebaseで用意されているパスワード再設定のメールを送るための関数
        try {
        await sendPasswordResetEmail(auth,email,actionCodeSettings)
        alert("送信しました。");
        console.log(email);
        setEmail("");
        } catch(error:any) {
            console.log(error);     
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <Avatar
            alt="プロフィール画像"
            src=""
            sx={{ width: 100, height: 100 }}
            />
            <h2>{myname}</h2>
            <h3>メールアドレス</h3>
            <h1 className="text-xl font-semibold mt-6">パスワード再設定</h1>
            <div>
                <form onSubmit={doResetEmail} className="w-full max-w-md mt-4 bg-white p-6 rounded-lg shadow-md">
                    <label className="block mb-2">
                    メールアドレス：
                    </label>
                    <input
                    type="email"
                    name="email"
                    className="border rounded p-2 mb-4 w-full"
                    onChange={(e) => setEmail(e.target.value)}
                    />
                <Button
                type="submit"
                className="px-8 py-2 bg-orange-300 text-white rounded hover:bg-orange-400"
                >
                送信
            </Button>
            </form>
            </div>
        </div>
    )
}
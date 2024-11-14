'use client';

import { Avatar } from "@mui/material";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { auth } from "../lib/firebase";
import Header from "../components/Header";

export default function Mypage (){

    const [email,setEmail] = useState("");
    const [myname,setMyname] = useState("");

    // パスワードリセットのメール送信関数
    const doResetEmail = async(e: React.FormEvent<HTMLFormElement>) => {
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
        <div>
            <Header />

        <div className="flex flex-col items-center justify-center min-h-screen p-6">
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
                    value={email}
                    required
                    />
                <button
                type="submit"
                className="px-8 py-2 bg-orange-300 text-white rounded hover:bg-orange-400"
                >
                送信
            </button>
            </form>
                </div>
            </div>
        </div>
    )
};

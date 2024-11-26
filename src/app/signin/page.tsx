'use client';

import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import React, { useState } from "react";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";

const Signin=()=>{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error, setError] = useState<string>(""); // エラーメッセージ用のステートを追加
    const router = useRouter(); // useRouterを呼び出し

    // ユーザーがログインボタンを押下したときにdoLogin関数が実行される
    const doLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Firebaseで用意されているメールアドレスとパスワードでログインするための関数
        try {
        const userCredential = await signInWithEmailAndPassword(auth,email,password);
            const user = userCredential.user;
            console.log(user);
            router.push("/tapes"); // ログイン成功後に/tapesへリダイレクト
        } catch(error: unknown)  {
            if (error instanceof FirebaseError) {
                setError(error.message);
                console.error("FirebaseError: ", error.message);
            } else if (error instanceof Error) {
                setError(error.message);
                console.error("General Error: ", error.message);
            } else {
                setError("予期しないエラーが発生しました");
                console.error("Unknown error: ", error);
            }
        }
    };

    return (

        <div className="max-w-md mx-auto my-4 p-6 border border-gray-300 rounded-lg bg-gray-100">
            <h1 className="text-center text-2xl font-bold mb-4">
                ログイン
                </h1>
                {error && <p className="text-red-500 mb-4">{error}</p>} {/* エラーメッセージを表示 */}
            <form onSubmit={doLogin}> {/* onSubmitハンドラーを設定 */}
                <label className="block mb-2">
                    メールアドレス：
                    <input name="email" 
                    type="email" 
                    placeholder="emailを入力"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="username" // メールアドレスを記憶する
                    />
                </label>
                <label className="block mb-4">
                    パスワード：
                    <input name="password" 
                    type="password" 
                    placeholder="passwordを入力"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    onChange={(e) =>setPassword(e.target.value)}
                    autoComplete="current-password" // パスワードを安全に記憶する
                    />
                </label>
                <button 
                type="submit"
                className="w-full p-2 bg-orange-300 text-white rounded hover:bg-orange-400"
                >
                ログイン
                </button>
            </form>
            <div className="pt-2">
                <h2> 
                    <Link href={"/signup"}>新規登録はこちら→</Link>
                </h2>
            </div>
        </div>
    );
};

export default Signin;

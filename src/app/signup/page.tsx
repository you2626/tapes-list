'use client';

import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import React, { useState } from "react";
import { auth, db } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";

const Signup=()=>{
    // useStateでユーザーが入力したマイネームとメールアドレス、パスワードをmyname,email,passwordに格納する
    const [myname,setMyname] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    // ユーザーが登録ボタンを押下したときにdoRegister関数が実行される
    const doRegister = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // フォームのデフォルト動作を防ぐ

        // バリデーション
        if (!myname || !email || !password ) {
            setError("すべての項目を入力してください")
            return;
        }

        // パスワードの文字数制限
        if(password.length < 6) {
            setError("パスワードは6文字以上で入力してください");
            return;
        }

        // Firebaseで用意されているユーザー登録の関数
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // ユーザー登録すると自動的にログインされてuserCredential.uerでユーザーの情報を取得できる
            const user = userCredential.user;
            
            // Firestoreにユーザー名を保存
            await setDoc(doc(db,"users",user.uid), {
                displayName:myname,
                email:email,
            });

            // ユーザー登録できたかどうかをわかりやすくするためのアラート
            alert("登録完了しました！");

            // 登録後、ログインページへリダイレクト
            router.push("/signin");

        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                setError(error.message);  
            } else if (error instanceof Error) {
                setError(error.message); 
            } else {
                setError("予期しないエラーが発生しました");
            }
        }
    }

    return (
        <div className="max-w-md mx-auto my-4 p-6 border border-gray-300 rounded-lg bg-gray-100">
            <h1 className="text-center text-2xl font-bold mb-4">
                新規登録
                </h1>
                {error && <p className="text-red-500 mb-4">{error}</p>} {/* エラーメッセージを表示 */}
            <form onSubmit={doRegister}>
            <label className="block mb-2">
                    マイネーム：
                    <input name="myname" 
                    type="text" 
                    placeholder="nameを入力"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    // onChangeでユーザーが入力した値を取得し、その値をmynameに入れる
                    onChange={(e) => setMyname(e.target.value)}
                    />
                </label>
                <label className="block mb-2">
                    メールアドレス：
                    <input name="email" 
                    type="email" 
                    placeholder="emailを入力"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    // onChangeでユーザーが入力した値を取得し、その値をemailに入れる
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label className="block mb-4">
                    パスワード：
                    <input
                    name="password" 
                    type="password" 
                    placeholder="passwordを入力"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    // onChangeでユーザーが入力した値を取得し、その値をpasswordに入れる
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button 
                type="submit"
                className="w-full p-2 bg-orange-300 text-white rounded hover:bg-orange-400"
                >
                新規登録
                </button>
            </form>
            <div className="pt-2">
                <h2>
                    <Link href={"/signin"}>ログインはこちら→</Link>
                </h2>
            </div>
        </div>
    );
};

export default Signup;

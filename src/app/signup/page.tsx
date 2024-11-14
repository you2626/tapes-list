'use client';

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import Link from "next/link";
import React, { useState } from "react";
import { auth, db } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

const Signup=()=>{
    // useStateでユーザーが入力したマイネームとメールアドレス、パスワードをmyname,email,passwordに格納する
    const [myname,setMyname] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    // ユーザーが登録ボタンを押下したときにdoRegister関数が実行される
    const doRegister = async(e:any) => {
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
                name:myname,
                email:email,
            });

            // ユーザー登録できたかどうかをわかりやすくするためのアラート
            alert("登録完了しました！");

            // 登録後、ログインページへリダイレクト
            router.push("/signin");
            
        } catch (error:any) {
            setError(error.message);  // エラーメッセージを状態に保存
            console.log(error);
        }
    }

    return (
        <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg bg-gray-100">
            <h1 className="text-center text-2xl font-bold mb-4">
                新規登録
                </h1>
                {error && <p className="text-red-500 mb-4">{error}</p>} {/* エラーメッセージを表示 */}
            <form onSubmit={doRegister}>
            <label className="block mb-2">
                    My Name
                    <input name="myname" 
                    type="text" 
                    placeholder="nameを入力してください"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    // onChangeでユーザーが入力した値を取得し、その値をmynameに入れる
                    onChange={(e) => setMyname(e.target.value)}
                    />
                </label>
                <label className="block mb-2">
                    Emaill
                    <input name="email" 
                    type="email" 
                    placeholder="emailを入力してください"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    // onChangeでユーザーが入力した値を取得し、その値をemailに入れる
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label className="block mb-4">
                    Password
                    <input
                    name="password" 
                    type="password" 
                    placeholder="passwordを入力してください"
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
            <div>
                <h2>
                    サインインは
                    <Link href={"/signin"}>こちら→</Link>
                </h2>
            </div>
        </div>
    );
};

export default Signup;

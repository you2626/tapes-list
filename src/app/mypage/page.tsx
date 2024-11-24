'use client';

import { Avatar } from "@mui/material";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";
import Header from "../components/Header";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";

export default function Mypage (){

    // 現在、ログインしているユーザーを取得する
    const {currentUser} = useAuth();
    const router = useRouter();

    const [email,setEmail] = useState("");
    const [userDisplayName, setUserDisplayName] = useState<string | null>(null);
    const [userImage,setUserImage] = useState<string | null>(null);

    // Firestoreからユーザー情報を取得
    useEffect(() => {
        const fetchUserData = async () => {
            if (currentUser?.uid) {
                try {
                    const userDocRef = doc(db, "users", currentUser.uid);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        const data = userDoc.data();
                        console.log("User data:",data);
                        // Firestoreから取得したdisplayName,imageをstateにセット
                        setUserDisplayName(userDoc.data()?.displayName || "");
                        setUserImage(userDoc.data()?.image || "");
                    } else {
                        setUserDisplayName("");
                        setUserImage("");
                    }
                } catch (error) {
                    console.error("Firestoreからユーザー情報を取得できませんでした:", error);
                    setUserDisplayName("");
                    setUserImage("");
                }
            }
        }
        fetchUserData();
    },[currentUser])

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

        <h1 className="text-center font-bold text-2xl my-4">マイページ</h1>
        <div className="flex flex-col items-center min-h-screen p-6">
        {currentUser ? (
            <>
            <Avatar 
            alt="User Avatar" 
            src={userImage || "/images/default-avatar.png"}
            sx={{width:100,height:100}}
            />
                {/* // suppressHydrationWarningを入れてサーバーサイドとクライアントサイドでレンダーされる内容が違うときにエラーが出ないようにする
                // useAuth()で取得した現在ログインしているユーザーをdisplayNameで表示 */}
                <div suppressHydrationWarning={true}>
                        <div className="font-bold text-orange-400">{userDisplayName}</div>
                </div>
            </>
            ) : (
                <div suppressHydrationWarning={true}>ログインしていません。</div>
            )}

            <div>
                <form onSubmit={doResetEmail} className="w-full max-w-md mt-4 bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-center text-xl font-semibold py-3">パスワード再設定</h1>
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

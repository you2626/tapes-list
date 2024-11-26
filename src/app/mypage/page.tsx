'use client';

import { Avatar } from "@mui/material";
import { sendPasswordResetEmail } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FirebaseError } from "firebase/app";

const storage = getStorage();

const uploadProfileImage = async (file: File, userId: string) => {
    const storageRef = ref(storage, `profile_images/${userId}/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
}

const saveUserProfileImage = async (userId: string, imageUrl: string) => {
    const userDocRef = doc(db, "users", userId);
    await setDoc(userDocRef, { image: imageUrl }, { merge: true });
}

export default function Mypage () {

    // 現在、ログインしているユーザーを取得する
    const {currentUser} = useAuth();

    const [email,setEmail] = useState("");
    const [userDisplayName, setUserDisplayName] = useState<string | null>(null);
    const [userImage,setUserImage] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

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
                        setUserDisplayName(data?.displayName || "");
                        setUserImage(data?.image || "/images/default-avatar.png");
                    } else {
                        setUserDisplayName("");
                        setUserImage("/images/default-avatar.png");
                    }
                } catch (error) {
                    console.error("Firestoreからユーザー情報を取得できませんでした:", error);
                    setUserDisplayName("");
                    setUserImage("/images/default-avatar.png");
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
            alert("パスワードリセットメールを送信しました。");
            console.log(email);
            setEmail("");
        } catch (error) {
            if (error instanceof FirebaseError) {
                console.error("Firebase Error: ", error.message);
                alert(`エラーが発生しました: ${error.message}`);
        } else {
            console.error("予期しないエラー: ", error);
            alert("予期しないエラーが発生しました。");
        }
        }
    };

    // 画像ファイルの選択処理
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
        }
    };

    // 画像のアップロード処理
    const handleUploadImage = async () => {
        if (imageFile && currentUser?.uid) {
            try {
                // 画像をStorageにアップロード
                const downloadURL = await uploadProfileImage(imageFile, currentUser.uid);
                // Firestoreに画像URLを保存
                await saveUserProfileImage(currentUser.uid, downloadURL);
                setUserImage(downloadURL); // 画像URLを更新
                alert("画像をアップロードしました。");
            } catch (error) {
                console.error("画像のアップロードに失敗しました:", error);
                alert("画像のアップロードに失敗しました。");
            }
        }
    };

    return (
        <div>
            <Header />
        <h1 className="text-center font-bold text-2xl my-4">マイページ</h1>
        <div className="flex flex-col items-center min-h-screen p-6">
        {currentUser ? (
            <>

                {/* // suppressHydrationWarningを入れてサーバーサイドとクライアントサイドでレンダーされる内容が違うときにエラーが出ないようにする
                // useAuth()で取得した現在ログインしているユーザーをdisplayNameで表示 */}
                <div suppressHydrationWarning={true}>
                <div className="flex items-center space-x-2">
                    <label className="block">
                        マイネーム：
                    </label>
                    <div className="text-xl font-bold text-center text-orange-400">
                        {userDisplayName}
                    </div>
                </div>
                    <div className="w-full max-w-md mt-4 bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                    <h2 className="text-center text-xl font-semibold py-3">プロフィール画像</h2>
                    <Avatar 
                        alt="User Avatar" 
                        src={userImage || "/images/default-avatar.png"}
                        sx={{width:150,height:150}}
                        />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mb-4 py-2"
                        />
                        <button
                            onClick={handleUploadImage}
                            className="px-8 py-2 bg-orange-300 text-white rounded hover:bg-orange-400"
                            >
                                画像をアップロード
                        </button>
                    </div>
                </div>
            </>
            ) : (
                <div suppressHydrationWarning={true}>ログインしていません。</div>
            )}

            <div>
                <form onSubmit={doResetEmail} className="w-full max-w-md mt-4 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-center text-xl font-semibold py-3">パスワード再設定</h2>
                    <label className="block mb-2">
                    メールアドレス：
                    </label>
                    <input
                    type="email"
                    name="email"
                    placeholder="emailを入力"
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

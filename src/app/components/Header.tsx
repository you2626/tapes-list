"use client";

import Link from "next/link";
import Image from "next/image";
import CreateIcon from '@mui/icons-material/Create';
import SearchIcon from '@mui/icons-material/Search';
import FaceIcon from '@mui/icons-material/Face';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { Avatar, Button } from "@mui/material";
import { useEffect, useState } from "react";
import MessageDialog from '../components/Modal';
import { useAuth } from '../context/AuthContext';
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";


export default function Header(){

    // 現在、ログインしているユーザーを取得する
    const {currentUser} = useAuth();
    const router = useRouter();

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
                    
    // モーダルの開閉状態を管理
    const [isOpen, setIsOpen] = useState(false);

    // ログアウトの処理
    const doLogout = async () => {
        const auth = getAuth();
        try {
            await signOut(auth);
            alert("ログアウトしました！")
            router.push("/signin");
        } catch(error) {
            console.error("ログアウトエラー:",error);
            alert("ログアウトに失敗しました");
        }
    };

    return (
        <div className="flex justify-between px-4 py-4">
            <div>
            {currentUser ? (
            <>
            <Avatar 
            alt="User Avatar" 
            src={userImage || "/images/default-avatar.png"}
            sx={{width:40,height:40}}
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
            </div>       

            <div className="px-2 space-x-4">
            <Button variant="contained" color="inherit" startIcon={<HomeIcon />}
            sx={{
                backgroundColor:'white'
            }}>
            <Link href="/tapes?p=1">
            ホーム
            </Link>
            </Button>

            <MessageDialog
            open={isOpen}
            onCancel={() => setIsOpen(false)}
            onOk={() => setIsOpen(false)}
            />

            <Button variant="contained" color="inherit" startIcon={<CreateIcon />} 
            sx={{
                backgroundColor:'white'
            }}
            onClick={() => setIsOpen(true)}>
            登録
            </Button>
            <Button variant="contained" color="inherit" startIcon={<FaceIcon />}
            sx={{
                backgroundColor:'white'
            }}>
            <Link href="/mypage">
            マイページ
            </Link>
            </Button>
            { currentUser ? (
            <>
            <Button variant="contained" color="inherit" startIcon={<LogoutIcon />}
            sx={{backgroundColor:'white'}}
            onClick={doLogout}
            >
            ログアウト
            </Button>
            </>
            ):(
                <Link href="/signin">
                <Button variant="contained" color="inherit" startIcon={<LoginIcon />} sx={{ backgroundColor: 'white' }}>
                ログイン
            </Button>
            </Link>
            )}
            </div>
        </div>
    )
};

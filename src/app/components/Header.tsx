"use client";

import Link from "next/link";
import CreateIcon from '@mui/icons-material/Create';
import SearchIcon from '@mui/icons-material/Search';
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
    
    // Firestoreからユーザー情報を取得
    useEffect(() => {
        const fetchUserData = async () => {
            if (currentUser) {
                try {
                    const userDocRef = doc(db, "users", currentUser.uid); // ユーザーIDでドキュメントを取得
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        // Firestoreから取得したdisplayNameをstateにセット
                        setUserDisplayName(userDoc.data()?.displayName || "");
                    } else {
                        setUserDisplayName("");
                    }
                } catch (error) {
                    console.error("Firestoreからユーザー情報を取得できませんでした:", error);
                    setUserDisplayName("");
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
        <div className="flex justify-between">
            <div>
            <Avatar alt="User Avatar" src={currentUser?.photoURL || "/default-avator.png"} />
            <div>
            {currentUser ? (
                // suppressHydrationWarningを入れてサーバーサイドとクライアントサイドでレンダーされる内容が違うときにエラーが出ないようにする
                // useAuth()で取得した現在ログインしているユーザーをcurrentUser.emailで表示
                <div suppressHydrationWarning={true}>
                    <div>{userDisplayName}</div>
                    </div>
            ) : (
                <div suppressHydrationWarning={true}>ログインしていません。</div>
            )}
            </div>
            </div>
            <div className="px-2 space-x-4">

            <Button variant="outlined" color="inherit" startIcon={<SearchIcon />}
            sx={{
                backgroundColor:'white'
            }}>
            検索
            </Button>
            <MessageDialog
            open={isOpen}
            onCancel={() => setIsOpen(false)}
            onOk={() => setIsOpen(false)}
            />
            <Button variant="outlined" color="inherit" startIcon={<CreateIcon />} 
            sx={{
                backgroundColor:'white'
            }}
            onClick={() => setIsOpen(true)}>
            登録
            </Button>
            <Button variant="outlined" color="inherit" startIcon={<HomeIcon />}
            sx={{
                backgroundColor:'white'
            }}>
            <Link href="mypage">
            マイページ
            </Link>
            </Button>
            { currentUser ? (
            <>
            <Button variant="outlined" color="inherit" startIcon={<LogoutIcon />}
            sx={{backgroundColor:'white'}}
            onClick={doLogout}
            >
            ログアウト
            </Button>
            </>
            ):(
                <Link href="/signin">
                <Button variant="outlined" color="inherit" startIcon={<LoginIcon />} sx={{ backgroundColor: 'white' }}>
                ログイン
            </Button>
            </Link>
            )}
            </div>
        </div>
    )
};

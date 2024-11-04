"use client";

import Link from "next/link";
import CreateIcon from '@mui/icons-material/Create';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { Avatar, Button } from "@mui/material";
import { useState } from "react";
import MessageDialog from '../components/Modal';
import { useAuth } from '../context/AuthContext';
import { getAuth, signOut } from "firebase/auth";

export default function Header(){

    // 現在、ログインしているユーザーを取得する
    const {currentUser} = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    // ログアウトの処理
    const doLogout = async () => {
        const auth = getAuth();
        try {
            await signOut(auth);
            alert("ログアウトしました！")
        } catch(error) {
            console.error("ログアウトエラー:",error);
            alert("ログアウトに失敗しました");
        }
    };

    return (
        <div className="flex justify-between">
            <div>
            <Avatar alt="Remy Sharp" src="" />
            <div>
                <h2>user name</h2>
            {currentUser ? (
                // suppressHydrationWarningを入れてサーバーサイドとクライアントサイドでレンダーされる内容が違うときにエラーが出ないようにする
                // useAuth()で取得した現在ログインしているユーザーをcurrentUser.emailで表示
                <div suppressHydrationWarning={true}>
                    <div>{ currentUser.email}</div>
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
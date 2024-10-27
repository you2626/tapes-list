"use client";

import Link from "next/link";
import CreateIcon from '@mui/icons-material/Create';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar, Button } from "@mui/material";
import { useState } from "react";
import MessageDialog from '../components/Modal';

export default function Header(){

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex justify-between">
            <div>
            <Avatar alt="Remy Sharp" src="" />
            <h2>user name</h2>
            </div>
            <div className="px-2 space-x-4">
            <Button variant="outlined" color="inherit" startIcon={<SearchIcon />}>
            検索
            </Button>
            <MessageDialog
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        onOk={() => setIsOpen(false)}
      />
            <Button variant="outlined" color="inherit" startIcon={<CreateIcon />} onClick={() => setIsOpen(true)}>
            登録
            </Button>
            <Button variant="outlined" color="inherit" startIcon={<HomeIcon />}>
            <Link href="mypage">
            マイページ
            </Link>
            </Button>
            <Button variant="outlined" color="inherit" startIcon={<LogoutIcon />}>
            <Link href="signin">
            ログアウト
            </Link>
            </Button>
            </div>
        </div>
    )
};
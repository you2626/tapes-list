import Link from "next/link";
import CreateIcon from '@mui/icons-material/Create';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar, Button } from "@mui/material";

export default function Header(){
    return (
        <div className="flex justify-between">
            <div>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <h2>user name</h2>
            </div>
            <div className="px-2 space-x-4">
            <Button variant="outlined" color="inherit" startIcon={<SearchIcon />}>
            検索
            </Button>
            <Button variant="outlined" color="inherit" startIcon={<CreateIcon />}>
            登録
            </Button>
            <Button variant="outlined" color="inherit" startIcon={<HomeIcon />}>
            <Link href="mypage">
            マイページ
            </Link>
            </Button>
            <Button variant="outlined" color="inherit" startIcon={<LogoutIcon />}>
            ログアウト
            </Button>
            </div>
        </div>
    )
};
import { Avatar } from "@mui/material";
import Image from "next/image";

export default function (){
    return (
        <div>
            <Avatar
            alt="プロフィール画像"
            src=""
            sx={{ width: 100, height: 100 }}
            />
            <h2>マイネーム</h2>
            <h3>メールアドレス</h3>
        </div>
    )
}
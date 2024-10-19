import Link from "next/link";

export default function Header(){
    return (
        <div className="flex justify-between">
            <h2>user name</h2>
            <h3><Link href="mypage">マイページ</Link></h3>
            <button>検索</button>
            <button>登録</button>
            <h3>ログアウト</h3>
        </div>
    )
};
import Image from "next/image";
import { AuthProvider } from "./context/AuthContext";
import Link from "next/link";
import { Button } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import AddReactionIcon from '@mui/icons-material/AddReaction';

export default function Home() {
  return (
    <AuthProvider>
      <div>
        {/* ヘッダー部分 */}
        <header className="flex justify-end items-center py-5 px-5 space-x-4">
          <Link href="/signin">
            <Button variant="contained" color="inherit" startIcon={<LoginIcon />} sx={{ backgroundColor: 'white' }}>
              ログイン
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="contained" color="inherit" startIcon={<AddReactionIcon />} sx={{ backgroundColor: 'white' }}>
              新規アカウント登録
            </Button>
          </Link>
        </header>

        {/* メイン部分 */}
        <main className="flex flex-col items-center justify-center text-center py-10">
          <Image
            src="/images/title2.png"
            alt="マスキングテープのロゴ"
            width={500}
            height={500}
            className="py-5"
          />

          {/* 画像を行で表示 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 mb-8">
            <Image
              src="/images/TapeList.png"
              alt="マスキングテープの一覧"
              width={400}
              height={400}
              className="rounded-lg border-2 border-yellow-300 p-2"
            />
            <Image
              src="/images/AddTape.png"
              alt="テープの追加"
              width={400}
              height={400}
              className="rounded-lg border-2 border-yellow-300 p-2"
            />
            <Image
              src="/images/UpdateTape.png"
              alt="詳細情報ページ"
              width={400}
              height={400}
              className="rounded-lg border-2 border-yellow-300 p-2"
            />
            <Image
              src="/images/signup.png"
              alt="新規アカウント登録"
              width={400}
              height={400}
              className="rounded-lg border-2 border-yellow-300 p-2"
            />
            <Image
              src="/images/signin.png"
              alt="ログインページ"
              width={400}
              height={400}
              className="rounded-lg border-2 border-yellow-300 p-2"
            />
            <Image
              src="/images/mypage.png"
              alt="マイページ"
              width={400}
              height={400}
              className="rounded-lg border-2 border-yellow-300 p-2"
            />
          </div>
        </main>

        {/* フッター部分 */}
        <footer className="flex gap-6 flex-wrap items-center justify-center py-5">
          <a>© 2024 you2626</a>
        </footer>
      </div>
    </AuthProvider>
  );
}

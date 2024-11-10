import Image from "next/image";
import { AuthProvider } from "./context/AuthContext";
import Link from "next/link";

export default function Home() {
  return (
    <AuthProvider>
      <div> 
        {/* ヘッダー部分 */}
        <header className="flex justify-center items-center py-5">
          <Link href="/signin">
            <Image
              src="/images/title.png"
              alt="マスキングテープのロゴ"
              width={500}
              height={500}
              className="cursor-pointer" // ボーダー色とパディングを追加
            />
          </Link>
        </header>

        {/* メイン部分 */}
        <main className="flex flex-col items-center justify-center text-center py-10">
          {/* 画像を行で表示 */}
          <div className="flex gap-6 justify-center mb-8">
            <Image
              src="/images/TapeList.png"
              alt="マスキングテープの一覧"
              width={400}
              height={400}
              className="rounded-lg border-2 border-yellow-300 p-2" // 角丸、ボーダー、パディング
            />
            <Image
              src="/images/Tape_id.png"
              alt="詳細情報ページ"
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
          </div>
          
          {/* 2行目の画像を表示 */}
          <div className="flex gap-6 justify-center">
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

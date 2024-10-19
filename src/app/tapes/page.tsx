import Image from "next/image";
import Header from "../components/Header";
import Pagenation from "../components/Pagenation";

export default function Home() {
  return (
    <div> 
      <header>
        <Header />
      </header>
      <main>
        <h1 className="text-center">マスキングテープ一覧</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <li className="border">
                <Image
                src=""
                alt="マスキングテープ画像"
                width={30}
                height={30}
                />
                <h3>ホワイト</h3>
                <h4>カテゴリ</h4>
            </li>
            <li className="border">
                <Image
                src=""
                alt="マスキングテープ画像"
                width={30}
                height={30}
                />
                <h3>ホワイト</h3>
                <h4>カテゴリ</h4>
            </li>
            <li className="border">
                <Image
                src=""
                alt="マスキングテープ画像"
                width={30}
                height={30}
                />
                <h3>ホワイト</h3>
                <h4>カテゴリ</h4>
            </li>
            <li className="border">
                <Image
                src=""
                alt="マスキングテープ画像"
                width={30}
                height={30}
                />
                <h3>ホワイト</h3>
                <h4>カテゴリ</h4>
            </li>
            <li className="border">
                <Image
                src=""
                alt="マスキングテープ画像"
                width={30}
                height={30}
                />
                <h3>ホワイト</h3>
                <h4>カテゴリ</h4>
            </li>
            <li className="border">
                <Image
                src=""
                alt="マスキングテープ画像"
                width={30}
                height={30}
                />
                <h3>ホワイト</h3>
                <h4>カテゴリ</h4>
            </li>
            </ul>
      </main>
      <div className="row-start-3 flex gap-10 flex-wrap items-center justify-center">
      <Pagenation
      currentPage={5}
      limit={5}
      count={20}
      path="/" />
      </div>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      <a>© 2024 you2626</a>
      </footer>
    </div>
  );
}
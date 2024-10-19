import Image from "next/image";
import Header from "../components/Header";
import Pagenation from "../components/pagenation";

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
                <h3>カテゴリ</h3>
            </li>
            <li className="border">
                <Image
                src=""
                alt="マスキングテープ画像"
                width={30}
                height={30}
                />
                <h3>ホワイト</h3>
                <h3>カテゴリ</h3>
            </li>
        </ul>
      </main>
      <div className="row-start-3 flex gap-10 flex-wrap items-center justify-center">
      <Pagenation
      currentPage={5}
      limit={5}
      count={20}
      path="/Pagenation" />
      </div>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
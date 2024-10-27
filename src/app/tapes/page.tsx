'use client';

import Image from "next/image";
import Header from "../components/Header";
import Pagenation from "../components/Pagenation";
import TapeItem from "../components/TapeItem";
import {db} from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore"; 
import { useEffect, useState } from "react";
import {Type} from "../components/Type";


export default function Tapes() {
  // tapes配列にtape情報を格納する
  // const tapes=[
  //   { src: "/images/sample.jpg", title: "ホワイト", category: "カテゴリ1" },
  //   { src: "/images/tape0.png", title: "カラフル", category: "カテゴリ2" },
  //   { src: "/images/sample.jpg", title: "ホワイト", category: "カテゴリ1" },
  // ]

const [tapes,setTapes]=useState<Type[]>([])
const [error, setError] = useState<string | null>(null); // エラーステートを追加

useEffect(() => {
  const fetchTapes = async () => {
    try {
      const tapeData = collection(db, "tapes");
      const querySnapshot = await getDocs(tapeData);
      const tapeList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTapes(tapeList);
    } catch (error) {
      console.error("Error fetching tapes: ", error);
      setError((error as Error).message); // エラーをステートに保存
    }
  };

  fetchTapes();
}, []); // 空の依存配列でコンポーネントがマウントされた時だけ実行
  // const tapeData=collection(db,"tapes");
  // getDocs(tapeData).then((querySnapshot)=>{
  //   setTapes(querySnapshot.docs.map((doc)=>doc.data()))
  // })
  return (
    <div> 
      <header>
        <Header />
      </header>
      <main>
        <h1 className="text-center">マスキングテープ一覧</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
{/* map関数を使ってtapeの情報をtapeItemコンポーネントに渡し、リスト作成 */}
            {tapes.map((tape)=>(
              <TapeItem
              key={tape.id}
              imageSrc={tape.src}
              title={tape.title}
              category={tape.category}
              />
            ))}
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
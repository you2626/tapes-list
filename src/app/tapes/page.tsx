'use client';

import Image from "next/image";
import Header from "../components/Header";
import Pagenation from "../components/Pagenation";
import TapeItem from "../components/TapeItem";
import {db} from "../lib/firebase";
import { collection, getDocs, onSnapshot, orderBy, query, QuerySnapshot } from "firebase/firestore"; 
import { useEffect, useState } from "react";
import {Type} from "../components/Type";
import { useRouter } from "next/router";
import Link from "next/link";
import { Category, Description, ImageSearch } from "@mui/icons-material";


export default function Tapes() {

const [tapes,setTapes]=useState<Type[]>([]);
const [error, setError] = useState<string | null>(null); // エラーステートを追加
const [loading,setLoading] = useState(true); //ローディング状態を追加

useEffect(() => {
  const tapeData = collection(db, "tapes");
  // 最新の順番で表示する
  const q =query(tapeData,orderBy('timestamp','desc'));
  const unsubscribe = onSnapshot(q,(querySnapshot) =>{
  const tapeList:Type[] = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    imageSrc: doc.data().imageSrc, // Firestoreの構造と一致していることを確認
    title: doc.data().title,
    category: doc.data().category,
    description: doc.data().description,
  }));

  setTapes(tapeList);
  setLoading(false); //データ取得後にローディングを解除
  },(error) => {
      console.error("Error fetching tapes: ", error);
      setError(error.message);
      setLoading(false);
  });
  return ()=>unsubscribe();
}, []); // 空の依存配列でコンポーネントがマウントされた時だけ実行

if (loading) {
  return <div className="text-center">ローディング中...</div>;
}

if (error) {
  return <div className="text-center text-red-500">エラーが発生しました: {error}</div>;
}

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
              <li key={tape.id}>
              <Link
              href={{pathname: `/tapes/${tape.id}`,
            query:{
              id:tape.id,
              src:tape.imageSrc,
              title:tape.title,
              category:tape.category,
              description:tape.description,
            }}}
              >
              <TapeItem
              key={tape.id}
              imageSrc={tape.imageSrc}
              title={tape.title}
              category={tape.category}
              description={tape.description}
              />
            </Link>
            </li>
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
};
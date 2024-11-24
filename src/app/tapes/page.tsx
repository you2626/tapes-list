'use client';

import React from 'react';
import Header from "../components/Header";
import Pagenation from "../components/Pagination";
import TapeItem from "../components/TapeItem";
import {db} from "../lib/firebase";
import { collection, DocumentSnapshot, onSnapshot, orderBy, query, where } from "firebase/firestore"; 
import { useEffect, useState } from "react";
import {Type} from "../components/Type";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Tapes() {
  const [tapes,setTapes]=useState<Type[]>([]);
  const [error, setError] = useState<string | null>(null); // エラーステートを追加
  const [loading,setLoading] = useState(true); //ローディング状態を追加
  const [totalCount,setTotalCount]=useState(0);
  const [allDocs,setAllDocs]=useState<DocumentSnapshot[]>([]); // すべてのドキュメントを保持

  const limitPage = 9; // 1ページあたりの表示件数
  
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const page = parseInt(params.get('p') || '1');
      return isNaN(page) ? 1 : page;
    }
    return 1;
  });

  // ページ変更ハンドラー
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.history.pushState({}, '', `/tapes?p=${page}`);
  };

  // AuthContext から currentUser を取得
  const { currentUser } = useAuth();

  // 全データの取得と保存
  useEffect(() => {

    if (!currentUser?.uid) {
      setLoading(false);
      return;
    }

    const tapeData = collection(db, "tapes");
    const q = query(tapeData,where("userId", "==", currentUser.uid), orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs = querySnapshot.docs;
      setAllDocs(docs); // すべてのドキュメントを保存
      setTotalCount(docs.length);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching tapes: ", error);
      setError(error.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // ページごとのデータ取得
  useEffect(() => {
    if (allDocs?.length > 0) {
      const startIndex = (currentPage - 1) * limitPage;
      const endIndex = Math.min(startIndex + limitPage, allDocs.length);
      
      // 現在のページに表示すべきドキュメントを取得
      const currentDocs = allDocs.slice(startIndex, endIndex);
      
      // データを整形
      const tapeList: Type[] = currentDocs.map((doc) => ({
        id: doc.id,
        imageSrc: doc.data()?.imageSrc || "",
        title: doc.data()?.title || "",
        category: doc.data()?.category || "",
        description: doc.data()?.description || "",
      }));

      setTapes(tapeList);
    }
  }, [currentPage, allDocs]);

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
        <h1 className="text-center font-bold text-xl my-4">マスキングテープ一覧</h1>
        
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
          {tapes.map((tape) => (
            <li key={tape.id}>
              <Link
                href={{
                  pathname: `/tapes/${tape.id}`,
                  query: {
                    id: tape.id,
                    src: tape.imageSrc,
                    title: tape.title,
                    category: tape.category,
                    description: tape.description,
                  }
                }}
              >
                <div>
                  <TapeItem
                    key={tape.id}
                    imageSrc={tape.imageSrc}
                    title={tape.title}
                    category={tape.category}
                    description={tape.description}
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>

      <div className="row-start-3 flex gap-10 flex-wrap items-center justify-center">
        <Pagenation
          currentPage={currentPage}
          limit={limitPage}
          count={totalCount}
          path="/tapes"
          onPageChange={handlePageChange}
        />
      </div>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center py-4">
        <a>© 2024 you2626</a>
      </footer>
    </div>
  );
};

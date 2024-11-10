"use client";

import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import MessageDialog from "../../components/UpdateModal";
import Link from "next/link";
import { Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import UpdateModal from "../../components/UpdateModal";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

const TapesDetail = () => {
    // URLのパラメーターを取得
    const searchParams = useSearchParams();
    //動的ルーティングのパラメーターを取得
    const { id } = useParams(); 
    // useRouterを呼び出す
    const router = useRouter();

        // 検索パラメーターに関連付けられたデータを取得（例としてデフォルト値を使用）
        const imageSrc = searchParams.get("src") || "/images/tape0.png";
        const [title, setTitle] = useState(searchParams.get("title") || "デフォルトタイトル");
        const [category, setCategory] = useState(searchParams.get("category") || "デフォルトカテゴリ");
        const [description, setDescription] = useState(searchParams.get("description") || "デフォルトの説明");
        const [isOpen, setIsOpen] = useState(false);

        // idがstring[]の場合に最初の要素を取り出す
        const generatedId = Array.isArray(id) ? id[0] : id;

        const handleUpdate = (updatedTitle:string, updatedCategory:string, updatedDescription:string) => {
            setTitle(updatedTitle);
            setCategory(updatedCategory);
            setDescription(updatedDescription);
        };

        const handleDelete = async () => {
            // `id` が文字列型であることを確認
            if (typeof id !== "string") {
              console.error("IDが不正です。");
              return;
            }
          
            try {
              // Firestoreのドキュメントを削除
              const docRef = doc(db, "tapes", id);
              await deleteDoc(docRef);
              alert("削除しました");
              router.push("/tapes");
            } catch (error) {
              console.error("Error deleting document: ", error);
            }
          };

    return (
        <div>
            <header className="py-5 px-3">
        <Link
        href="/tapes">
            <Button 
            variant="outlined" 
            color="inherit" 
            startIcon={<ArrowBackIcon />}
            sx={{
                fontWeight: 'bold',
                backgroundColor: 'white', // 背景を設定
                borderColor: 'gray.300', // ボーダーの色を指定（必要に応じて）
                '&:hover': {
                    backgroundColor: 'gray.100', // ホバー時の色
                },
            }}
            >
            戻る
            </Button>
        </Link>
        </header>
        <div className="px-3">
            <div className="flex py-3 underline text-2xl font-bold">
                <p>{title}</p>
                </div>
                <Image
                src={imageSrc}
                alt={`マスキングテープ画像:${title}`}
                width={500}
                height={500}
                className="object-cover rounded-lg"
                priority // 重要な画像にpriorityを追加
                />
                <div className="flex">
                <h4 className="font-bold">カテゴリ：</h4>
                <p>{category}</p>
                </div>
                <div>
                <h4 className="font-bold">備考：</h4>
                <p>{description}</p>
                <div>

                </div>
                    <div className="flex">
                        <UpdateModal
                        open={isOpen}
                        onCancel={() => setIsOpen(false)}
                        onOk={() => setIsOpen(false)}
                        onUpdate={handleUpdate}
                        imageSrc={imageSrc} // 画像URLを渡す
                        generatedId={generatedId} // IDを渡す
                        initialTitle={title} // 初期タイトルを渡す
                        initialCategory={category} // 初期カテゴリを渡す
                        initialDescription={description} // 初期説明を渡す
                        />
                        <div className="flex gap-3 py-5">
                            <button
                            className="p-2 bg-orange-400 text-white rounded hover:bg-orange-300 px-4"
                            onClick={() => setIsOpen(true)}
                            >
                        編集
                        </button>
                        <button 
                        className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600 px-4"
                        onClick={handleDelete}>
                            削除
                            </button>
                            </div>
                            </div>
                            </div>
                            </div>
                            </div>
        )
    
};

export default TapesDetail;

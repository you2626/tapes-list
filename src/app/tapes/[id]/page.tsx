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
    const id = useParams().id; 
    // useRouterを呼び出す
    const router = useRouter();

        // 検索パラメーターに関連付けられたデータを取得（例としてデフォルト値を使用）
        const imageSrc = searchParams.get("src") ;
        const [title, setTitle] = useState(searchParams.get("title") || "デフォルトタイトル");
        const [category, setCategory] = useState(searchParams.get("category") || "デフォルトカテゴリ");
        const [description, setDescription] = useState(searchParams.get("description") || "デフォルトの説明");
        const [isOpen, setIsOpen] = useState(false);

        const handleUpdate = (updatedTitle, updatedCategory, updatedDescription) => {
            setTitle(updatedTitle);
            setCategory(updatedCategory);
            setDescription(updatedDescription);
        };
        
        const handleDelete = async ()=>{
            try{
                await deleteDoc(doc(db, "tapes", id))
                alert("削除しますか？")
                Router.push("/tapes")
            } catch(error) {
                console.log("Error deleting document: ", error)
            }
        };


    return (
        <div>
            <header className="py-5 px-5">
        <Link
        href="/tapes">
            <Button variant="outlined" color="inherit" startIcon={<ArrowBackIcon />}>
            戻る
            </Button>
        </Link>
        </header>
            <div className="flex py-5 px-5 underline text-2xl font-bold">
                <p>{title}</p>
                </div>
                <Image
                src={imageSrc}
                alt={`マスキングテープ画像:${title}`}
                width={700}
                height={700}
                className="object-cover"
                priority // 重要な画像にpriorityを追加
                />
            <div className="flex">
                <h4>カテゴリ：</h4>
                <p>{category}</p>
                </div>
            <div className="">
                <h4>備考：</h4>
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
                        generatedId={id} // IDを渡す
                        initialTitle={title} // 初期タイトルを渡す
                        initialCategory={category} // 初期カテゴリを渡す
                        initialDescription={description} // 初期説明を渡す
                        />
                        <div className="flex">
                            <button
                            className="p-2 bg-orange-400 text-white rounded hover:bg-orange-300 px-4"
                            onClick={() => setIsOpen(true)}
                            >
                        編集
                        </button>
                        </div>
                        <button 
                        className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600 px-4"
                        onClick={handleDelete}>
                            削除
                            </button>
                        </div>
                        </div>
                        </div>
        )
    
};

export default TapesDetail;
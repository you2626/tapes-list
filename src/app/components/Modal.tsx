import { Input } from "@mui/material";
import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../lib/firebase";
import {v4 as uuidv4} from 'uuid';
import { useAuth } from "../context/AuthContext";

export type ModalProps = {
    open: boolean;
    onCancel: () => void;
    onOk: () => void;
};

const Modal = (props: ModalProps) => {

    // 現在、ログインしているユーザーを取得する
    const {currentUser} = useAuth();

    const [addTitle, setAddTitle] = useState("");
    const [addImage, setAddImage] = useState("");
    const [addCategory, setAddCategory] = useState("");
    const [addDescription, setAddDescription] = useState("");
    const [imageError, setImageError] = useState<string | null>(null);
    const [formError, setFormError] = useState<string | null>(null);

        // フォームをリセットする関数
        const resetForm = () => {
            setAddTitle("");
            setAddImage("");
            setAddCategory("");
            setAddDescription("");
            setFormError(null);
            setImageError(null);
        };

    // テープの送信処理
    const sendTape = async (e: React.FormEvent) => {
        e.preventDefault();

           // 必須項目の検証
    if (!addTitle || !addCategory || !addImage) {
        setFormError("タイトル、カテゴリ、画像は必須です。");
        return;
    }

        // currentUserが存在しない場合は処理を中断
        if (!currentUser) {
            alert("ログインしていません。ログインしてください。");
            return;
        }

        // uuidを生成
        const generatedId=uuidv4();

        try {
            // Firestoreにデータ送信
            await addDoc(collection(db, "tapes"), {
                userId: currentUser.uid,
                id:generatedId,
                imageSrc: addImage,
                title: addTitle,
                category: addCategory,
                description: addDescription,
                timestamp:serverTimestamp()
            });
            // 登録が成功したら親コンポーネントに通知しフォームをリセット
            props.onOk();
            resetForm();
        } catch (error) {
            console.error("Error adding document: ", error);
            setFormError("テープの登録に失敗しました。もう一度お試しください。");
        }
    };
    
    // ファイルアップロード処理
    const onFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const file = e.target.files[0]; // 1つのファイルのみを処理
        if (!file) return;

        const allowedTypes =["image/jpeg","image/png","image/jpg"];
        if (!allowedTypes.includes(file.type)) {
            setImageError("JPEG、PNG、JPGのファイルのみアップロードできます。");
            return;
        }

        const storageRef = ref(storage, `image/${file.name}`);

        try {
            const snapshot = await uploadBytes(storageRef, file);
            console.log("Uploaded a blob or file!", snapshot);
            const url = await getDownloadURL(storageRef);
            setAddImage(url);
            setImageError(null);
        } catch (error) {
            console.error("Error uploading or getting URL:", error);
            setImageError("画像のアップロードに失敗しました。");
        }
    };

    return props.open ? (
        <>
            <div className="bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-70 p-5 flex flex-col items-start absolute z-20 rounded-lg shadow-lg">
                <h1 className="text-xl font-bold mb-5">マスキングテープ登録</h1>
                
                <p className="text-lg my-3">タイトル</p>
                <Input
                    value={addTitle}
                    type="text"
                    placeholder="タイトルを入力"
                    onChange={(e) => setAddTitle(e.target.value)}
                />
                <p className="text-lg my-3">画像</p>
                <input
                    type="file"
                    accept=".png,.jpeg,.jpg"
                    onChange={(e) => {
                        onFileUpload(e);
                    }}
                />
                {addImage && <img src={addImage} alt="画像" width={500} height={500} />}
                <p className="text-lg my-3">カテゴリ</p>
                <Input
                    value={addCategory}
                    type="text"
                    placeholder="カテゴリを入力"
                    onChange={(e) => setAddCategory(e.target.value)}
                />
                <p className="text-lg my-3">備考</p>
                <textarea
                    value={addDescription}
                    placeholder="詳細を記載"
                    className="w-full border"
                    onChange={(e) => setAddDescription(e.target.value)}
                />
                <div className="flex mt-auto w-full py-5">
                    <button
                        className="bg-orange-300 hover:bg-orange-400 text-white px-8 py-2 mx-auto"
                        onClick={sendTape}
                    >
                        登録
                    </button>
                    <button
                        className="bg-gray-300 hover:bg-gray-200 text-black px-8 py-2 mx-2"
                        onClick={()=>{
                            props.onCancel()
                            resetForm();
                        }}
                    >
                        キャンセル
                    </button>
                </div>
            </div>
            <div
                className="fixed inset-0 bg-black bg-opacity-50 w-full h-full z-10"
                onClick={props.onCancel}
            ></div>
        </>
    ) : null;
};

export default Modal;

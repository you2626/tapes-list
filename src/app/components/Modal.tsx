import { Input } from "@mui/material";
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../lib/firebase";

export type ModalProps = {
    open: boolean;
    onCancel: () => void;
    onOk: () => void;
};

const Modal = (props: ModalProps) => {
    const [addTitle, setAddTitle] = useState("");
    const [addImage, setAddImage] = useState("");
    const [addCategory, setAddCategory] = useState("");
    const [addDescription, setAddDescription] = useState("");

    const sendTape = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await addDoc(collection(db, "tapes"), {
                key: 1,
                imageSrc: addImage,
                title: addTitle,
                category: addCategory,
                description: addDescription,
            });
            props.onOk(); // 親に確認を通知
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const onFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const file = e.target.files[0]; // 1つのファイルのみを処理
        if (!file) return;

        const storageRef = ref(storage, `image/${file.name}`);

        try {
            const snapshot = await uploadBytes(storageRef, file);
            console.log("Uploaded a blob or file!", snapshot);
            const url = await getDownloadURL(storageRef);
            setAddImage(url); // 取得したURLをセット
        } catch (error) {
            console.error("Error uploading or getting URL:", error);
        }
    };

    return props.open ? (
        <>
            <div className="bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-70 p-5 flex flex-col items-start absolute z-20 rounded-lg shadow-lg">
                <h1 className="text-xl font-bold text-slate-800 mb-5">マスキングテープ登録</h1>
                <p className="text-lg mb-5">タイトル</p>
                <Input
                    value={addTitle}
                    type="text"
                    placeholder="タイトルを入力"
                    onChange={(e) => setAddTitle(e.target.value)}
                />
                <p className="text-lg mb-5">画像</p>
                <input
                    type="file"
                    accept=".png,.jpeg,.jpg" // ここで拡張子を修正
                    onChange={(e) => {
                        onFileUpload(e); // ファイルアップロード処理を呼び出す
                    }}
                />
                {addImage && <img src={addImage} alt="画像" width={500} height={500} />}
                <p className="text-lg mb-5">カテゴリ</p>
                <Input
                    value={addCategory}
                    type="text"
                    placeholder="カテゴリを入力"
                    onChange={(e) => setAddCategory(e.target.value)}
                />
                <p className="text-lg mb-5">備考</p>
                <textarea
                    value={addDescription}
                    placeholder="詳細を記載"
                    className="w-full"
                    onChange={(e) => setAddDescription(e.target.value)}
                />
                <div className="flex mt-auto w-full py-4">
                    <button
                        className="bg-orange-300 hover:bg-orange-400 text-white px-8 py-2 mx-auto"
                        onClick={sendTape}
                    >
                        登録
                    </button>
                    <button
                        className="bg-gray-300 hover:bg-gray-200 text-black px-8 py-2 mx-2"
                        onClick={props.onCancel}
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

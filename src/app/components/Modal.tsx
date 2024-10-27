import { Input } from "@mui/material";
import Image from "next/image";
import React from "react";

export type ModalProps = {
    open:boolean;
    onCancel:() => void;
    onOk:() => void;
};

const Modal =(props:ModalProps) => {
    return props.open ? (
        <>
        <div className="bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-70 p-5 flex flex-col items-start absolute z-20 rounded-lg shadow-lg">
            <h1 className="text-xl font-bold text-slate-800 mb-5">マスキングテープ登録</h1>
            <p className="text-lg mb-5">タイトル</p>
            <Input
            type="text"
            placeholder="タイトルを入力"
            />
            <Image
            src=""
            alt="画像"
            width={30}
            height={30}
            />
            <p className="text-lg mb-5">カテゴリ</p>
            <Input
            type="text"
            placeholder="カテゴリを入力"
            />

            <p className="text-lg mb-5">備考</p>
            <textarea placeholder="詳細を記載"
            className="w-full" />
            
            <div className="flex mt-auto w-full">
            <button
            className="bg-orange-300 hover:bg-orange-400 text-white px-8 py-2 mx-auto"
            onClick={() => props.onOk()} 
            >
                登録
            </button>
            <button
            className="bg-gray-300 hover:bg-gray-200 text-black px-8 py-2 mx-2"
            onClick={props.onCancel}
            >キャンセル
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
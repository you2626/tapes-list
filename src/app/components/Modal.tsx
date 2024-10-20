import React from "react";

export type ModalProps = {
    open:boolean;
    onCancel:() => void;
    onOk:() => void;
};

const Modal =(props:ModalProps) => {
    return props.open ? (
        <>
        <div className="bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-48 p-5 flex flex-col items-start absolute z-20 rounded-lg shadow-lg">
            <h1 className="text-xl font-bold mb-5">マスキングテープ登録</h1>
            <p className="text-lg mb-5">タイトル</p>
            <div className="flex mt-auto w-full">
            <button
            className="bg-slate-900 hover:bg-slate-700 text-white px-8 py-2 mx-auto"
            onClick={() => props.onOk()} 
            >
                登録
            </button>
            </div>
        </div>
        <div
        className="fixed bg-black bg-opacity-50 w-full h-full z-10"
        onClick={() => props.onCancel()}
        ></div>
        </>
    ) : (
        <></>
    );
};

export default Modal;
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { Input } from '@mui/material';

export type ModalProps = {
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
  imageSrc:string; 
  generatedId:string;
  initialTitle: string;
  initialCategory: string;
  initialDescription: string;
  onUpdate: (title: string, category: string, description: string) => void;
};

const UpdateModal = (props: ModalProps) => {

  const [updateTitle, setUpdateTitle] = useState(props.initialTitle || "");
  const [updateCategory, setUpdateCategory] = useState(props.initialCategory || "");
  const [updateDescription, setUpdateDescription] = useState(props.initialDescription || "");
  const [errorMessage, setErrorMessage] = useState("");

  // モーダルが開かれたときに初期値を設定
  useEffect(() => {
    if (props.open) {
      setUpdateTitle(props.initialTitle || "");
      setUpdateCategory(props.initialCategory || "");
      setUpdateDescription(props.initialDescription || "");
      setErrorMessage(""); // モーダルが開かれたときにエラーメッセージをリセット
    }
  }, [props.open, props.initialTitle, props.initialCategory, props.initialDescription]);
  
  const updateTape=async()=>{
    const docData = {
      id:props.generatedId,
      imageSrc: props.imageSrc,
      title: updateTitle,
      category: updateCategory,
      description: updateDescription,
      timestamp:serverTimestamp(),
    };
    
    try {
      await updateDoc(doc(db, "tapes", props.generatedId), docData);
      // 親コンポーネントの状態を更新
      props.onUpdate(updateTitle,updateCategory,updateDescription);
      props.onOk();
    } catch (error) {
      console.error("Error updating document:", error);
      setErrorMessage("更新に失敗しました。もう一度お試しください。");
    }
  };
  
  return props.open ? (
    <>
      <div className="bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-70 p-5 flex flex-col items-start absolute z-20 rounded-lg shadow-lg">
        <h1 className="text-xl font-bold mb-5">編集</h1>
        <p className="text-lg my-5">タイトル</p>
        <Input
        value={updateTitle}
        type="text"
        placeholder="タイトルを編集"
        onChange={(e) => setUpdateTitle(e.target.value)}
        />
        <p className="text-lg my-5">カテゴリ</p>
        <Input
        value={updateCategory}
        type="text"
        placeholder="カテゴリを編集"
        onChange={(e) => setUpdateCategory(e.target.value)}
        />
        <p className="text-lg my-5">備考</p>
        <textarea
        value={updateDescription}
        placeholder="詳細を編集"
        className="w-full border"
        onChange={(e) => setUpdateDescription(e.target.value)}
        />
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <div className="flex mt-auto w-full py-5">
            <button
            className="bg-orange-300 hover:bg-orange-400 text-white px-8 py-2 mx-auto"
            onClick={updateTape}
            >
            保存
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
      onClick={() => props.onCancel()}
      ></div>
    </>
  ) : null;
};

export default UpdateModal;

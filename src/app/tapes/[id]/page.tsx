"use client";

import Image from "next/image";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import TapeItem from "../../components/TapeItem";

const TapesDetail = () => {
    // URLのパラメーターを取得
    const searchParams = useSearchParams();
    //動的ルーティングのパラメーターを取得
    const id = useParams().id; 

        // 検索パラメーターに関連付けられたデータを取得（例としてデフォルト値を使用）
        const imageSrc = searchParams.get("src") ;
        const title = searchParams.get("title") || "デフォルトタイトル";
        const category = searchParams.get("category") || "デフォルトカテゴリ";
        const description = searchParams.get("description") || "デフォルトの説明";

    return (
        <div className="border">
           <TapeItem
              key={id} //動的idを使用
              imageSrc={imageSrc}
              title={title}
              category={category}
              description={description}
              />
              <h1>タイトル</h1>
                <p>ホワイト</p>
                <h4>カテゴリ</h4>
                <p>ノーマル</p>
                <h4>備考</h4>
                <p>15mm</p>
                <div>
                <button>編集</button>
                <button>削除</button>
                </div>
        </div>
    )
};

export default TapesDetail;
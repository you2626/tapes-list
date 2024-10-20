import Image from "next/image";

export default function Id (){
    return (
        <div>
             <Image
                src=""
                alt="マスキングテープ画像"
                width={30}
                height={30}
                />
                <h3>ホワイト</h3>
                <h4>カテゴリ</h4>
                <p>詳細内容</p>
                <button>編集</button>
                <button>削除</button>
        </div>
    )
}
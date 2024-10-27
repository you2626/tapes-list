import Image from "next/image";
import { Type } from "./Type";

const TapeItem: React.FC<Type>=({imageSrc,title,category})=>{
    return (
        <li className="border">
                <Image
                src={imageSrc}
                alt={`マスキングテープ画像:${title}`}
                width={700}
                height={700}
                className="object-cover"
                priority // 重要な画像にpriorityを追加
                />
                <h3 className="mt-2 text-lg font-semibold">{title}</h3>
                <h4 className="text-gray-500">{category}</h4>
            </li>
    );
};

export default TapeItem;
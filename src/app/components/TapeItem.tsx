import Image from "next/image";
import { Type } from "./Type";

interface TapeItemProps {
    imageSrc: string;
    title: string;
    category: string;
    description:string;
}

const TapeItem: React.FC<TapeItemProps>=({imageSrc,title,category,description})=>{
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
                <h3 className="mt-2 text-lg font-semibold text-gray-800">{title}</h3>
                <h4 className="text-gray-500">{category}</h4>
                <h4 className="text-gray-500">{description}</h4>

            </li>
    );
};

export default TapeItem;
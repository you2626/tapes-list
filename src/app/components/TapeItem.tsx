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
        <div className="border rounded-lg shadow-md">
                <Image
                src={imageSrc}
                alt={`マスキングテープ画像:${title}`}
                width={500}
                height={500}
                className="object-cover rounded-t-lg h-60 w-full"
                priority // 重要な画像にpriorityを追加
                />
                <h3 className="mt-2 pl-3 text-lg font-semibold text-gray-800">{title}</h3>
                <h4 className="pl-3 text-gray-500">{category}</h4>
                {/* <h4 className="text-gray-500">{description}</h4> */}

            </div>
    );
};

export default TapeItem;

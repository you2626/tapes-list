import Image from "next/image";

interface TapeItemProps {
    imageSrc: string;
    title: string;
    category: string;
    description:string;
}

const TapeItem: React.FC<TapeItemProps>=({imageSrc,title,category})=>{
    return (
        <div className="border rounded-lg shadow-md">
            <Image
            src={imageSrc}
            alt={`マスキングテープ画像:${title}`}
            width={500}
            height={500}
            className="object-cover rounded-t-lg h-60 w-full"
            priority
            />
            <h3 className="mt-2 pl-3 text-lg font-semibold text-gray-800">{title}</h3>
            <h4 className="pl-3 text-gray-500">{category}</h4>
        </div>
    );
};

export default TapeItem;

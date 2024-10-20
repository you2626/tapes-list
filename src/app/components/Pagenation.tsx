import React from "react";

/* currentPage:現在表示するページ番号
   limit:1件あたりに表示する件数
   count:全件数
   path:ページネーションを呼び出すページパス　*/

type Props={
    currentPage:number;
    limit:number;
    count:number;
    path:string;
};

export default function Pagenation({currentPage,limit,count,path}:Props) {
    const totalPages=Math.ceil(count / limit);
    let startPage=Math.max(1,currentPage - 2);
    let endPage=Math.min(totalPages,currentPage + 2);

    if(currentPage <=3) {
        endPage=Math.min(5,totalPages);
    } else if(currentPage >=totalPages - 2) {
        startPage=totalPages - 4;
    }

    const pageNumbers=[];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex items-center justify-center space-x-2">
            <a href={`${path}?p=${currentPage - 1}`} aria-label="Previous Page">
                <button
                className={`px-4 py-2 border rounded ${
                    currentPage === 1 || count < limit ? "cursor-not-allowed bg-gray-200" : "bg-blue-500 text-white"
                }`}
                disabled={currentPage === 1}
                >
                    ＜
                </button>
                </a>
                {pageNumbers.map((number)=>(
                    <a key={number} href={`${path}?p=${number}`}>
                        <button
                        className={`px-4 py-2 border rounded ${
                            currentPage === number ? "bg-indigo-500 text-white" : "bg-white text-black"
                        }`}
                        >
                            {number}
                        </button>
                    </a>
                ))}
                <a href={`${path}?p=${currentPage + 1}`} aria-label="Next Page">
                    <button
                    className={`px-4 py-2 border rounded ${
                        currentPage === totalPages || count < limit ? "cursor-not-allowed bg-gray-200" : "bg-blue-500 text-white"
                    }`}
                    disabled={currentPage === totalPages}
                    >
                        ＞
                    </button>
                </a>
        </div>
    );
};
import Link from "next/link";
import React, { useContext } from "react";

const Signup=()=>{

    return (
        <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg bg-gray-100">
            <h1 className="text-center text-2xl font-bold mb-4">
                新規登録
                </h1>
            <form>
            <label className="block mb-2">
                    My Name
                    <input name="myname" 
                    type="text" 
                    placeholder="nameを入力してください"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                </label>
                <label className="block mb-2">
                    Emaill
                    <input name="email" 
                    type="email" 
                    placeholder="emailを入力してください"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                </label>
                <label className="block mb-4">
                    Password
                    <input name="password" 
                    type="password" 
                    placeholder="passwordを入力してください"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                </label>
                <button type="submit"
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    新規登録
                    </button>
            </form>
            <div>
                <h2>
                    サインインは
                    <Link href={"/signin"}>こちら→</Link>
                </h2>
            </div>
        </div>
    );
};

export default Signup;
'use client';

import React, { useEffect,useState,useContext } from "react";
import { getAuth, onAuthStateChanged} from 'firebase/auth';

// コンテキストを作成
const AuthContext = React.createContext();

export function useAuth () {
    // useContextで作成したコンテキストを呼び出す
    return useContext(AuthContext);
}

// AuthProviderコンポーネント
export function AuthProvider({children}) {
    const [currentUser,setCurrentUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const auth = getAuth(); // Firebaseのauthを初期化

    // 第2引き数に[]を指定して、初回レンダリングのみ関数を実行
    useEffect(() => {
        // onAuthStateChangedでログインの状態を監視する
        const unsubscribe = onAuthStateChanged(auth,async user => {
            // ユーザー情報をcurrentUserに格納する
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe; // クリーンアップ関数
    },[auth]);

    const value = {
        currentUser,
    };

    // 全コンポーネントをラッピングするためのプロバイダー
    return (
        <AuthContext.Provider value = {value}>
            {!loading && children}
        </AuthContext.Provider>
    )
};
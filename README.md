# Masking Tape List（マスキングテープリスト）

## アプリ概要

マスキングテープをコレクションしている方向けで、マスキングテープをWebアプリで管理して、気軽に持ち運べるようにする。

文具博やマスキングテープメーカーのイベント等に行く際に、自分が持っているマスキングテープを把握できるようにメモ帳にマスキングテープを貼って管理している友人がいる。

持っているマスキングテープが100個を超えており、３冊のメモ帳を持ち歩いていた。

Webアプリにすることで気軽に持ち運ぶことができるので、現地で重複したマスキングテープを購入することもなくなると思い作成した。

## 工夫したこと、苦労したこと

- マスキングテープ画像が表示された際に見やすくするため、シンプルな見た目かつ統一感があるように工夫した。

- 登録、編集画面はダイアログを使い、ユーザーがわかりやすく使えるように工夫した。

- Firebaseのセキュリティルールを十分に理解しておらず、初めは適切なアクセス制限ができていなかった。
  そのため公式ドキュメント等を参考にし認証済みのユーザーだけが自分のファイルにアクセスできるように設定できた。

## 今後の実装予定

- 検索機能の追加（タイトル、カテゴリ）

  時間が不足し、実装に至らなかったので今後も機能追加できるよう取り組みたい。
  
### URL

https://maskingtapelist.vercel.app/

### テスト用IDとパスワード

ID（メールアドレス）：yffimr.ekab@gmail.com

パスワード：yffimr1114

### アプリ機能一覧
- マスキングテープ一覧表示
- マスキングテープ登録、編集、削除
- ログイン認証機能

### 使用言語・ツール
*フロントエンド*
- HTML / CSS
- JavaScript
- TypeScript
- React
- Next.js
- Material UI

*バックエンド*
- Firebase

*ツール*
- GitHub


![タイトル](https://github.com/user-attachments/assets/1f388bd5-3151-4771-ad4e-ecbb4f89641a)

![image000](https://github.com/user-attachments/assets/09fc5f68-4ba3-4e5a-a6c4-fa17e2f3d8ca)

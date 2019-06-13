## これはなに？

- React＋Redux のSPA実装サンプルです

- 技術要素として、以下が含まれます
   - ReactとReduxによるコンポーネントの分散管理
   - redux-saga による非同期処理のタスク化
   - react-redux-router によるルーティングの Redux 管理化
   - redux-persist による store の永続化

- サンプル題材として勤怠アプリを想定していますが、バックエンドAPIは本リポジトリに含まれません

## 使い方

- 事前準備： npm、git、テキストエディタ

```bash
# リポジトリの取得
git clone https://github.com/kawasaki-rcs/training-react-basic.git

cd training-react-basic

# パッケージのDL
npm install
```

- 環境設定ファイルを設定
   - `.env.default` を複製して`.env`にリネームしてから内容を編集

```bash
# bash の場合
cp .env.default .env
vim .env
```




- 実行

```bash
# ローカル環境での実行
npm start

```



## 備考

- このアプリは [Create React App](https://github.com/facebook/create-react-app) をベースに作成しています

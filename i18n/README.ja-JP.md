<div align='center'>
  <img src='https://github.com/qaz7456/compression-app/blob/main/front-end/images/sleep.gif' width='100' />
</div>

<div align='center'>
  <b><a href='../README.md' title='Read this page in English'>English</a></b>┃
  <b><a href='README.zh-CHS.md' title='用中文阅读此页面'>简体中文</a></b>┃
  <b><a href='README.zh-CHT.md' title='用中文閱讀此頁面'>繁體中文</a></b>┃
  <b><a href='README.ja-JP.md' title='このページを日本語で読む'>日本語</a></b>
</div>

## 📚 理由
> [*Electron*][2]フレームワークに基づいて開発。

*compression-app*はクロスプラットフォームの圧縮ツールです。

友達のクレームから生まれた、*macOS*環境でパスワードで暗号化して圧縮するのがなぜこんなに面倒なのかと彼女が僕に文句を言った

## 💻 開發者
- git から最新のコードを実行する場合は、次の方法で開始します。
```bash
# リポジトリのクローン
git clone https://github.com/qaz7456/compression-app.git

# 現在の場所を移動し、作業ディレクトリをプロジェクト ディレクトリに変更します
cd compression-app

# プロジェクトの依存関係をインストールする
npm install

# 開発モードの実行
npm start
```
- フロントエンドの *DevTools* を開く場合は、以下のコードのコメントを解除してください。
  - [DevTools for splash Window][4]
  - [DevTools for main Window][5]

## 📦 パッケージとビルド
> 基於[*electron-builder*][3]的打包。

|  命令  |  目的  |
|    ---    |   ---     |
|  npm run pack | 実行可能ファイルにパッケージ化  |
|  npm run dist  |  実行可能ファイルおよびインストール実行可能ファイルへのパッケージ化 |
|  npm run dist-all |  実行可能ファイルとインストーラーへのパッケージ化 (macOS、Windows) |


## 🕹️ 使い方
[](https://user-images.githubusercontent.com/25022140/182281916-a472cf4e-9dab-4b49-932b-499d2658ce88.webm)

## 📄 承認する
*compression-app* は Apache-2.0 のライセンス条項を採用しています。詳しくは [こちら][6] を参照してください。

[1]: https://github.com/qaz7456/compression-app/blob/main/front-end/images/sleep.gif
[2]: https://www.electronjs.org/docs/latest/
[3]: https://www.electron.build/
[4]: https://github.com/qaz7456/compression-app/blob/main/main.js#L41
[5]: https://github.com/qaz7456/compression-app/blob/main/main.js#L84
[6]: https://github.com/qaz7456/compression-app/blob/HEAD/LICENSE
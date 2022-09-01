<div align='center'>
  <img src='https://github.com/qaz7456/compression-app/blob/main/front-end/images/sleep.gif' width='100' />
</div>

<div align='center'>
  <b><a href='../README.md' title='Read this page in English'>English</a></b>┃
  <b><a href='README.zh-CHS.md' title='用中文阅读此页面'>简体中文</a></b>┃
  <b><a href='README.zh-CHT.md' title='用中文閱讀此頁面'>繁體中文</a></b>┃
  <b><a href='README.ja-JP.md' title='このページを日本語で読む'>日本語</a></b>
</div>

## 📚 起源
> 基於[*Electron*][2]框架開發。

*compression-app*是一個跨平台的壓縮工具。

它的誕生源自於朋友的抱怨，她向我抱怨說為什麼在*macOS*環境下，想要用密碼加密壓縮這麼麻煩。

## 💻 開發者
- 如果你想從 git 運行最新的代碼，這裡是如何開始的。
```bash
# 克隆存儲庫
git clone https://github.com/qaz7456/compression-app.git

# 移動當前位置，將工作目錄更改為專案目錄
cd compression-app

# 安裝專案依賴項
npm install

# 執行開發模式
npm start
```
- 如果要打開前端*DevTools*，請取消以下註解的代碼。
  - [DevTools for splash Window][4]
  - [DevTools for main Window][5]

## 📦 打包和構建
> 基於[*electron-builder*][3]的打包。

|  指令  |  目的  |
|    ---    |   ---     |
|  npm run pack | 打包成可執行檔  |
|  npm run dist  |  打包成可執行檔和安裝執行檔 |
|  npm run dist-all |  打包成可執行檔和安裝檔(macOS, Windows) |


## 🕹️ 如何使用
[](https://user-images.githubusercontent.com/25022140/182281916-a472cf4e-9dab-4b49-932b-499d2658ce88.webm)

## 📄 授權
*compression-app* 採用Apache-2.0授权条款，详情内容请参考[这里][6]。

[1]: https://github.com/qaz7456/compression-app/blob/main/front-end/images/sleep.gif
[2]: https://www.electronjs.org/docs/latest/
[3]: https://www.electron.build/
[4]: https://github.com/qaz7456/compression-app/blob/main/main.js#L41
[5]: https://github.com/qaz7456/compression-app/blob/main/main.js#L84
[6]: https://github.com/qaz7456/compression-app/blob/HEAD/LICENSE
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
> 基于[*Electron*][2]框架开发。

*compression-app*是一个跨平台的压缩工具。

它的诞生源自于朋友的抱怨，她向我抱怨说为什么在*macOS*环境下，想要用密码加密压缩这么麻烦。

## 💻 开发者
- 如果你想从 git 运行最新的代码，这里是如何开始的。
```bash
# 克隆存储库
git clone https://github.com/qaz7456/compression-app.git

# 移动当前位置，将工作目录更改为项目目录
cd compression-app

# 安装项目依赖项
npm install

# 执行开发模式
npm start
```
- 如果要打开前端*DevTools*，请取消以下注解的代码。
  - [DevTools for splash Window][4]
  - [DevTools for main Window][5]

## 📦 打包和构建
> 基于[*electron-builder*][3]的打包。

|  指令  |  目的  |
|    ---    |   ---     |
|  npm run pack | 打包成可执行档  |
|  npm run dist  |  打包成可执行档和安装执行档 |
|  npm run dist-all |  打包成可执行档和安装执行档(macOS, Windows) |


## 🕹️ 如何使用
[](https://user-images.githubusercontent.com/25022140/182281916-a472cf4e-9dab-4b49-932b-499d2658ce88.webm)

## 📄 授权
*compression-app* 采用Apache-2.0授權條款，詳情內容請參考[這裡][6]。

[1]: https://github.com/qaz7456/compression-app/blob/main/front-end/images/sleep.gif
[2]: https://www.electronjs.org/docs/latest/
[3]: https://www.electron.build/
[4]: https://github.com/qaz7456/compression-app/blob/main/main.js#L41
[5]: https://github.com/qaz7456/compression-app/blob/main/main.js#L84
[6]: https://github.com/qaz7456/compression-app/blob/HEAD/LICENSE
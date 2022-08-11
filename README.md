<div align='center'>
  <img src='https://github.com/qaz7456/compression-app/blob/main/front-end/images/sleep.gif' width='100' />
</div>

## 📚 Introduce
> Developed based on [*Electron*][2] framework.

*compression-app* is a cross-platform compression tool.

Inspired by a friend who complained to me about why encrypting compressed files on *macOS* is such a hassle.

## 💻 Developers
- If you want to run the latest code from git, here's how to get started.
```bash
# clone the repository
git clone https://github.com/qaz7456/compression-app.git

# change the working directory to compression-app
cd compression-app

# install the compression-app dependencies
npm install

# execute development mode
npm start
```
- If you want to open the front-end *DevTools*, uncomment the following code.
  - [DevTools for splash Window][4]
  - [DevTools for main Window][5]

## 📦 Package and build
> Packaging based on [*electron-builder*][3].

|  command  |  Purpose  |
|    ---    |   ---     |
|  npm run pack | Packaged into executable  |
|  npm run dist  |  Packaged into executable and installation files |
|  npm run dist-all |  Packaged into executable and installation files(macOS, Windows) |


## 🎊 How to use
[](https://user-images.githubusercontent.com/25022140/182281916-a472cf4e-9dab-4b49-932b-499d2658ce88.webm)

## 📄 License
*compression-app* is Apache-2.0 licensed, as found in the [LICENSE][6] file.

[1]: https://github.com/qaz7456/compression-app/blob/main/front-end/images/sleep.gif
[2]: https://www.electronjs.org/docs/latest/
[3]: https://www.electron.build/
[4]: https://github.com/qaz7456/compression-app/blob/main/main.js#L41
[5]: https://github.com/qaz7456/compression-app/blob/main/main.js#L84
[6]: https://github.com/qaz7456/compression-app/blob/HEAD/LICENSE

<div align='center'>
  <img src='https://github.com/qaz7456/compression-app/blob/main/front-end/images/sleep.gif' width='100' />
</div>

## Introduce
> Developed based on [*Electron*][2] framework.

*compression-app* is a cross-platform compression tool.

Inspired by a friend who complained to me about why encrypting compressed files on *macOS* is such a hassle.

## Quick start
```bash
npm install && npm start
```
## Developers
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
- If you want to open the front-end *DevTools*, uncomment the following [code][4].
```javascript
// splashWindow.webContents.openDevTools();
// mainWindow.webContents.openDevTools();
```

## Package and build
> Packaging based on [electron-builder][3].

|  command  |  Purpose  |
|    ---    |   ---     |
|  npm run pack | Packaged into executable  |
|  npm run dist  |  Packaged into executable and installation files |
|  npm run dist-all |  Packaged into executable and installation files(macOS, Windows) |


## How to use
[](https://user-images.githubusercontent.com/25022140/182281916-a472cf4e-9dab-4b49-932b-499d2658ce88.webm)

[1]: https://github.com/qaz7456/compression-app/blob/main/front-end/images/sleep.gif
[2]: https://www.electronjs.org/docs/latest/
[3]: https://www.electron.build/
[4]: https://github.com/qaz7456/compression-app/blob/e69852a2bbf8a71fc2a6c292bb81dfdfb9c9b832/main.js#L62-L64

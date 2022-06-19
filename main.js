const { app, ipcMain, dialog, BrowserWindow } = require('electron');
const fs = require('fs');
const archiver = require('archiver');
const path = require("path");
const pjson = require('./package.json');

// 主視窗
let mainWindow = null;

// 建立應用程式視窗的 function
function createWindow() {

    // 過度視窗設定
    const splashWindow = new BrowserWindow({
        width: 350,
        height: 360,
        transparent: true,
        autoHideMenuBar: true,
        frame: false
    });

    // 主視窗設定
    mainWindow = new BrowserWindow({
        autoHideMenuBar: true,
        title: `壓縮雞 v${pjson.version}`,
        width: 550,
        height: 600,
        resizable: false,
        show: false,
        icon: path.join(__dirname, 'build', 'icons', '32x32.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    // 載入html
    splashWindow.loadFile('html/splash.html');
    mainWindow.loadFile('html/index.html');

    mainWindow.once('ready-to-show', async () => {
        await sleep(3000);
        splashWindow.destroy();
        mainWindow.show();

        // 打開開發者模式
        // splashWindow.webContents.openDevTools();
        // mainWindow.webContents.openDevTools();
    });
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
//初始化並準備好創建窗口
app.whenReady().then(() => {
    createWindow();

    // 運用程式運行時，點擊工具列圖示時觸發（macOS）
    app.on('activate', function () {
        /**
         * Linux 和 Windows 應用程序在沒有打開窗口時會退出，
         * 而 macOS 應用程序通常會在沒有打開任何窗口的情況下繼續運行，
         * 並且在沒有可用窗口時激活應用程序應該打開一個新窗口
         */
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    });

    // register format for archiver
    // note: only do it once per Node.js process/application, as duplicate registration will throw an error
    archiver.registerFormat('zip-encrypted', require("archiver-zip-encrypted"));
});

//關閉所有視窗時觸發，除 macOS 以外
app.on('window-all-closed', function () {
    //darwin 為 macOS 的作業系統
    if (process.platform !== 'darwin') app.quit()
});

ipcMain.on('compressed-directory', (event) => {
    let directory = dialog.showOpenDialogSync({
        properties: ['openDirectory'],
    });
    directory = directory ? directory[0] : '請選擇壓縮檔存檔資料夾';
    event.reply('compressed-directory', directory);
});

ipcMain.on('compressed-files', (event, fileInfo) => {
    console.log('fileInfo', fileInfo);
    const {
        fileList,
        compressionType,
        compressionLevel,
        compressionOutputDirectory,
        compressionPwd,
        compressionName
    } = fileInfo;
    const savePath = path.join(compressionOutputDirectory, `${compressionName}.${compressionType}`);
    const output = fs.createWriteStream(savePath);

    let archive;

    if (compressionType == 'tar.gz') {
        archive = archiver(compressionType, {
            gzip: true
        });
    } else if (compressionPwd == '') {
        archive = archiver(compressionType, {
            zlib: { level: parseInt(compressionLevel) }
        });
    } else {
        archive = archiver.create(
            'zip-encrypted',
            {
                zlib: { level: parseInt(compressionLevel) },
                encryptionMethod: 'aes256',
                password: compressionPwd
            });
    }

    archive.on("progress", data => {
        const { processed } = data.entries;
        mainWindow.webContents.send('asyn-processed', processed);
    });

    // pipe archive data to the file
    archive.pipe(output);

    // append a file from stream
    const files = Object.values(fileList);
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        archive.append(fs.createReadStream(file), { name: path.basename(file) });
    }

    // finalize the archive (ie we are done appending files but streams have to finish yet)
    // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
    archive.finalize();
});
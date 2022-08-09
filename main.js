const { app, ipcMain, dialog, BrowserWindow } = require('electron');
const fs = require('fs');
const archiver = require('archiver');
const path = require("path");
const pjson = require('./package.json');

/**
 * 主操作畫面視窗
 */
let mainWindow = null;

/**
 * 工具函式: 非同步等待計時器
 * @param {number} ms 延迟的毫秒数 (一秒等于 1000 毫秒)
 */
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 初始化視窗(啟動/主操作畫面)
 */
function initializeMultipleWindows() {

    /**
     * 啟動畫面視窗
     */
    const splashWindow = new BrowserWindow({
        width: 370,
        height: 400,
        transparent: true,
        autoHideMenuBar: true,
        frame: false
    });

    // 初始化主操作畫面視窗
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

    // 視窗載入相對應檔案
    splashWindow.loadFile('html/splash.html');
    mainWindow.loadFile('html/index.html');

    // 當主操作畫面視窗準備好後，執行一次回調函式
    mainWindow.once('ready-to-show', async () => {
        /**
         * 當主操作畫面視窗準備好後，即可銷毀啟動畫面視窗，並顯示畫面，
         * 但為了避免主視窗準備過快，導致啟動畫面過快閃屏，先等待三秒再執行
         */
        await wait(3000);
        splashWindow.destroy();
        mainWindow.show();

        // 打開開發者模式
        // splashWindow.webContents.openDevTools();
        // mainWindow.webContents.openDevTools();
    });
}

// 當主程式準備好後，執行回調函式
app.whenReady().then(() => {

    // 初始化視窗(啟動/主操作畫面)
    initializeMultipleWindows();

    // 運用程式運行時，點擊工具列圖示時觸發（macOS）
    app.on('activate', function () {
        /**
         * Linux 和 Windows 應用程序在沒有打開窗口時會退出，
         * 而 macOS 應用程序通常會在沒有打開任何窗口的情況下繼續運行，
         * 並且在沒有可用窗口時激活應用程序應該打開一個新窗口
         */
        if (BrowserWindow.getAllWindows().length === 0) initializeMultipleWindows()
    });

    /**
     * 註冊存檔器的格式
     * 注意: 每個 Node.js 進程/應用程序只執行一次，因為重複註冊會引發錯誤
     */
    archiver.registerFormat('zip-encrypted', require("archiver-zip-encrypted"));
});

// 關閉所有視窗時觸發，除 macOS 以外
app.on('window-all-closed', function () {
    // darwin 為 macOS 的作業系統
    if (process.platform !== 'darwin') app.quit()
});

// 選擇檔案輸出目錄時觸發
ipcMain.on('compressed-directory', (event) => {
    let directory = dialog.showOpenDialogSync({
        properties: ['openDirectory'],
    });
    directory = directory ? directory[0] : '請選擇壓縮檔存檔資料夾';
    event.reply('compressed-directory', directory);
});

// 執行壓縮檔案時觸發
ipcMain.on('compressed-files', (event, fileInfo) => {
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

    // 視壓縮格式決定初始化方式
    switch (compressionType) {
        case '':
            archive = archiver(compressionType, {
                zlib: { level: parseInt(compressionLevel) }
            });
            break;
        case 'tar.gz':
            archive = archiver(compressionType, {
                gzip: true
            });
            break;
        default:
            archive = archiver.create('zip-encrypted', {
                zlib: { level: parseInt(compressionLevel) },
                encryptionMethod: 'aes256',
                password: compressionPwd
            });
    }

    // 初始化後建立管道連接
    archive.pipe(output);

    // 監聽處理進度，並傳回前端
    archive.on('progress', data => {
        const { processed } = data.entries;
        mainWindow.webContents.send('asyn-processed', processed);
    });

    // 遍歷檔案清單，將其轉為可寫流，且指定為壓縮檔案
    const files = Object.values(fileList);
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        archive.append(fs.createReadStream(file), { name: path.basename(file) });
    }

    /**
     * 完成壓縮(即使完成了附加文件，但流必須完成)
     * 注意: 'close'、'end' 或 'finish'等事件，可能會在調用此方法後立即觸發，因此請事先註冊它們
     */
    archive.finalize();
});
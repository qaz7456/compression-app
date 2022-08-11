const { ipcRenderer, contextBridge } = require('electron');

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

// White-listed channels.
const ipc = {
    'render': {
        // From render to main.
        'send': [
            'compressed-directory',
            'compressed-files',
            'env-info'
        ],
        // From main to render.
        'receive': [
            'compressed-directory',
            'compressed-files',
            'asyn-processed',
            'switch-language'
        ],
        // From render to main and back again.
        'sendReceive': []
    }
};

// Exposed protected methods in the render process.
contextBridge.exposeInMainWorld(
    // Allowed 'ipcRenderer' methods.
    'ipcRender', {
        // From render to main.
        send: (channel, args) => {
            let validChannels = ipc.render.send;
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, args);
            }
        },
        // From main to render.
        receive: (channel, listener) => {
            let validChannels = ipc.render.receive;
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender`.
                ipcRenderer.on(channel, (event, ...args) => listener(...args));
            }
        },
        // From render to main and back again.
        invoke: (channel, args) => {
            let validChannels = ipc.render.sendReceive;
            if (validChannels.includes(channel)) {
                return ipcRenderer.invoke(channel, args);
            }
        }
    }
);


// ipcRenderer.on('compressed-directory', (event, arg) => {
//   console.log(arg) // 印出 "貓咪肚子餓"
// });
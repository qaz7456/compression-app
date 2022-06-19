let fileInfo = {
    compressionType: 'zip',
    compressionLevel: 5,
    compressionOutputDirectory: '',
    compressionPwd: '',
    fileList: {}
};

document.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
});

document.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();

    for (const file of e.dataTransfer.files) {
        renderFile(file);
    }
});

document.getElementById('choose_file').onclick = function () {
    this.value = null;
};

document.getElementById('choose_file').onchange = (e) => {
    const file = e.target.files[0];
    renderFile(file);
}

$('ul').on('click', '.file_close', (e) => {
    const $li = $(e.target).closest('li');
    const key = $li.attr('id');
    $li.remove();
    delete fileInfo['fileList'][key];
    if (Object.keys(fileInfo['fileList']).length == 0) {
        $('.file-menu button').prop('disabled', true);
    }
});

$('.file-menu').on('click', 'button', (e) => {
    e.preventDefault();
    $('#compression_optin_modal').modal({
        escapeClose: false,
        clickClose: false,
        showClose: false,
        fadeDuration: 250
    });
    let date = new Date();
    const offset = date.getTimezoneOffset();
    date = new Date(date.getTime() - (offset * 60 * 1000));
    $('#compressionName').val(date.toISOString().split('T')[0]);
});

$('.password-wrapper').on('click', 'a', (e) => {
    e.preventDefault();
    const $group = $(e.target).closest('.input-group');
    const $input = $group.find('input');
    const $i = $group.find('i');
    const isText = $input.attr('type') == 'text';
    $input.attr('type', isText ? 'password' : 'text');
    $i.removeClass(isText ? 'fa-eye' : 'fa-eye-slash');
    $i.addClass(isText ? 'fa-eye-slash' : 'fa-eye');
    $('.modal .notify-yellow').addClass('visibility-hidden');
});

$('.modal_footer').on('click', '.btn-secondary', (e) => {
    e.preventDefault();
    $.modal.close();
});

$('.modal_footer').on('click', '.btn-info', (e) => {
    e.preventDefault();
    const $notify = $(e.target).closest('.modal').find('.notify-yellow');
    const $sapn = $notify.children('span').eq(1);
    if (fileInfo['compressionName'] == '') {
        $sapn.html('請輸入壓縮檔檔名');
        $notify.removeClass('visibility-hidden');
    } else if (fileInfo['compressionOutputDirectory'] == '') {
        $sapn.html('請選擇壓縮檔存檔資料夾');
        $notify.removeClass('visibility-hidden');
    } else if (Object.keys(fileInfo['fileList']).length == 0) {
        $sapn.html('請選擇要壓縮的檔案');
        $notify.removeClass('visibility-hidden');
    } else {
        window.ipcRender.send('compressed-files', fileInfo);
        $.modal.close();
        $('.loading').removeClass('display-none');
    }
});

$('#compressionLevel, #compressionType, #compressionPwd, #compressionName').on('change', function (event) {
    const key = $(event.target).attr('id');
    const val = $(event.target).val();
    fileInfo = {
        ...fileInfo,
        [key]: val,
    };
    if ('tar.gz' == val) {
        $('#compressionLevel, #compressionPwd').val('');
        $('#isRequirePwd').prop('checked', false);
        $('#compressionLevel, #isRequirePwd').prop('disabled', true);
        $('.password-wrapper').addClass('display-none');
        fileInfo = {
            ...fileInfo,
            compressionLevel: '',
        };
    }
    else {
        if ('compressionLevel' != key)
            $('#compressionLevel').val('5');
        $('#compressionLevel, #isRequirePwd').prop('disabled', false);
    }
    $('.modal .notify-yellow').addClass('visibility-hidden');
});

$('#isRequirePwd').on('change', function () {
    $('.password-wrapper').toggleClass('display-none');
    if (!this.checked) {
        const $pwd = $('#compressionPwd');
        const $group = $pwd.closest('.input-group');
        const $input = $group.find('input');
        const $i = $group.find('i');
        $pwd.val('');
        $input.attr('type', 'password');
        $i.removeClass('fa-eye');
        $i.addClass('fa-eye-slash');
    }
    $('.modal .notify-yellow').addClass('visibility-hidden');
});

$('#compressionOutputDirectory').on('click', function () {
    $('.modal .notify-yellow').addClass('visibility-hidden');
    window.ipcRender.send('compressed-directory');
});

$('#compression_optin_modal').on($.modal.BEFORE_CLOSE, function (event, modal) {
    $(event.target).find('form').trigger("reset");
    $('.password-wrapper').addClass('display-none');
    $('.modal .notify-yellow').addClass('visibility-hidden');
    $('#compressionOutputDirectory span').html('請選擇壓縮檔存檔資料夾');
    fileInfo = {
        ...fileInfo,
        compressionType: 'zip',
        compressionLevel: 5,
        compressionOutputDirectory: '',
        compressionPwd: '',
    };
});

window.ipcRender.receive('compressed-directory', (directory) => {
    $('#compressionOutputDirectory span').html(directory);
    if ('請選擇壓縮檔存檔資料夾' == directory) {
        directory = '';
    }
    fileInfo = {
        ...fileInfo,
        compressionOutputDirectory: directory,
    };
});

window.ipcRender.receive('asyn-processed', (processed) => {
    const keys = Object.keys(fileInfo['fileList']);
    let i = 0;
    const timeoutID = window.setInterval((() => {
        const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        i += getRandom(15, 30);
        i = i >= 100 ? 100 : i;
        $(`#${keys[processed - 1]} .inner_progress`).css('width', `${i}%`);
        if (i >= 100) {
            window.clearInterval(timeoutID);
            if (processed == keys.length) {
                $('.loading').addClass('display-none');
            }
        }
    }), 1000);
});

function renderFile(file) {
    if (typeof file === 'undefined' || Object.values(fileInfo['fileList']).includes(file?.path)) return;
    const uuid = generateUuid();
    const $container = $('.file_upload_list');
    const li = `
        <li id="${uuid}">
            <div class="file_item">
                <div class="format">
                    <p>${typeAnalysis(file)}</p>
                </div>
                <div class="file_progress">
                    <div class="file_info">
                        <div class="file_name">
                            ${file.name}
                        </div>
                        <div class="file_size_wrap">
                            <div class="file_size">${formatBytes(file.size)}</div>
                            <div class="file_close">X</div>
                        </div>
                    </div>
                    <div class="progress">
                        <div class="inner_progress" style="width: 0%;"></div>
                    </div>
                </div>
            </div>
        </li>`;
    $('ul').append($(li));
    $container.animate({
        scrollTop: $container.prop('scrollHeight')
    }, 1000);
    fileInfo['fileList'][uuid] = file.path;
    $('.file-menu button').prop('disabled', false);
}

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function typeAnalysis(file) {
    const mimeMap = new Map([
        ['audio/aac', 'AAC'],
        ['application/x-abiword', 'ABW'],
        ['application/x-freearc', 'ARC'],
        ['video/x-msvideo', 'AVI'],
        ['application/vnd.amazon.ebook', 'AZW'],
        ['application/octet-stream', 'BIN'],
        ['image/bmp', 'BMP'],
        ['application/x-bzip', 'BZ'],
        ['application/x-bzip2', 'BZ2'],
        ['application/x-csh', 'CSH'],
        ['text/css', 'CSS'],
        ['text/csv', 'CSV'],
        ['application/msword', 'DOC'],
        ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'DOCX'],
        ['application/vnd.ms-fontobject', 'EOT'],
        ['application/epub+zip', 'EPUB'],
        ['application/gzip', 'GZ'],
        ['image/gif', 'GIF'],
        ['text/html', 'HTML'],
        ['image/vnd.microsoft.icon', 'ICO'],
        ['text/calendar', 'ICS'],
        ['application/java-archive', 'JAR'],
        ['image/jpeg', 'JPEG'],
        ['text/javascript', 'JS'],
        ['application/json', 'JSON'],
        ['application/ld+json', 'JSONLD'],
        ['audio/midi', 'MIDI'],
        ['audio/x-midi', 'MIDI'],
        ['audio/mpeg', 'MP3'],
        ['video/mpeg', 'MPEG'],
        ['application/vnd.apple.installer+xml', 'MPKG'],
        ['application/vnd.oasis.opendocument.presentation', 'ODP'],
        ['application/vnd.oasis.opendocument.spreadsheet', 'ODS'],
        ['application/vnd.oasis.opendocument.text', 'ODT'],
        ['audio/ogg', 'OGA'],
        ['video/ogg', 'OGV'],
        ['application/ogg', 'OGX'],
        ['audio/opus', 'OPUS'],
        ['font/otf', 'OTF'],
        ['image/png', 'PNG'],
        ['application/pdf', 'PDF'],
        ['application/x-httpd-php', 'PHP'],
        ['application/vnd.ms-powerpoint', 'PPT'],
        ['application/vnd.openxmlformats-officedocument.presentationml.presentation', 'PPTX'],
        ['application/vnd.rar', 'RAR'],
        ['application/rtf', 'RTF'],
        ['application/x-sh', 'SH'],
        ['image/svg+xml', 'SVG'],
        ['application/x-shockwave-flash', 'SWF'],
        ['application/x-tar', 'TAR'],
        ['image/tiff', 'TIFF'],
        ['video/mp2t', 'TS'],
        ['font/ttf', 'TTF'],
        ['text/plain', 'TXT'],
        ['application/vnd.visio', 'VSD'],
        ['audio/wav', 'WAV'],
        ['audio/webm', 'WEBA'],
        ['video/webm', 'WEBM'],
        ['image/webp', 'WEBP'],
        ['font/woff', 'WOFF'],
        ['font/woff2', 'WOFF2'],
        ['application/xhtml+xml', 'XHTML'],
        ['application/vnd.ms-excel', 'XLS'],
        ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'XLSX'],
        ['application/xml', 'XML'],
        ['text/xml', 'XML'],
        ['application/vnd.mozilla.xul+xml', 'XUL'],
        ['application/zip', 'ZIP'],
        ['video/3gpp', '3GP'],
        ['audio/3gpp', '3GP'],
        ['video/3gpp2', '3G2'],
        ['audio/3gpp2', '3G2'],
        ['application/x-7z-compressed', '7Z']
    ]);
    let type = mimeMap.get(file.type);
    if (typeof type === 'undefined') {
        const fileName = file.name;
        type = fileName.includes('.') ? fileName.split('.').pop().toUpperCase() : 'FILE';
    }
    return type;
}

function generateUuid() {
    let d = Date.now();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
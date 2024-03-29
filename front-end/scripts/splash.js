(function () {
    const splash = ['../front-end/images/sleep.gif', '../front-end/images/rain.gif'];
    const index = Math.floor(Math.random() * splash.length);
    const userLang = navigator.language || navigator.userLanguage || ''; 
    const isZh = userLang.includes('zh');
    const isCht = isZh ? ['zh-TW', 'zh-CHT'].includes(userLang) : isZh;
    $('img').attr('src', splash[index]);
    $('label').html(
        index == 0 ? 
        isZh ? isCht ? '壓縮雞努力起床中Zzzz...' : '压缩鸡努力起床中Zzzz...' : 'Try to get up Zzzz...' : 
        isZh ? '再忙也要休息一下' : 'Life is but a span'
    );
    window.ipcRender.send('env-info', {isZh, isCht});
})();
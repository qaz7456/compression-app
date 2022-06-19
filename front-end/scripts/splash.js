(function () {
    let splash = ['../front-end/images/sleep.gif', '../front-end/images/rain.gif'];

    function loadSplash() {
        const index = getRandomIndex();
        document.querySelectorAll('img').forEach(function (tag) {
            tag.src = splash[index];
        });
        document.querySelectorAll('label').forEach(function (tag) {
            tag.innerHTML = index == 0 ? '壓縮雞努力起床中Zzzz...' : '再忙也要休息一下';
        });
    }

    function getRandomIndex() {
        return Math.floor(Math.random() * splash.length);
    }

    loadSplash();
})();
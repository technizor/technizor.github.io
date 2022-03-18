if (navigator.serviceWorker) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('https://technizor.dev/destiny/vow/sw.js')
    })
}
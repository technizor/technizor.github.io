if (navigator.serviceWorker) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/destiny/vow/sw.js', {scope: '/destiny/vow/'})
    })
}
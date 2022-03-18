if (navigator.serviceWorker) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js')
    })
}
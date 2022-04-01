function closeFn(id) {
    return () => document.getElementById(id).classList.remove('open')
}
function openFn(id) {
    return () => document.getElementById(id).classList.add('open')
}

window.addEventListener('load', function () {
    document.querySelectorAll('button[data-action="open"][data-target]').forEach(btn => {
        btn.onclick = openFn(btn.dataset.target)
    });
    document.querySelectorAll('button[data-action="close"][data-target]').forEach(btn => {
        btn.onclick = closeFn(btn.dataset.target)
    });
})
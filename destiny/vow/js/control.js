function closeFn(id) {
    return () => document.getElementById(id).classList.remove('open')
}
function openFn(id) {
    return () => document.getElementById(id).classList.add('open')
}
function toggleEncounter(btn, id) {
    return () => {
        let val = (Number(document.getElementById(id).dataset.encounter) + 2) % 4;
        document.getElementById(id).dataset.encounter = val;
        btn.textContent = val;
    }
}

window.addEventListener('load', function () {
    document.querySelectorAll('button[data-action="open"][data-target]').forEach(btn => {
        btn.onclick = openFn(btn.dataset.target)
    });
    document.querySelectorAll('button[data-action="close"][data-target]').forEach(btn => {
        btn.onclick = closeFn(btn.dataset.target)
    });
    document.querySelectorAll('button[data-action="encounter"]').forEach(btn => {
        btn.onclick = toggleEncounter(btn, btn.dataset.target)
    })
})
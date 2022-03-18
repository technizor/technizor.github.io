const MAX = 31;
const EVEN = 32;
const ODD = 33;
const ANY = 34;

function breedIvs() {
    'use strict';
    document.getElementById('breedOut').innerHTML = '';
    document.getElementById('breedButton').innerHTML = 'Calculating';
    document.getElementById('breedButton').disabled = true;
    var inputs = document.getElementById('breedForm').getElementsByTagName('input');
    var father = [0, 0, 0, 0, 0, 0];
    var mother = [0, 0, 0, 0, 0, 0];
    var spread = [0, 0, 0, 0, 0, 0];
    for (var i = 0; i < 6; i++) {
        var val = inputs[i].value;
        father[i] = parseInt(val, 10);
        if (isNaN(father[i])) {
            father[i] = 0;
            inputs[i].value = 0;
        } else if (father[i] < 0) {
            father[i] = 0;
            inputs[i + 6].value = 0;
        } else if (father[i] > MAX) {
            father[i] = MAX;
            inputs[i].value = MAX;
        }
    }
    for (var i = 0; i < 6; i++) {
        var val = inputs[i + 6].value;
        mother[i] = parseInt(val, 10);
        if (isNaN(mother[i])) {
            mother[i] = 0;
            inputs[i + 6].value = 0;
        } else if (mother[i] < 0) {
            mother[i] = 0;
            inputs[i + 6].value = 0;
        } else if (mother[i] > MAX) {
            mother[i] = MAX;
            inputs[i + 6].value = MAX;
        }
    }
    for (var i = 0; i < 6; i++) {
        var val = inputs[i + 12].value;
        spread[i] = parseInt(val, 10);
        if (isNaN(spread[i])) {
            if (val == 'x' || val == 'X') {
                spread[i] = ANY;
            } else if (val == 'e' || val == 'E') {
                spread[i] = EVEN;
            } else if (val == 'o' || val == 'O') {
                spread[i] = ODD;
            } else {
                spread[i] = ANY;
                inputs[i + 12].value = 'x';
            }
        } else if (spread[i] < 0) {
            spread[i] = 0;
            inputs[i + 12].value = 0;
        } else if (spread[i] > MAX) {
            spread[i] = MAX;
            inputs[i + 12].value = MAX;
        }
    }
    var lock = parseInt(inputs[18].value, 10);
    if (isNaN(lock)) {
        lock = 3;
        inputs[18].value = 3;
    } else if (lock != 5 && lock != 3) {
        lock = 3;
        inputs[18].value = 3;
    }

    var blob = new Blob([
        document.querySelector('#breedWorker').textContent
    ], {
        type: "text/javascript"
    });

    if (typeof (Worker) !== 'undefined') {
        var worker = new Worker(window.URL.createObjectURL(blob));
        worker.onmessage = function (event) {
            var nd = event.data.nd;
            breedUpdate(nd);
            worker.terminate();
        };
        var event = {
            lock: lock,
            spread: spread,
            father: father,
            mother: mother
        };
        worker.postMessage(event);
    } else {
        var aScript = document.createElement('script');
        aScript.setAttribute("id", "bScr");
        aScript.setAttribute("type", "text/javascript");
        aScript.setAttribute("src", windowURL.createObjectURL(blob));
        var nd = breed(lock, spread, father, mother);
        breedUpdate(nd);
        document.removeElementById("bScr");
    }
}

function breedUpdate(nd) {
    var p = Math.round(1000000.0 * nd[0] / nd[1]) / 10000;
    var g = gcd(nd[0], nd[1]);
    if (g > 1) {
        var rnd = [nd[0] / g, nd[1] / g];
        document.getElementById("breedOut").innerHTML = "Chance: " + nd[0] + "/" + nd[1] + " = " + rnd[0] + "/" + rnd[1] + ", approx. " + p + "%";
    } else {
        document.getElementById("breedOut").innerHTML = "Chance: " + nd[0] + "/" + nd[1] + ", approx. " + p + "%";
    }
    document.getElementById('breedButton').innerHTML = 'Calculate';
    document.getElementById('breedButton').disabled = false;
}


function generateIvs() {
    'use strict';
    document.getElementById('genOut').innerHTML = '';
    document.getElementById('genButton').innerHTML = 'Calculating';
    document.getElementById('genButton').disabled = true;
    var spread = [0, 0, 0, 0, 0, 0];
    var inputs = document.getElementById('genForm').getElementsByTagName('input');
    for (var i = 0; i < 6; i++) {
        var val = inputs[i].value;
        spread[i] = parseInt(val, 10);
        if (isNaN(spread[i])) {
            if (val == 'x' || val == 'X') {
                spread[i] = ANY;
            } else if (val == 'e' || val == 'E') {
                spread[i] = EVEN;
            } else if (val == 'o' || val == 'O') {
                spread[i] = ODD;
            } else {
                spread[i] = ANY;
                inputs[i].value = 'x';
            }
        } else if (spread[i] < 0) {
            spread[i] = 0;
            inputs[i].value = 0;
        } else if (spread[i] > MAX) {
            spread[i] = MAX;
            inputs[i].value = MAX;
        }
    }
    var lock = parseInt(inputs[6].value, 10);
    if (isNaN(lock)) {
        lock = 0;
        inputs[6].value = '0';
    } else if (lock < 0) {
        lock = 0;
        inputs[6].value = '0';
    } else if (lock > 6) {
        lock = 6;
        inputs[6].value = '6';
    }

    var blob = new Blob([
        document.querySelector('#generateWorker').textContent
    ], {
        type: "text/javascript"
    });

    if (typeof (Worker) !== 'undefined') {
        var worker = new Worker(window.URL.createObjectURL(blob));
        worker.onmessage = function (event) {
            var nd = event.data.nd;
            genUpdate(nd);
            worker.terminate();
        };
        var event = {
            lock: lock,
            spread: spread
        };
        worker.postMessage(event);
    } else {
        var aScript = document.createElement('script');
        aScript.setAttribute("id", "aScr");
        aScript.setAttribute("type", "text/javascript");
        aScript.setAttribute("src", windowURL.createObjectURL(blob));
        var nd = generate(lock, spread);
        genUpdate(nd);
        document.removeElementById("aScr");
    }
}

function genUpdate(nd) {
    var p = Math.round(1000000.0 * nd[0] / nd[1]) / 10000;
    var g = gcd(nd[0], nd[1]);
    if (g > 1) {
        var rnd = [nd[0] / g, nd[1] / g];
        document.getElementById("genOut").innerHTML = "Chance: " + nd[0] + "/" + nd[1] + " = " + rnd[0] + "/" + rnd[1] + ", approx. " + p + "%";
    } else {
        document.getElementById("genOut").innerHTML = "Chance: " + nd[0] + "/" + nd[1] + ", approx. " + p + "%";
    }
    document.getElementById('genButton').innerHTML = 'Calculate';
    document.getElementById('genButton').disabled = false;
}

function gcd(a, b) {
    if (a == 0) {
        return b;
    }
    if (b == 0) {
        return a;
    }
    return gcd(b, a % b);
}
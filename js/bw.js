const MAX = 31;
const EVEN = 32;
const ODD = 33;
const ANY = 34;
const FATHER = 32;
const MOTHER = 33;

onmessage = function (event) {
    breed(event.data.lock, event.data.spread, event.data.father, event.data.mother);
};

function breed(lock, spread, father, mother) {
    'use strict';
    var iv = [0, 0, 0, 0, 0, 0];
    var event = {
        nd: breed1(lock, spread, father, mother, iv, 0, 0)
    };
    postMessage(event);
    return event.data.nd;
}

function breed1(nm, ds, fs, ms, iv, mc, n) {
    'use strict';
    var nd = [0, 0];
    for (var stat = 0; stat <= MOTHER; stat++) {
        iv[n] = stat;
        if (iv[n] == MOTHER || iv[n] == FATHER) {
            mc++;
        }
        if (mc + 5 - n >= nm) {
            if (n < 5) {
                var cp = breed1(nm, ds, fs, ms, iv, mc, n + 1);
                nd[0] += cp[0];
                nd[1] += cp[1];
            } else if (mc == nm) {
                var p = true;
                for (var s = 0; p && s < 6; s++) {
                    var bs = iv[s];
                    if (bs == FATHER) {
                        bs = fs[s];
                    } else if (bs == MOTHER) {
                        bs = ms[s];
                    }
                    if ((ds[s] <= MAX && ds[s] != bs) || (ds[s] == EVEN && bs % 2 !== 0) || (ds[s] == ODD && bs % 2 !== 1)) {
                        p = false;
                    }
                }
                if (p) {
                    nd[0]++;
                }
                nd[1]++;
            }
        }
        if (iv[n] == MOTHER || iv[n] == FATHER) {
            mc--;
        }
    }
    return nd;
}
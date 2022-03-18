const MAX = 31;
const LOCK = 32;
const EVEN = 32;
const ODD = 33;
const ANY = 34;

onmessage = function (event) {
    generate(event.data.lock, event.data.spread);
};

function generate(lock, spread) {
    'use strict';
    var iv = [0, 0, 0, 0, 0, 0];
    var event = {
        nd: generate1(lock, spread, iv, 0, 0)
    };
    postMessage(event);
    return event.data.nd;
}

function generate1(nm, ds, iv, mc, n) {
    'use strict';
    var nd = [0, 0];
    for (var stat = 0; stat <= LOCK; stat++) {
        iv[n] = stat;
        if (iv[n] == LOCK) {
            mc++;
        }
        if (mc + 5 - n >= nm) {
            if (n < 5) {
                var cp = generate1(nm, ds, iv, mc, n + 1);
                nd[0] += cp[0];
                nd[1] += cp[1];
            } else if (mc == nm) {
                var p = true;
                for (var s = 0; p && s < 6; s++) {
                    var bs = iv[s];
                    if (bs == LOCK) {
                        bs = MAX;
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
        if (iv[n] == LOCK) {
            mc--;
        }
    }
    return nd;
}
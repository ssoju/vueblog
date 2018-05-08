// Get the cookie value by key.
function get(key, decoder = decodeURIComponent) {
    const value = parse(document.cookie)

    if (!value || !value[key]) {
        return ''
    }

    return typeof decoder === 'function' ? decoder(value[key]) : value[key];
}

// Set a cookie.
function set(key, value, attrs, encoder = encodeURIComponent) {
    const newCookie = make(document.cookie, key, value, attrs, encoder)
    document.cookie = newCookie;
}

// Remove a cookie by the specified key.
function remove(key, options) {
    const opts = { expires: -1 };

    if (options && options.domain) {
        opts.domain = options.domain;
    }

    return set(key, 'a', opts);
}

function parse(cookie) {
    if (!cookie) {
        return null;
    }

    const reKey = new RegExp(`(?:^|; )*([^=]+)=([^;$]*)(?:;|$)`, 'gi');
    let match
    let result = {}
    let looped = false

    while (match = reKey.exec(cookie)) {
        looped = true
        result[match[1].trim()] = match[2]
    }

    return looped ? result : null
}

function make(cookie, key, value, attrs, encoder = encodeURIComponent) {
    if (typeof encoder === 'object' && encoder !== null) {
        /* eslint-disable no-param-reassign */
        attrs = encoder;
        encoder = encodeURIComponent;
        /* eslint-enable no-param-reassign */
    }
    const attrsStr = convert(attrs || {});
    const valueStr = typeof encoder === 'function' ? encoder(value) : value;
    const newCookie = `${key}=${valueStr}${attrsStr}`;

    return newCookie
}

function hasOwn(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}

// Escape special characters.
function escapeRe(str) {
    return str.replace(/[.*+?^$|[\](){}\\-]/g, '\\$&');
}

// Return a future date by the given string.
function computeExpires(str) {
    const lastCh = str.charAt(str.length - 1);
    const value = parseInt(str, 10);
    let expires = new Date();

    switch (lastCh) {
        case 'Y': expires.setFullYear(expires.getFullYear() + value); break;
        case 'M': expires.setMonth(expires.getMonth() + value); break;
        case 'D': expires.setDate(expires.getDate() + value); break;
        case 'h': expires.setHours(expires.getHours() + value); break;
        case 'm': expires.setMinutes(expires.getMinutes() + value); break;
        case 's': expires.setSeconds(expires.getSeconds() + value); break;
        default: expires = new Date(str);
    }

    return expires;
}

// Convert an object to a cookie option string.
function convert(opts) {
    let res = '';

    // eslint-disable-next-line
    for (const key in opts) {
        if (hasOwn(opts, key)) {
            if (/^expires$/i.test(key)) {
                let expires = opts[key];

                if (typeof expires !== 'object') {
                    expires += typeof expires === 'number' ? 'D' : '';
                    expires = computeExpires(expires);
                }
                res += `;${key}=${expires.toUTCString()}`;
            } else if (/^secure$/.test(key)) {
                if (opts[key]) {
                    res += `;${key}`;
                }
            } else {
                res += `;${key}=${opts[key]}`;
            }
        }
    }

    if (!hasOwn(opts, 'path')) {
        res += ';path=/';
    }

    return res;
}

export default {
    get, set, remove, parse, make
}

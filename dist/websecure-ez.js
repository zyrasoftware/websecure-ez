"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presets = void 0;
exports.createSecureMiddleware = createSecureMiddleware;
exports.sanitizeInput = sanitizeInput;
exports.applyCookieDefaults = applyCookieDefaults;
exports.generateNonce = generateNonce;
const server_1 = require("next/server");
const defaultConfig = {
    contentSecurityPolicy: {
        enabled: true,
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", 'data:', 'https:'],
            connectSrc: ["'self'"],
            fontSrc: ["'self'", 'https:', 'data:'],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            frameSrc: ["'none'"],
            childSrc: ["'self'"],
            workerSrc: ["'self'"],
            manifestSrc: ["'self'"],
            formAction: ["'self'"],
            frameAncestors: ["'none'"],
            baseUri: ["'self'"],
            upgradeInsecureRequests: true,
        },
        reportOnly: false,
    },
    xFrameOptions: {
        enabled: true,
        option: 'DENY',
    },
    secureCookies: {
        enabled: true,
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
    },
    referrerPolicy: {
        enabled: true,
        policy: 'strict-origin-when-cross-origin',
    },
    permissionsPolicy: {
        enabled: true,
        features: {
            camera: "'none'",
            microphone: "'none'",
            geolocation: "'none'",
            'payment': "'none'",
            'usb': "'none'",
            'vr': "'none'",
            'magnetometer': "'none'",
            'gyroscope': "'none'",
            'speaker': "'none'",
            'vibrate': "'none'",
        },
    },
    xContentTypeOptions: {
        enabled: true,
    },
    xssProtection: {
        enabled: true,
        mode: 'block',
    },
    hsts: {
        enabled: true,
        maxAge: 31536000, // 1 year
        includeSubDomains: true,
        preload: true,
    },
    expectCt: {
        enabled: false,
        maxAge: 86400, // 24 hours
        enforce: false,
    },
    crossOriginEmbedderPolicy: {
        enabled: false,
        policy: 'unsafe-none',
    },
    crossOriginOpenerPolicy: {
        enabled: false,
        policy: 'same-origin-allow-popups',
    },
    crossOriginResourcePolicy: {
        enabled: false,
        policy: 'same-site',
    },
};
function createSecureMiddleware(config = {}) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27;
    // Merge with default config
    const mergedConfig = {
        contentSecurityPolicy: Object.assign(Object.assign(Object.assign({ enabled: (_d = (_b = (_a = config.contentSecurityPolicy) === null || _a === void 0 ? void 0 : _a.enabled) !== null && _b !== void 0 ? _b : (_c = defaultConfig.contentSecurityPolicy) === null || _c === void 0 ? void 0 : _c.enabled) !== null && _d !== void 0 ? _d : false }, defaultConfig.contentSecurityPolicy), config.contentSecurityPolicy), { directives: Object.assign(Object.assign({}, (_e = defaultConfig.contentSecurityPolicy) === null || _e === void 0 ? void 0 : _e.directives), (_f = config.contentSecurityPolicy) === null || _f === void 0 ? void 0 : _f.directives) }),
        xFrameOptions: Object.assign(Object.assign({ enabled: (_k = (_h = (_g = config.xFrameOptions) === null || _g === void 0 ? void 0 : _g.enabled) !== null && _h !== void 0 ? _h : (_j = defaultConfig.xFrameOptions) === null || _j === void 0 ? void 0 : _j.enabled) !== null && _k !== void 0 ? _k : false }, defaultConfig.xFrameOptions), config.xFrameOptions),
        secureCookies: Object.assign(Object.assign({ enabled: (_p = (_m = (_l = config.secureCookies) === null || _l === void 0 ? void 0 : _l.enabled) !== null && _m !== void 0 ? _m : (_o = defaultConfig.secureCookies) === null || _o === void 0 ? void 0 : _o.enabled) !== null && _p !== void 0 ? _p : false }, defaultConfig.secureCookies), config.secureCookies),
        referrerPolicy: Object.assign(Object.assign({ enabled: (_t = (_r = (_q = config.referrerPolicy) === null || _q === void 0 ? void 0 : _q.enabled) !== null && _r !== void 0 ? _r : (_s = defaultConfig.referrerPolicy) === null || _s === void 0 ? void 0 : _s.enabled) !== null && _t !== void 0 ? _t : false }, defaultConfig.referrerPolicy), config.referrerPolicy),
        permissionsPolicy: Object.assign(Object.assign(Object.assign({ enabled: (_x = (_v = (_u = config.permissionsPolicy) === null || _u === void 0 ? void 0 : _u.enabled) !== null && _v !== void 0 ? _v : (_w = defaultConfig.permissionsPolicy) === null || _w === void 0 ? void 0 : _w.enabled) !== null && _x !== void 0 ? _x : false }, defaultConfig.permissionsPolicy), config.permissionsPolicy), { features: Object.assign(Object.assign({}, (_y = defaultConfig.permissionsPolicy) === null || _y === void 0 ? void 0 : _y.features), (_z = config.permissionsPolicy) === null || _z === void 0 ? void 0 : _z.features) }),
        xContentTypeOptions: Object.assign(Object.assign({ enabled: (_3 = (_1 = (_0 = config.xContentTypeOptions) === null || _0 === void 0 ? void 0 : _0.enabled) !== null && _1 !== void 0 ? _1 : (_2 = defaultConfig.xContentTypeOptions) === null || _2 === void 0 ? void 0 : _2.enabled) !== null && _3 !== void 0 ? _3 : false }, defaultConfig.xContentTypeOptions), config.xContentTypeOptions),
        xssProtection: Object.assign(Object.assign({ enabled: (_7 = (_5 = (_4 = config.xssProtection) === null || _4 === void 0 ? void 0 : _4.enabled) !== null && _5 !== void 0 ? _5 : (_6 = defaultConfig.xssProtection) === null || _6 === void 0 ? void 0 : _6.enabled) !== null && _7 !== void 0 ? _7 : false }, defaultConfig.xssProtection), config.xssProtection),
        hsts: Object.assign(Object.assign({ enabled: (_11 = (_9 = (_8 = config.hsts) === null || _8 === void 0 ? void 0 : _8.enabled) !== null && _9 !== void 0 ? _9 : (_10 = defaultConfig.hsts) === null || _10 === void 0 ? void 0 : _10.enabled) !== null && _11 !== void 0 ? _11 : false }, defaultConfig.hsts), config.hsts),
        expectCt: Object.assign(Object.assign({ enabled: (_15 = (_13 = (_12 = config.expectCt) === null || _12 === void 0 ? void 0 : _12.enabled) !== null && _13 !== void 0 ? _13 : (_14 = defaultConfig.expectCt) === null || _14 === void 0 ? void 0 : _14.enabled) !== null && _15 !== void 0 ? _15 : false }, defaultConfig.expectCt), config.expectCt),
        crossOriginEmbedderPolicy: Object.assign(Object.assign({ enabled: (_19 = (_17 = (_16 = config.crossOriginEmbedderPolicy) === null || _16 === void 0 ? void 0 : _16.enabled) !== null && _17 !== void 0 ? _17 : (_18 = defaultConfig.crossOriginEmbedderPolicy) === null || _18 === void 0 ? void 0 : _18.enabled) !== null && _19 !== void 0 ? _19 : false }, defaultConfig.crossOriginEmbedderPolicy), config.crossOriginEmbedderPolicy),
        crossOriginOpenerPolicy: Object.assign(Object.assign({ enabled: (_23 = (_21 = (_20 = config.crossOriginOpenerPolicy) === null || _20 === void 0 ? void 0 : _20.enabled) !== null && _21 !== void 0 ? _21 : (_22 = defaultConfig.crossOriginOpenerPolicy) === null || _22 === void 0 ? void 0 : _22.enabled) !== null && _23 !== void 0 ? _23 : false }, defaultConfig.crossOriginOpenerPolicy), config.crossOriginOpenerPolicy),
        crossOriginResourcePolicy: Object.assign(Object.assign({ enabled: (_27 = (_25 = (_24 = config.crossOriginResourcePolicy) === null || _24 === void 0 ? void 0 : _24.enabled) !== null && _25 !== void 0 ? _25 : (_26 = defaultConfig.crossOriginResourcePolicy) === null || _26 === void 0 ? void 0 : _26.enabled) !== null && _27 !== void 0 ? _27 : false }, defaultConfig.crossOriginResourcePolicy), config.crossOriginResourcePolicy),
    };
    return function middleware(request) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        const response = server_1.NextResponse.next();
        const headers = response.headers;
        // Apply Content-Security-Policy
        if ((_a = mergedConfig.contentSecurityPolicy) === null || _a === void 0 ? void 0 : _a.enabled) {
            const directives = mergedConfig.contentSecurityPolicy.directives;
            if (directives) {
                const cspParts = [];
                Object.entries(directives).forEach(([key, value]) => {
                    if (key === 'upgradeInsecureRequests' && value === true) {
                        cspParts.push('upgrade-insecure-requests');
                    }
                    else if (key === 'blockAllMixedContent' && value === true) {
                        cspParts.push('block-all-mixed-content');
                    }
                    else if (Array.isArray(value) && value.length > 0) {
                        // Convert camelCase to kebab-case
                        const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
                        cspParts.push(`${kebabKey} ${value.join(' ')}`);
                    }
                });
                if (cspParts.length > 0) {
                    const cspValue = cspParts.join('; ');
                    const headerName = mergedConfig.contentSecurityPolicy.reportOnly
                        ? 'Content-Security-Policy-Report-Only'
                        : 'Content-Security-Policy';
                    headers.set(headerName, cspValue);
                }
            }
        }
        // Apply X-Frame-Options
        if (((_b = mergedConfig.xFrameOptions) === null || _b === void 0 ? void 0 : _b.enabled) && mergedConfig.xFrameOptions.option) {
            headers.set('X-Frame-Options', mergedConfig.xFrameOptions.option);
        }
        // Apply Referrer-Policy
        if (((_c = mergedConfig.referrerPolicy) === null || _c === void 0 ? void 0 : _c.enabled) && mergedConfig.referrerPolicy.policy) {
            headers.set('Referrer-Policy', mergedConfig.referrerPolicy.policy);
        }
        // Apply Permissions-Policy
        if (((_d = mergedConfig.permissionsPolicy) === null || _d === void 0 ? void 0 : _d.enabled) && mergedConfig.permissionsPolicy.features) {
            const features = mergedConfig.permissionsPolicy.features;
            const permissionsValue = Object.entries(features)
                .map(([feature, value]) => {
                if (Array.isArray(value)) {
                    return `${feature}=(${value.join(' ')})`;
                }
                return `${feature}=${value}`;
            })
                .join(', ');
            if (permissionsValue) {
                headers.set('Permissions-Policy', permissionsValue);
            }
        }
        // Apply X-Content-Type-Options
        if ((_e = mergedConfig.xContentTypeOptions) === null || _e === void 0 ? void 0 : _e.enabled) {
            headers.set('X-Content-Type-Options', 'nosniff');
        }
        // Apply X-XSS-Protection
        if ((_f = mergedConfig.xssProtection) === null || _f === void 0 ? void 0 : _f.enabled) {
            const mode = mergedConfig.xssProtection.mode || 'block';
            let xssValue = '1';
            if (mode === 'block') {
                xssValue += '; mode=block';
            }
            else if (mode === 'report' && mergedConfig.xssProtection.reportUri) {
                xssValue += `; report=${mergedConfig.xssProtection.reportUri}`;
            }
            headers.set('X-XSS-Protection', xssValue);
        }
        // Apply HSTS (HTTP Strict Transport Security)
        if (((_g = mergedConfig.hsts) === null || _g === void 0 ? void 0 : _g.enabled) && request.nextUrl.protocol === 'https:') {
            let hstsValue = `max-age=${mergedConfig.hsts.maxAge || 31536000}`;
            if (mergedConfig.hsts.includeSubDomains) {
                hstsValue += '; includeSubDomains';
            }
            if (mergedConfig.hsts.preload) {
                hstsValue += '; preload';
            }
            headers.set('Strict-Transport-Security', hstsValue);
        }
        // Apply Expect-CT
        if ((_h = mergedConfig.expectCt) === null || _h === void 0 ? void 0 : _h.enabled) {
            let expectCtValue = `max-age=${mergedConfig.expectCt.maxAge || 86400}`;
            if (mergedConfig.expectCt.enforce) {
                expectCtValue += ', enforce';
            }
            if (mergedConfig.expectCt.reportUri) {
                expectCtValue += `, report-uri="${mergedConfig.expectCt.reportUri}"`;
            }
            headers.set('Expect-CT', expectCtValue);
        }
        // Apply Cross-Origin-Embedder-Policy
        if ((_j = mergedConfig.crossOriginEmbedderPolicy) === null || _j === void 0 ? void 0 : _j.enabled) {
            headers.set('Cross-Origin-Embedder-Policy', mergedConfig.crossOriginEmbedderPolicy.policy || 'unsafe-none');
        }
        // Apply Cross-Origin-Opener-Policy
        if ((_k = mergedConfig.crossOriginOpenerPolicy) === null || _k === void 0 ? void 0 : _k.enabled) {
            headers.set('Cross-Origin-Opener-Policy', mergedConfig.crossOriginOpenerPolicy.policy || 'same-origin-allow-popups');
        }
        // Apply Cross-Origin-Resource-Policy
        if ((_l = mergedConfig.crossOriginResourcePolicy) === null || _l === void 0 ? void 0 : _l.enabled) {
            headers.set('Cross-Origin-Resource-Policy', mergedConfig.crossOriginResourcePolicy.policy || 'same-site');
        }
        return response;
    };
}
function sanitizeInput(input) {
    if (typeof input !== 'string') {
        throw new Error('Input must be a string');
    }
    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/\//g, '&#x2F;');
}
function applyCookieDefaults(options = {}) {
    return Object.assign({ httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' }, options);
}
// Utility function to generate nonce for CSP
function generateNonce() {
    const buffer = new Uint8Array(16);
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
        crypto.getRandomValues(buffer);
    }
    else {
        // Fallback for environments without crypto.getRandomValues
        for (let i = 0; i < buffer.length; i++) {
            buffer[i] = Math.floor(Math.random() * 256);
        }
    }
    return btoa(String.fromCharCode(...buffer));
}
// Preset configurations for common use cases
exports.presets = {
    strict: {
        contentSecurityPolicy: {
            enabled: true,
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'"],
                styleSrc: ["'self'"],
                imgSrc: ["'self'", 'data:'],
                connectSrc: ["'self'"],
                fontSrc: ["'self'"],
                objectSrc: ["'none'"],
                mediaSrc: ["'none'"],
                frameSrc: ["'none'"],
                frameAncestors: ["'none'"],
                baseUri: ["'self'"],
                upgradeInsecureRequests: true,
            },
        },
        xFrameOptions: { enabled: true, option: 'DENY' },
        hsts: { enabled: true, maxAge: 31536000, includeSubDomains: true, preload: true },
        xContentTypeOptions: { enabled: true },
        referrerPolicy: { enabled: true, policy: 'strict-origin-when-cross-origin' },
    },
    moderate: {
        contentSecurityPolicy: {
            enabled: true,
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                imgSrc: ["'self'", 'data:', 'https:'],
                connectSrc: ["'self'"],
                fontSrc: ["'self'", 'https:', 'data:'],
                objectSrc: ["'none'"],
                upgradeInsecureRequests: true,
            },
        },
        xFrameOptions: { enabled: true, option: 'SAMEORIGIN' },
        hsts: { enabled: true, maxAge: 31536000 },
        xContentTypeOptions: { enabled: true },
        referrerPolicy: { enabled: true, policy: 'strict-origin-when-cross-origin' },
    },
};
const websecureEz = {
    createSecureMiddleware,
    sanitizeInput,
    applyCookieDefaults,
    generateNonce,
    presets: exports.presets,
};
exports.default = websecureEz;
//# sourceMappingURL=websecure-ez.js.map
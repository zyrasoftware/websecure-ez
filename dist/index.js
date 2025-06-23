"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.presets = exports.generateNonce = exports.applyCookieDefaults = exports.sanitizeInput = exports.createSecureMiddleware = void 0;
// Main exports for websecure-ez package
var websecure_ez_1 = require("./websecure-ez");
Object.defineProperty(exports, "createSecureMiddleware", { enumerable: true, get: function () { return websecure_ez_1.createSecureMiddleware; } });
Object.defineProperty(exports, "sanitizeInput", { enumerable: true, get: function () { return websecure_ez_1.sanitizeInput; } });
Object.defineProperty(exports, "applyCookieDefaults", { enumerable: true, get: function () { return websecure_ez_1.applyCookieDefaults; } });
Object.defineProperty(exports, "generateNonce", { enumerable: true, get: function () { return websecure_ez_1.generateNonce; } });
Object.defineProperty(exports, "presets", { enumerable: true, get: function () { return websecure_ez_1.presets; } });
// Re-export everything as default for convenience
var websecure_ez_2 = require("./websecure-ez");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return __importDefault(websecure_ez_2).default; } });
//# sourceMappingURL=index.js.map
import { NextRequest, NextResponse } from 'next/server';
export interface WebSecureConfig {
    contentSecurityPolicy?: {
        enabled: boolean;
        directives?: {
            defaultSrc?: string[];
            scriptSrc?: string[];
            styleSrc?: string[];
            imgSrc?: string[];
            connectSrc?: string[];
            fontSrc?: string[];
            objectSrc?: string[];
            mediaSrc?: string[];
            frameSrc?: string[];
            childSrc?: string[];
            workerSrc?: string[];
            manifestSrc?: string[];
            formAction?: string[];
            frameAncestors?: string[];
            baseUri?: string[];
            upgradeInsecureRequests?: boolean;
            blockAllMixedContent?: boolean;
        };
        reportOnly?: boolean;
        reportUri?: string;
    };
    xFrameOptions?: {
        enabled: boolean;
        option?: 'DENY' | 'SAMEORIGIN' | string;
    };
    secureCookies?: {
        enabled: boolean;
        httpOnly?: boolean;
        secure?: boolean;
        sameSite?: 'Strict' | 'Lax' | 'None';
    };
    referrerPolicy?: {
        enabled: boolean;
        policy?: 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url';
    };
    permissionsPolicy?: {
        enabled: boolean;
        features?: Record<string, string | string[]>;
    };
    xContentTypeOptions?: {
        enabled: boolean;
    };
    xssProtection?: {
        enabled: boolean;
        mode?: 'block' | 'report';
        reportUri?: string;
    };
    hsts?: {
        enabled: boolean;
        maxAge?: number;
        includeSubDomains?: boolean;
        preload?: boolean;
    };
    expectCt?: {
        enabled: boolean;
        maxAge?: number;
        enforce?: boolean;
        reportUri?: string;
    };
    crossOriginEmbedderPolicy?: {
        enabled: boolean;
        policy?: 'unsafe-none' | 'require-corp';
    };
    crossOriginOpenerPolicy?: {
        enabled: boolean;
        policy?: 'unsafe-none' | 'same-origin-allow-popups' | 'same-origin';
    };
    crossOriginResourcePolicy?: {
        enabled: boolean;
        policy?: 'same-site' | 'same-origin' | 'cross-origin';
    };
}
export declare function createSecureMiddleware(config?: Partial<WebSecureConfig>): (request: NextRequest) => NextResponse<unknown>;
export declare function sanitizeInput(input: string): string;
export interface CookieOptions {
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
    maxAge?: number;
    path?: string;
    domain?: string;
    expires?: Date;
    [key: string]: unknown;
}
export declare function applyCookieDefaults(options?: CookieOptions): CookieOptions;
export declare function generateNonce(): string;
export declare const presets: {
    strict: Partial<WebSecureConfig>;
    moderate: Partial<WebSecureConfig>;
};
declare const websecureEz: {
    createSecureMiddleware: typeof createSecureMiddleware;
    sanitizeInput: typeof sanitizeInput;
    applyCookieDefaults: typeof applyCookieDefaults;
    generateNonce: typeof generateNonce;
    presets: {
        strict: Partial<WebSecureConfig>;
        moderate: Partial<WebSecureConfig>;
    };
};
export default websecureEz;
//# sourceMappingURL=websecure-ez.d.ts.map
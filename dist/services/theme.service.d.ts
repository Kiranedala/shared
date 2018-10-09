import { EventEmitter, Renderer2 } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
export declare const enum WinTheme {
    DARK = 0,
    DEFAULT = 1,
    CONTRAST = 2,
}
export declare class ThemeService {
    private renderer;
    private cookieService;
    private static THEME_URLS;
    private currentTheme;
    onThemeChanged: EventEmitter<WinTheme>;
    constructor(renderer: Renderer2, cookieService: CookieService);
    getThemeValue(themeValue: any): WinTheme;
    getCurrentTheme(): WinTheme;
    setTheme(theme: WinTheme): void;
}

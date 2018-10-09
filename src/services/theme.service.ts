  import {EventEmitter, Injectable, Renderer2} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

export const enum WinTheme {
  DARK = 0,
  DEFAULT = 1,
  CONTRAST = 2
}

@Injectable()
export class ThemeService {
  private static THEME_URLS = {
    [WinTheme.DEFAULT]: './src/scss/styles-light.css',
    [WinTheme.DARK]: './src/scss/styles-dark.css',
    [WinTheme.CONTRAST]: './src/scss/styles-contrast.css'
  };

  private currentTheme = WinTheme.DEFAULT;

  public onThemeChanged: EventEmitter<WinTheme> = new EventEmitter<WinTheme>();

  constructor(private renderer: Renderer2, private cookieService: CookieService) {
  }

  getThemeValue(themeValue:any): WinTheme {
    let themeVal = WinTheme.DEFAULT;
    if(themeValue == "0") {
      themeVal =  WinTheme.DARK;
    } else if(themeValue == "2") {
      themeVal = WinTheme.CONTRAST;
    }
    return themeVal;
  }

  public getCurrentTheme(): WinTheme {
    const themeValue = this.cookieService.get('themeValue');
    return this.getThemeValue(themeValue);
  }

  public setTheme(theme: WinTheme) {
    let link = document.getElementById('pagestyle');
    if (link === null) {
      link = this.renderer.createElement('link');
      this.renderer.setAttribute(link, 'id', 'pagestyle');
      this.renderer.setAttribute(link, 'rel', 'stylesheet');
    }

    // Update the page style
    const themeUrl = ThemeService.THEME_URLS[theme];
    link.setAttribute('href', themeUrl);
    document.querySelector('head').appendChild(link);
    // Save selection to cookie
    let cookieVal = this.getThemeValue(theme);
    this.cookieService.set('themeValue', cookieVal.toString(), 0, '/');

    var body = document.getElementsByTagName('body')[0];
    if (theme == 0) {
      body.setAttribute("class", "dark");
    } else if(theme == 1) {
      body.setAttribute("class", "light");
    } else {
      body.setAttribute("class", "light contrast");
    }
 
    // Alert others
    this.onThemeChanged.emit(theme);
  }

}

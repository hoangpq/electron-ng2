///<reference path="../typings/browser.d.ts"/>

// can be use node_modules
import {
    enableProdMode
}                           from '@angular/core';
import {bootstrap}          from '@angular/platform-browser-dynamic'
import {
    HTTP_PROVIDERS,
    JSONP_PROVIDERS
}                           from '@angular/http'
import {AppComponent}       from './app.component'

const env = process.env['NODE_ENV'];

if (env == 'production') {
    enableProdMode();
}

// inject modules
bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    JSONP_PROVIDERS
]);
import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { provideHttpClient } from '@angular/common/http';
import { App } from './app';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { provideOAuthClient } from 'angular-oauth2-oidc';

@NgModule({
  declarations: [App, LandingpageComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideOAuthClient()
  ],
  bootstrap: [App],
})
export class AppModule {}

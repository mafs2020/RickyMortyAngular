import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalInterceptor } from './pages/global.interceptor';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
// import { GeneroEsPipe } from './pages/pipes/genero-es.pipe';

@NgModule({
  declarations: [
    AppComponent,
    // GeneroEsPipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [{multi: true, provide: HTTP_INTERCEPTORS, useClass: GlobalInterceptor}],
  bootstrap: [AppComponent]
})
export class AppModule { }

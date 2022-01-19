import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpconfigService } from './core/interceptors/httpconfig.service';
import { CoreModule } from './core/core.module'; 

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    SharedModule,
    CoreModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy, },
    { provide: HTTP_INTERCEPTORS, useClass: HttpconfigService,multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

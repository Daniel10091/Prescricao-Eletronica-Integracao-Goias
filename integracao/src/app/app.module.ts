import { NgModule } from '@angular/core';

import { AppLayoutModule } from './layout/app.layout.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TabMenuModule } from 'primeng/tabmenu';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // BrowserModule,
    // HttpClientModule,
    AppRoutingModule,
    AppLayoutModule,

    TabMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

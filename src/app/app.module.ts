import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {BackendService} from './backend.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [{
    provide: BackendService,
    useClass: BackendService
  }],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {

}

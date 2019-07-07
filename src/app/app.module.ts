import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { AppComponent } from "./app.component";
import { appRoutes } from "./app.routes";
import { BackendService } from "./backend.service";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [BackendService],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {}

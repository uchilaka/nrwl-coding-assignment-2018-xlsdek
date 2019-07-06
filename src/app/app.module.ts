import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BackendService } from './backend.service';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketListItemComponent } from './ticket-list-item/ticket-list-item.component';
import { TicketComponent } from './ticket/ticket.component';

@NgModule({
  declarations: [
    AppComponent,
    TicketListComponent,
    TicketListItemComponent,
    TicketComponent
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

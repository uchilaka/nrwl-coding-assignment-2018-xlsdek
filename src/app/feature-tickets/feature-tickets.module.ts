import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { TicketComponent } from './ticket/ticket.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketListItemComponent } from './ticket-list-item/ticket-list-item.component';
import { featureTicketRoutes } from './ticket.routes';
import { EffectsModule } from '@ngrx/effects';
import { TicketEffects } from './+store/ticket.effects';
import { StoreModule } from '@ngrx/store';
import { featureTicketReducer } from './+store/ticket.reducer';

@NgModule({
  declarations: [
    TicketListItemComponent,
    TicketListComponent,
    TicketComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(featureTicketRoutes),
    EffectsModule.forFeature([TicketEffects]),
    StoreModule.forFeature('tickets', featureTicketReducer),
  ],
  exports: [
    TicketListComponent,
    TicketListItemComponent
  ],
  providers: [
    
  ]
})
export class FeatureTicketsModule { }

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
    StoreModule.forFeature('tickets', {}),
    EffectsModule.forFeature([TicketEffects])
  ],
  exports: [
    TicketListComponent,
    TicketListItemComponent
  ]
})
export class FeatureTicketsModule { }

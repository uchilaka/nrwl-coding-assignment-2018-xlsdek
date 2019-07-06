import { createReducer, on } from "@ngrx/store";
import { TicketEntityState, ticketEntityAdapter } from "../models";
import * as TicketActions from './ticket.actions';

export const intialTicketEntityState: TicketEntityState = {
  ids: [],
  entities: {}
};

export const featureTicketReducer = createReducer<TicketEntityState>(
  intialTicketEntityState, 
  on(TicketActions.ClearTickets, (state) => ticketEntityAdapter.removeAll(state)),
  on(TicketActions.LoadTicketsSuccess, (state, { tickets }) => ticketEntityAdapter.upsertMany(tickets, state)),
  on(TicketActions.UpdateTicketSearchTermSuccess, (state, { q }) => {
     return {
       ...state,
       searchTerm: q
     };
  })
);

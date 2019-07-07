import { createReducer, on } from "@ngrx/store";
import { ticketEntityAdapter, TicketEntityState } from "../models";
import * as TicketActions from "./ticket.actions";

export const intialTicketEntityState: TicketEntityState = {
  ids: [],
  entities: {}
};

export const featureTicketReducer = createReducer<TicketEntityState>(
  intialTicketEntityState,
  on(TicketActions.ClearTickets, state => ticketEntityAdapter.removeAll(state)),
  on(TicketActions.SelectTicketSuccess, (state, { ticket }) => ({
    ...ticketEntityAdapter.upsertOne(ticket, state),
    selectedTicketId: ticket.id
  })),
  on(TicketActions.LoadTicketsSuccess, (state, { tickets }) =>
    ticketEntityAdapter.upsertMany(tickets, state)
  ),
  on(TicketActions.UpdateTicketSearchTermSuccess, (state, { q }) => {
    return {
      ...state,
      searchTerm: q
    };
  }),
  on(TicketActions.AddTicketSuccess, (state, { ticket }) =>
    ticketEntityAdapter.addOne(ticket, state)
  ),
  on(TicketActions.UpdateTicket, (state, { ticket }) =>
    ticketEntityAdapter.upsertOne(ticket, state)
  ),
  on(TicketActions.AssignTicketSuccess, (state, { ticket }) =>
    ticketEntityAdapter.updateOne(
      { id: ticket.id, changes: { assigneeId: ticket.assigneeId } },
      state
    )
  ),
  on(TicketActions.CompleteTicketSuccess, (state, { ticket }) =>
    ticketEntityAdapter.updateOne(
      { id: ticket.id, changes: { completed: ticket.completed } },
      state
    )
  )
);

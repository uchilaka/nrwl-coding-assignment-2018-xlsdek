import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TicketEntityState, ticketEntityAdapter } from "../models";

export const getTicketFeatureState = createFeatureSelector<TicketEntityState>(
  "tickets"
);

const { selectAll } = ticketEntityAdapter.getSelectors<TicketEntityState>(
  getTicketFeatureState
);

export const getAllTickets = selectAll;

export const getTickets = createSelector(
  getTicketFeatureState,
  selectAll,
  (state, listOfEntities) => {
    const queryString = state.searchTerm;
    if (!queryString) {
      return listOfEntities;
    }
    // Found search term
    const regEx = new RegExp(queryString, "gi");
    return listOfEntities.filter(ticket => regEx.test(ticket.description));
  }
);

export const getLastTicketId = createSelector(
  getTicketFeatureState,
  state => state.ids[state.ids.length - 1]
);

export const getSelectedTicket = createSelector(
  getTicketFeatureState,
  state => state.entities[state.selectedTicketId]
);

import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TicketEntityState, ticketEntityAdapter } from "../models";

export const getTicketFeatureState = createFeatureSelector<TicketEntityState>('tickets');

const { selectAll } = ticketEntityAdapter.getSelectors<TicketEntityState>(getTicketFeatureState);

export const getTickets = createSelector(
  getTicketFeatureState,
  selectAll,
  (state, listOfEntities) => {
    const queryString = state.searchTerm;
    if(!queryString) {
      return listOfEntities;
    }
    // Found search term
    const regEx = new RegExp(queryString, 'gi');
    return listOfEntities.filter(ticket => regEx.test(ticket.description));
  }
);

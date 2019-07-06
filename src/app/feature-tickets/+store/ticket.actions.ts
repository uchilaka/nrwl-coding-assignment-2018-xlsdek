import { createAction, props } from "@ngrx/store";
import { Ticket, User } from "../models";

export const AddTicket = createAction('Add ticket', props<{ ticket: Ticket }>());
export const AddTicketSuccess = createAction('Add ticket success', props<{ ticket: Ticket }>());
export const AddTicketFailure = createAction('Add ticket failure');

export const SearchTickets = createAction('Search tickets', props<{ q: string }>());
export const SearchTicketResults = createAction('Search ticket results', props<{ tickets: Ticket[] }>());
export const SearchTicketFailure = createAction('Search ticket failure');

export const AssignTicket = createAction('Assign ticket', props<{ ticketId: number, userId: number }>());
export const AssignTicketSuccess = createAction('Assign ticket success', props<{ ticket: Ticket, assignee: User }>());
export const AssignTicketFailure = createAction('Assign ticket failure');

export const CompleteTicket = createAction('Complete ticket', props<{ ticketId: number }>());
export const CompleteTicketSuccess = createAction('Complete ticket success', props());
export const CompleteTicketFailure = createAction('Complete ticket failure');

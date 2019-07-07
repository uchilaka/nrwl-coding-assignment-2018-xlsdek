import { createAction, props } from "@ngrx/store";
import { Ticket, User } from "../models";

export const ClearTickets = createAction("Clear tickets");

export const LoadTickets = createAction("Load tickets");
export const LoadTicketsSuccess = createAction(
  "Load tickets success",
  props<{ tickets: Ticket[] }>()
);
export const LoadTicketFailure = createAction(
  "Load ticket failure",
  props<{ error: any }>()
);

export const SelectTicket = createAction(
  "Select ticket",
  props<{ ticketId: number }>()
);
export const SelectTicketSuccess = createAction(
  "Select ticket success",
  props<{ ticket: Ticket }>()
);
export const SelectTicketFailure = createAction(
  "Select ticket success",
  props<{ error: any }>()
);

/**
 * Ticket add actions
 */
export const AddTicket = createAction(
  "Add ticket",
  props<{ ticket: Ticket }>()
);
export const AddTicketSuccess = createAction(
  "Add ticket success",
  props<{ ticket: Ticket }>()
);
export const AddTicketFailure = createAction(
  "Add ticket failure",
  props<{ error: any }>()
);

/**
 * Ticket update actions
 */
export const UpdateTicket = createAction(
  "Update ticket",
  props<{ ticket: Ticket }>()
);
export const UpdateTicketSuccess = createAction(
  "Update ticket success",
  props<{ ticket: Ticket }>()
);
export const UpdateTicketFailure = createAction("Update ticket failure");

/**
 * Ticket search actions
 */
export const UpdateTicketSearchTerm = createAction(
  "Update ticket search term",
  props<{ q: string }>()
);
export const UpdateTicketSearchTermSuccess = createAction(
  "Update ticket search term success",
  props<{ q: string }>()
);
export const UpdateTicketSearchTermFailure = createAction(
  "Update ticket search term failure",
  props<{ error: any }>()
);

export const AssignTicket = createAction(
  "Assign ticket",
  props<{ ticketId: number; userId: number }>()
);
export const AssignTicketSuccess = createAction(
  "Assign ticket success",
  props<{ ticket: Ticket }>()
);
export const AssignTicketFailure = createAction(
  "Assign ticket failure",
  props<{ error: any }>()
);

export const CompleteTicket = createAction(
  "Complete ticket",
  props<{ ticketId: number }>()
);
export const CompleteTicketSuccess = createAction(
  "Complete ticket success",
  props<{ ticket: Ticket }>()
);
export const CompleteTicketFailure = createAction(
  "Complete ticket failure",
  props<{ error: any }>()
);

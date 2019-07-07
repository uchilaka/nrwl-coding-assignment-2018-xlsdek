import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { forkJoin, of } from "rxjs";
import { map, switchMap, tap, catchError } from "rxjs/operators";
import { BackendService } from "../../backend.service";
import { TicketEntityState } from "../models";
import * as TicketActions from "./ticket.actions";
import { Router } from "@angular/router";

@Injectable()
export class TicketEffects {
  loadTickets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.LoadTickets),
      switchMap(action => this.service.tickets()),
      map(tickets => TicketActions.LoadTicketsSuccess({ tickets }))
    )
  );

  updateSearchTerm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.UpdateTicketSearchTerm),
      tap(action =>
        this.store.dispatch(
          TicketActions.UpdateTicketSearchTermSuccess({ q: action.q })
        )
      ),
      map(({ q }) => TicketActions.LoadTickets()),
      catchError(error =>
        of(TicketActions.UpdateTicketSearchTermFailure({ error }))
      )
    )
  );

  addTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.AddTicket),
      switchMap(({ ticket }) =>
        this.service.newTicket({ description: ticket.description })
      ),
      tap(ticket => console.warn("New ticket:", ticket)),
      map(ticket => TicketActions.AddTicketSuccess({ ticket })),
      tap(() => this.router.navigate(["/tickets"])),
      catchError(error => of(TicketActions.AddTicketFailure({ error })))
    )
  );

  selectTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.SelectTicket),
      switchMap(({ ticketId }) => this.service.ticket(ticketId)),
      map(ticket => TicketActions.SelectTicketSuccess({ ticket })),
      catchError(error => of(TicketActions.SelectTicketFailure({ error })))
    )
  );

  assignTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.AssignTicket),
      switchMap(({ ticketId, userId }) =>
        this.service.assign(ticketId, userId)
      ),
      map(ticket => TicketActions.AssignTicketSuccess({ ticket })),
      tap(() => this.router.navigate(["/tickets"])),
      catchError(error => of(TicketActions.AssignTicketFailure({ error })))
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<TicketEntityState>,
    private router: Router,
    private service: BackendService
  ) {}
}

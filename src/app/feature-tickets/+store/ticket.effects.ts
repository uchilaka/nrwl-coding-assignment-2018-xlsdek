import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { forkJoin, of } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { BackendService } from "../../backend.service";
import { TicketEntityState } from "../models";
import * as TicketActions from './ticket.actions';

@Injectable()
export class TicketEffects {
  // loadTickets$ = createEffect(() => this.actions$.pipe(
  //   ofType(TicketActions.LoadTickets),
  //   switchMap(action => forkJoin([of(action.q), this.service.tickets()])),
  //   map(([q, tickets]) => {
  //     if(!q) {
  //       return TicketActions.LoadTicketsSuccess({ tickets });
  //     }
  //     const filteredTickets = tickets.filter(ticket => new RegExp(q, 'gi').test(ticket.description));
  //     return TicketActions.LoadTicketsSuccess({ tickets: filteredTickets });
  //   })
  // ));

  loadTickets$ = createEffect(() => this.actions$.pipe(
    ofType(TicketActions.LoadTickets),
    switchMap(action => this.service.tickets()),
    map(tickets => TicketActions.LoadTicketsSuccess({ tickets }))
  ));

  updateSearchTerm$ = createEffect(() => this.actions$.pipe(
    ofType(TicketActions.UpdateTicketSearchTerm),
    tap(action => this.store.dispatch(TicketActions.UpdateTicketSearchTermSuccess({ q: action.q }))),
    map(({ q }) => TicketActions.LoadTickets({ q }))
  ));

  constructor(
    private actions$: Actions,
    private store: Store<TicketEntityState>,
    private service: BackendService
  ) {}
}
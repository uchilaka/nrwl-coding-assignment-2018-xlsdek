import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy
} from "@angular/core";
import { select, Store } from "@ngrx/store";
import { BehaviorSubject, fromEvent, Observable, Subject } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom
} from "rxjs/operators";
import * as TicketActions from "../+store/ticket.actions";
import { getTickets } from "../+store/ticket.selectors";
import { BackendService } from "../../backend.service";
import { Ticket, TicketEntityState, User } from "../models";

@Component({
  selector: "app-ticket-list",
  templateUrl: "./ticket-list.component.html",
  styleUrls: ["./ticket-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketListComponent implements OnInit, OnDestroy {
  isBusy$ = new BehaviorSubject(true);
  onDestroy$ = new Subject();
  @ViewChild("search") searchInput: ElementRef<HTMLInputElement>;
  /**
   * Search term
   */
  term: string;
  /**
   * Obs of tickets
   */
  tickets$ = this.store.pipe(select(getTickets)).pipe(
    tap(() => {
      // this.isBusy$.next(false);
    })
  );

  /**
   * Obs of users
   */
  private _users$ = this.backend.users().pipe(
    takeUntil(this.onDestroy$),
    tap(users => {
      this.userList$.next(users);
      // this.isBusy$.next(false);
    })
  );
  /**
   * User lookup
   */
  userList$ = new BehaviorSubject<User[]>([]);
  /**
   * Obs for search input
   */
  runSearch$: any;

  isCompleteEvent$ = new EventEmitter<Ticket>();

  getAssignee$(id: number): Observable<User> {
    return this.userList$
      .asObservable()
      .pipe(switchMap(users => users.filter(user => user.id === id)));
  }

  clearTickets() {
    this.store.dispatch(TicketActions.ClearTickets());
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }

  ngOnInit() {
    /**
     * Configure and subscribe to ticket search (input) event
     */
    this.runSearch$ = fromEvent(this.searchInput.nativeElement, "keyup").pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.onDestroy$),
      tap(() => {
        this.store.dispatch(
          TicketActions.UpdateTicketSearchTerm({ q: this.term })
        );
      })
    );
    this.runSearch$.subscribe();

    /**
     * Subscribe to ticket completion event
     */
    this.isCompleteEvent$
      .pipe(
        tap(ticket => {
          this.isBusy$.next(true);
          this.store.dispatch(
            TicketActions.CompleteTicket({ ticketId: ticket.id })
          );
        })
      )
      .subscribe();
  }

  constructor(
    private backend: BackendService,
    private store: Store<TicketEntityState>
  ) {
    /**
     * Manage busy state
     */
    this.tickets$
      .pipe(
        withLatestFrom(this._users$),
        filter(([_, users]) => !!users && !!users.length),
        tap(() => {
          this.isBusy$.next(false);
        })
      )
      .subscribe();

    this.store.dispatch(TicketActions.LoadTickets());
  }
}

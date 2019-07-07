import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from "@angular/core";
import { select, Store } from "@ngrx/store";
import { fromEvent, Subject, of, Observable, BehaviorSubject } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  takeUntil,
  tap,
  withLatestFrom,
  filter,
  map,
  switchMap
} from "rxjs/operators";
import * as TicketActions from "../+store/ticket.actions";
import { getTickets } from "../+store/ticket.selectors";
import { BackendService } from "../../backend.service";
import { TicketEntityState, User } from "../models";

@Component({
  selector: "app-ticket-list",
  templateUrl: "./ticket-list.component.html",
  styleUrls: ["./ticket-list.component.scss"]
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
  tickets$ = this.store.pipe(select(getTickets));
  /**
   * Obs of users
   */
  private _users$ = this.backend.users().pipe(
    takeUntil(this.onDestroy$),
    tap(users => {
      this.userList$.next(users);
      this.isBusy$.next(false);
    })
  );
  /**
   * User lookup
   */
  userList$ = new BehaviorSubject<User[]>([]);

  runSearch$: any;

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
  }

  constructor(
    private backend: BackendService,
    private store: Store<TicketEntityState>
  ) {
    this._users$.subscribe();
    this.store.dispatch(TicketActions.LoadTickets());
  }
}

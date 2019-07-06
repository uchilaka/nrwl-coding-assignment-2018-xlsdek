import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { fromEvent, Subject, of, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil, tap, filter, withLatestFrom, map } from 'rxjs/operators';
import * as TicketActions from '../+store/ticket.actions';
import { BackendService } from '../../backend.service';
import { TicketEntityState } from '../models';
import { getTickets } from '../+store/ticket.selectors';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit, OnDestroy {
  onDestroy$ = new Subject();
  term: string;
  @ViewChild('search') searchInput: ElementRef<HTMLInputElement>;
  private queryString$ = new BehaviorSubject(this.term);

  // tickets = this.backend.tickets();
  tickets = this.store.pipe(select(getTickets));
  users = this.backend.users();

  runSearch$: any;

  clearTickets() {
    this.store.dispatch(TicketActions.ClearTickets());
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }

  ngOnInit() {
    this.runSearch$ = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.onDestroy$),
      tap(() => 
        this.store.dispatch(TicketActions.UpdateTicketSearchTerm({ q: this.term }))
      )
    );
    this.runSearch$.subscribe();
  }
  
  constructor(
    private backend: BackendService,
    private store: Store<TicketEntityState>
  ) {
    this.store.dispatch(TicketActions.LoadTickets({ q: this.term }));
  }

}

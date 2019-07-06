import { Component, OnInit, Inject, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { BackendService } from '../../backend.service';
import { fromEvent, Subject } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, tap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit, OnDestroy {
  onDestroy$ = new Subject();
  term: string;
  @ViewChild('search') searchInput: ElementRef<HTMLInputElement>;

  tickets = this.backend.tickets();
  users = this.backend.users();

  runSearch$;

  ngOnDestroy() {
    this.onDestroy$.next();
  }

  ngOnInit() {
    this.runSearch$ = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.onDestroy$),
      tap(() => {
        console.warn('Search for:', this.term);
      })
    );
    this.runSearch$.subscribe();
  }
  
  constructor(@Inject(BackendService) private backend: BackendService) {
    // this.runSearch$.subscribe();
  }

}

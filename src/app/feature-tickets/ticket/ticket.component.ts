import { Component, Inject, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { BackendService } from "../../backend.service";
import { Ticket, TicketEntityState } from "../models";
import { Store, select } from "@ngrx/store";
import * as TicketActions from "../+store/ticket.actions";
import { getLastTicketId, getSelectedTicket } from "../+store/ticket.selectors";
import { ActivatedRoute } from "@angular/router";
import {
  map,
  tap,
  filter,
  switchMap,
  defaultIfEmpty,
  takeUntil
} from "rxjs/operators";
import { of, Subject, BehaviorSubject } from "rxjs";

@Component({
  selector: "app-ticket",
  templateUrl: "./ticket.component.html",
  styleUrls: ["./ticket.component.scss"]
})
export class TicketComponent implements OnInit, OnDestroy {
  isBusy$ = new BehaviorSubject(true);
  onDestroy$ = new Subject();

  users$ = this.service.users();

  ticketForm = this.b.group({
    id: [""],
    assigneeId: [""],
    description: ["", Validators.required]
  });

  ticketId$ = this.route.paramMap.pipe(
    map(params => (params.has("ticketId") ? params.get("ticketId") : "")),
    filter(ticketId => !!ticketId),
    tap(ticketId => {
      // this.ticketForm.patchValue({ id: ticketId });
      if (!!ticketId) {
        this.store.dispatch(
          TicketActions.SelectTicket({ ticketId: Number(ticketId) })
        );
      } else {
        this.isBusy$.next(false);
      }
    }),
    filter(ticketId => !!ticketId),
    map(ticketId => ticketId)
  );

  ticket$ = this.store.pipe(select(getSelectedTicket)).pipe(
    // takeUntil(this.onDestroy$),
    filter(ticket => !!ticket),
    tap(ticket => {
      console.warn("Selected ticket:", ticket);
      this.isBusy$.next(false);
      this.ticketForm.patchValue(ticket);
    })
  );

  addTicket(ticket: Ticket) {
    this.store.dispatch(TicketActions.AddTicket({ ticket }));
  }

  /**
   * Only supports ticket assignments
   */
  saveTicket(ticket: Ticket) {
    this.store.dispatch(
      TicketActions.AssignTicket({
        ticketId: ticket.id,
        userId: ticket.assigneeId
      })
    );
  }

  submit(ticket: Ticket) {
    this.isBusy$.next(true);
    if (!!ticket.id) {
      this.saveTicket(ticket);
    } else {
      this.addTicket(ticket);
    }
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }

  ngOnInit() {}

  constructor(
    private b: FormBuilder,
    private store: Store<TicketEntityState>,
    private service: BackendService,
    private route: ActivatedRoute
  ) {
    this.store.dispatch(TicketActions.LoadTickets());
  }
}

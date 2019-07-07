import { Component, OnInit, Input, EventEmitter } from "@angular/core";
import { Ticket, User } from "../models";

@Component({
  selector: "app-ticket-list-item",
  templateUrl: "./ticket-list-item.component.html",
  styleUrls: ["./ticket-list-item.component.scss"]
})
export class TicketListItemComponent {
  @Input() isBusy: boolean;
  @Input() markAsCompleteEmitter = new EventEmitter<Ticket>();
  @Input() ticket: Ticket;
  @Input() assignee: User;
}

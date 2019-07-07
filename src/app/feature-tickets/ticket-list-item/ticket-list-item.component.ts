import { Component, OnInit, Input } from "@angular/core";
import { Ticket, User } from "../models";

@Component({
  selector: "app-ticket-list-item",
  templateUrl: "./ticket-list-item.component.html",
  styleUrls: ["./ticket-list-item.component.scss"]
})
export class TicketListItemComponent {
  @Input() ticket: Ticket;
  @Input() assignee: User;
}

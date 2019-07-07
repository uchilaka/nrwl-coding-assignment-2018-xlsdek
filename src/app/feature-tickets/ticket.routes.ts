import { Routes } from "@angular/router";
import { TicketListComponent } from "./ticket-list/ticket-list.component";
import { TicketComponent } from "./ticket/ticket.component";

export const featureTicketRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        pathMatch: "full",
        component: TicketListComponent
      },
      {
        path: "new",
        pathMatch: "full",
        component: TicketComponent
      },
      {
        path: ":ticketId/edit",
        pathMatch: "full",
        component: TicketComponent
      }
    ]
  }
];

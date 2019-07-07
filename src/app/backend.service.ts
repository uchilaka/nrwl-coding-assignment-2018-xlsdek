import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { delay, tap } from "rxjs/operators";
import { Ticket, User } from "./feature-tickets/models";

function randomDelay() {
  return Math.random() * 4000;
}

@Injectable()
export class BackendService {
  storedTickets: Ticket[] = [
    {
      id: 1,
      description: "Install a monitor arm",
      assigneeId: 111,
      completed: false
    },
    {
      id: 2,
      description: "Move the desk to the new location",
      assigneeId: 111,
      completed: false
    }
  ];

  storedUsers: User[] = [
    { id: 111, name: "Victor" },
    { id: 112, name: "Lucas" }
  ];

  lastId = 2;

  private findTicketById = (id: number) => {
    return this.storedTickets.filter(ticket => ticket.id === id).shift();
  };

  private findUserById = (id: number) => {
    return this.storedUsers.filter(user => user.id === id).shift();
  };

  constructor() {}

  tickets() {
    return of(this.storedTickets).pipe(delay(randomDelay()));
  }

  ticket(id: number): Observable<Ticket> {
    return of(this.findTicketById(id)).pipe(delay(randomDelay()));
  }

  users() {
    return of(this.storedUsers).pipe(delay(randomDelay()));
  }

  user(id: number) {
    return of(this.findUserById(id)).pipe(delay(randomDelay()));
  }

  newTicket(payload: { description: string }) {
    const newTicket: Ticket = {
      id: ++this.lastId,
      description: payload.description,
      assigneeId: null,
      completed: false
    };

    return of(newTicket).pipe(
      delay(randomDelay()),
      tap((ticket: Ticket) => this.storedTickets.push(ticket))
    );
  }

  assign(ticketId: number, userId: number) {
    const foundTicket = this.findTicketById(+ticketId);
    const user = this.findUserById(+userId);

    if (foundTicket && user) {
      return of(foundTicket).pipe(
        delay(randomDelay()),
        tap((ticket: Ticket) => {
          ticket.assigneeId = +userId;
        })
      );
    }

    return throwError(new Error("ticket or user not found"));
  }

  complete(ticketId: number, completed: boolean) {
    const foundTicket = this.findTicketById(+ticketId);
    if (foundTicket) {
      return of(foundTicket).pipe(
        delay(randomDelay()),
        tap((ticket: Ticket) => {
          ticket.completed = true;
        })
      );
    }

    return throwError(new Error("ticket not found"));
  }
}

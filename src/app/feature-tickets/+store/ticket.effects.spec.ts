import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { cold, hot } from "jasmine-marbles";
import { TicketEffects } from "./ticket.effects";
import { Observable } from "rxjs";
import { BackendService } from "../../backend.service";
import * as TicketActions from "./ticket.actions";
import { provideMockStore } from "@ngrx/store/testing";
import { TicketEntityState, initialTicketEntityState } from "../models";
import { TicketListComponent } from "../ticket-list/ticket-list.component";
import { RouterTestingModule } from "@angular/router/testing";

describe("TicketEffects", () => {
  let effects: TicketEffects;
  let actions$: Observable<any>;
  let service: BackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [],
      providers: [
        TicketEffects,
        provideMockActions(() => actions$),
        provideMockStore<TicketEntityState>({
          initialState: initialTicketEntityState
        }),
        BackendService
      ]
    }).compileComponents();

    effects = TestBed.get(TicketEffects);
    service = TestBed.get(BackendService);
  });

  it("should work", () => {
    const action = TicketActions.LoadTickets();
    const completion = TicketActions.LoadTicketsSuccess({
      tickets: service.storedTickets
    });
    const response = cold("---b|", { b: service.storedTickets });
    service.tickets = jest.fn(() => response);

    actions$ = hot("--a-", { a: action });
    const expected = cold("-----c", { c: completion });

    expect(effects.loadTickets$).toBeObservable(expected);
  });
});

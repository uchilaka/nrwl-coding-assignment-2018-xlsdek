import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { TicketListComponent } from "./ticket-list.component";
import { RouterTestingModule } from "@angular/router/testing";
import { TicketEntityState, initialTicketEntityState } from "../models";
import { BackendService } from "../../backend.service";
import { TicketListItemComponent } from "../ticket-list-item/ticket-list-item.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Store } from "@ngrx/store";
import { getTickets } from "../+store/ticket.selectors";
import { By } from "@angular/platform-browser";

describe("TicketListComponent", () => {
  let component: TicketListComponent;
  let fixture: ComponentFixture<TicketListComponent>;
  let service: BackendService;
  let store: MockStore<TicketEntityState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), CommonModule, FormsModule],
      declarations: [TicketListItemComponent, TicketListComponent],
      providers: [
        provideMockStore<TicketEntityState>({
          initialState: initialTicketEntityState
        }),
        BackendService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(BackendService);
    store = TestBed.get(Store);

    store.overrideSelector(getTickets, service.storedTickets);

    fixture = TestBed.createComponent(TicketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should return expected # of tickets", () => {
    const matches = fixture.debugElement.queryAll(
      By.directive(TicketListItemComponent)
    );
    expect(matches.length).toBe(service.storedTickets.length);
  });
});

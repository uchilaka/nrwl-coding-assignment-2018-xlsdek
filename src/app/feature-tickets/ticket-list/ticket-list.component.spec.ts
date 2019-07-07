import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { provideMockStore } from "@ngrx/store/testing";
import { TicketListComponent } from "./ticket-list.component";
import { RouterTestingModule } from "@angular/router/testing";
import { TicketEntityState, initialTicketEntityState } from "../models";
import { BackendService } from "../../backend.service";
import { TicketListItemComponent } from "../ticket-list-item/ticket-list-item.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

describe("TicketListComponent", () => {
  let component: TicketListComponent;
  let fixture: ComponentFixture<TicketListComponent>;

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
    fixture = TestBed.createComponent(TicketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

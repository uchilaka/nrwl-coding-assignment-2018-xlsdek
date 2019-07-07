import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TicketListItemComponent } from "./ticket-list-item.component";
import { RouterTestingModule } from "@angular/router/testing";

describe("TicketListItemComponent", () => {
  let component: TicketListItemComponent;
  let fixture: ComponentFixture<TicketListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [TicketListItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

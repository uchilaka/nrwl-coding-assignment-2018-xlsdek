import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackendService } from '../../backend.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent {
  users = this.service.users();

  ticketForm = this.b.group({
    description: ['', Validators.required],
    assigneeId: ['', Validators.required]
  });
  constructor(
    @Inject(FormBuilder) private b: FormBuilder, 
    @Inject(BackendService) private service: BackendService
  ) {}
}

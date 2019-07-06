import { EntityState, createEntityAdapter } from '@ngrx/entity';

export type User = {
    id: number;
    name: string;
  };
  
export type Ticket = {
id: number;
description: string;
assigneeId: number;
completed: boolean;
};

export interface TicketEntityState extends EntityState<Ticket> {
  searchTerm?: string
}

export const ticketEntityAdapter = createEntityAdapter<Ticket>({
  sortComparer: (t1, t2) => t1.id > t2.id ? t2.id : t1.id,
  selectId: t => t.id
})
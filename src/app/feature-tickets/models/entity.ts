import { ComparerNum, EntityState } from "@ngrx/entity/src/models";
import { Ticket } from "./ticket";
import { createEntityAdapter } from "@ngrx/entity";

export const sortComparer: ComparerNum<Ticket> = (t1, t2) => {
  return t1.id > t2.id ? t2.id : t1.id;
};

export const ticketEntityAdapter = createEntityAdapter<Ticket>({
  sortComparer,
  selectId: t => t.id
});

export interface TicketEntityState extends EntityState<Ticket> {
  ids: number[];
  entities: { [id: number]: Ticket };
  searchTerm?: string;
  selectedTicketId?: number;
}

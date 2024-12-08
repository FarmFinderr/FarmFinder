import { event } from "./event.model";
import { User } from "./user.model";

export interface Participation {
  price: number,
  user: User,
  person_id:number,
  id?:number,
  Event: event
}

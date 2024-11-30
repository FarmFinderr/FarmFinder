import { User } from "./user.model";

export interface event {
  id: number;
  status: boolean;
  description: string;
  title: string;
  price: number;
  owner_id: number;
  date_debut: string;
  date_fin: string;
  owner: User;
  users:User[];

}

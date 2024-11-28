export interface event {
  _id?: string;
  status: boolean;
  price: number;
  owner_id?:String;
  date_debut:Date | null;
  date_fin:Date|null; 
}

export interface Post {
    _id?: string;  
    price: number;
    userId: string;
    description: string;
    date: Date | null;
    localisation:string;
    air:number;
    type:string;
    defaut:string;
    etat:string;
  }
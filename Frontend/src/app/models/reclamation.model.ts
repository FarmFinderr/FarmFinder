export interface Reclamation {
  _id: string;
  userId: {
    name: string;
    lastName: string;
  };
  reclamation: string;
  userName?: string;  // Add userName as an optional property
}

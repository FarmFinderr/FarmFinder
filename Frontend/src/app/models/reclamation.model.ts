export interface Reclamation {
  id: number;
  reclamation: string;
  image: string | null;  // Allow for null if there's no photo attached
  createdAt: string;     // Use proper types for dates or timestamps
  updatedAt: string;
}

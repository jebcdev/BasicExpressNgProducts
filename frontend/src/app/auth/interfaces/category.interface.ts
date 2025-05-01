export interface iCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: null;
}

import { iUser } from './user.interface';

export interface iRole {
  id: number;
  name: string;
  description: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  users?: iUser[];
}

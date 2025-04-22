import { iRole } from './role.interface';

export interface iUser {
  id?: number;
  role_id?: number;
  name: string;
  surname: string;
  email: string;
  password?: string;
  role?: iRole;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  token?: string;
}

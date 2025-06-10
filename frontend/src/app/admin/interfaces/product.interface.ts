import { iBrand } from './brand.interface';
import { iCategory } from './category.interface';

export interface iProduct {
  id: number;
  code: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  images: string[];
  price: string;
  sale_price: string;
  cost_price: string;
  stock_quantity: number;
  sku: string;
  barcode: string;
  featured: boolean;
  status: string;
  category_id: number;
  brand_id: number;
  tags: string[];
  attributes: string[];
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: null;
  brand?: iBrand;
  category?: iCategory;
}

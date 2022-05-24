import { v4 as uuidv4 } from 'uuid';

export interface ICart {
  id: string;
  items: ICartItem[];
}

export interface ICartItem {
  id: number;
  productName: string;
  productDescription: string;
  productSpecification: string;
  productId: number;
  price: number;
  quantity: number;
  brand: string;
  subCategory: string;
}

export class Cart implements ICart{
  id = uuidv4();
  items: ICartItem[] = [];
};

export interface ICartTotals{
  shipping: number;
  subtotal: number;
  total: number;
}



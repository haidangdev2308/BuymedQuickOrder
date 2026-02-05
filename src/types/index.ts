export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  isPrescription: boolean;
}

export type CartMap = Record<number, number>;
export interface signUp {
  name: string;
  password: string;
  email: string;
}

export interface logIn {
  email: string;
  password: string;
}

export interface product {
  name: string;
  price: number;
  color: string;
  category: string;
  description: string;
  image: string;
  id: number;
  quantity: number | undefined;
  productId: undefined | number;
}

export interface cart {
  name: string;
  price: number;
  color: string;
  category: string;
  description: string;
  image: string;
  id: number | undefined;
  quantity: number | undefined;
  userId: number;
  productId: number;
}

export interface priceSummery {
  price: number;
  discount: number;
  tax: number;
  delivery: number;
  total: number;
}

export interface order {
  email: string;
  address: string;
  contact: string;
  totalPrice: number;
  userId: number;
  id: number|undefined;
}

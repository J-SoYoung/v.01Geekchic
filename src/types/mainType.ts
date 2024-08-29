export interface Product {
  id: string;
  title: string;
  category: string;
  description: string;
  price: string;
  image: string;
  options: string[];
}

export interface PayProduct extends Product {
  quantity: number;
}

export interface AddProduct {
  id: string;
  title: string;
  category: string;
  description: string;
  price: string;
  image: string;
  options: string;
}

export interface OrderProduct {
  title: string;
  description: string;
  price: string;
  image: string;
  options: string[];
  quantity: number;
}

export interface GetOrderDetails {
  ordersId?: string;
  name: string;
  phone: string;
  address: string;
  paymentMethod: string;
  createdAt?: string;
  items: OrderProduct[];
}

export interface OrderDetails {
  ordersId?: string;
  name: string;
  phone: string;
  address: string;
  paymentMethod: string;
  createdAt?: string;
}

export interface Comment {
  id: string;
  text: string;
  rank: number;
  createdAt: string;
  uid: string;
  userPhoto: string;
  displayName: string;
}

export interface CartProducts {
  id: string;
  title: string;
  category: string;
  description: string;
  price: string;
  image: string;
  options: string;
  quantity: number;
}

export interface IOrder {
  orderId: string;
  address: string;
  orderDate: string;
  product: {productName: string, price: number}
  users: {name: string}
}

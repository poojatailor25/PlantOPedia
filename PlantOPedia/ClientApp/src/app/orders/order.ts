export interface IOrder {
  orderId: string;
  address: string;
  orderDate: Date;
  productId: string;
  product: {productName: string, price: number, imageUrl: string};
  userId: string;
  users: {name: string};
  isDeleted: boolean;
}

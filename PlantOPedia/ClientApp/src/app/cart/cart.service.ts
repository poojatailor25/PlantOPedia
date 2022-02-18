import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from '../orders/order';
import { Orderservice_api } from '../orders/order.service';
import { SuccessEnum } from '../Shared/models';
import { ICart } from './cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartOrder: IOrder[] = [];
  orderresponse!: any;
  cartDelete!: string;
  paymentSuccess: boolean = false;

  private cartUrl = 'https://localhost:7258/api/cart';

  constructor(private http: HttpClient,
    private orederService: Orderservice_api) { }


  getCartProductById(uid: any): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.cartUrl + "/" + uid);

  }
  addToCart(cart: any): Observable<any> {
    return this.http.post(this.cartUrl, cart);
  }

  deleteProductCart(cartId: any): Observable<any> {
    return this.http.delete(this.cartUrl + "/" + cartId);
  }

  OrderArray(cartData: Array<any>): any {
    var date = new Date();
    cartData.forEach((pro: any) => {
      // pro.orderDate = date
      let cartObj: any = {
        orderDate: date,
        address: pro.user.address,
        productId: pro.productId,
        userId: pro.userId
      }
      this.cartOrder.push(cartObj);


    })
    // return this.cartOrder;
    // console.log(this.cartOrder);
    this.orederService.addOrder(this.cartOrder).subscribe({
      next: orderresponse => {
        this.orderresponse = orderresponse;
        if (this.orderresponse.message == SuccessEnum.message) {
          cartData.forEach( cd => {
            this.deleteProductCart(cd.cartId).subscribe({
              next: cartDelete => {
                this.cartDelete = cartDelete;

              }
            });
            console.log(cd.cartId);
          })
            alert("Order Placed Successfully");
            window.location.reload();

        }
      }
    })
  }


}

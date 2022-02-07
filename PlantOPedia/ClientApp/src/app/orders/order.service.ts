import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IOrder } from "./order";

@Injectable({
  providedIn: 'root'
})
export class Orderservice_api {

  private orderUrl = "https://localhost:7258/api/order";
  constructor(private http: HttpClient) { }

  getOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.orderUrl)
  }

  addOrder(order: any): Observable<IOrder>{
    return this.http.post<IOrder>(this.orderUrl, order);
  }

  deleteOrder(OrderId: any): Observable<any> {
    return this.http.delete(this.orderUrl + "/" + OrderId);
}


}

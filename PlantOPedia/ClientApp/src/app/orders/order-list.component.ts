import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IOrder } from "./order";
import { Orderservice_api } from "./order.service";

@Component({
  selector: 'app-orders',
  templateUrl:'./order-list.component.html'
})
export class Orderlistcomponent implements OnInit {

  pageTitle: string = 'Oredr List';
  orders: IOrder[] = [];
  deleteResponse: any;

  constructor(private route: Router, private Orderservice_api: Orderservice_api) {

  }
  ngOnInit(): void {
    this.listorders();
  }

  AddOrder() {
    this.route.navigate(['/AddOrder']);
  }


  listorders() {
    this.Orderservice_api.getOrders().subscribe({
      next: orders => {
        console.log("confirm",orders);
        this.orders = orders;
      }
    })
     
  }

  deleteorder(id:any) {
    this.Orderservice_api.deleteOrder(id).subscribe({
      next: deleteResponse => {
        this.deleteResponse = deleteResponse;
        console.log("Delete Success",this.deleteResponse)

      }

    })
  }

}

import { Route } from "@angular/compiler/src/core";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { LoginService } from "../login/login.service";
import { Orderservice_api } from "../orders/order.service";
import { IProduct } from "../products/product";
import { ProductService } from "../products/product.service";
import { SuccessEnum } from "../Shared/models";
import { DatePipe, formatDate } from '@angular/common';
import { Observable } from "rxjs";


@Component({
  selector:'app-add',
  templateUrl:'./add-order.component.html'
})
export class AddOrderComponent implements OnInit {

  dateVal = new Date(Date.now());
  
  pipe = new DatePipe('en-US');
  orderresponse: any;
  product!: IProduct; 
  uId: any;
  uName: any;
  

  
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private OrderService_api:Orderservice_api,
              private productService: ProductService,
              private loginService: LoginService){}

  orderform:FormGroup=new FormGroup({});
   myFormattedDate = this.pipe.transform(this.dateVal, 'short');


  ngOnInit(): void {

    const productId = this.route.snapshot.paramMap.get('id');
    this.uId =this.loginService.getLoggedInUser();
    this.uName = this.loginService.getLoggedInUserName(); 
    this.initilizeformgroup();
    this.productDetail(productId); 
    
  }

  initilizeformgroup() {
    this.orderform = this.formBuilder.group({
     userId: [this.uId],
     name: [this.uName],
     productId:[undefined],
     orderDate:[new Date()],
    //  orderDate: [formatDate(this.dateVal, 'yyyy-MM-dd ', 'en')],
    //  ordatedate: [this.myFormattedDate],
    // orderDate: [moment().format('YYYY-MM-DD h:mm a')],
     address:[undefined],
     price: [undefined],
     productName: [undefined]
   })
 }

 


  productDetail(pid: any) {
    this.productService.getProductById(pid).subscribe({
      next: (product) => {
        this.product = product;
        console.log("Product detail method - ", product);
        this.orderform.patchValue({
          productId: this.product.productId,
          productName: this.product.productName,
          price: this.product.price
        })
      }
    })
  }

  onSubmit():void {
      console.log(this.orderform.value);
      // this.orderform.controls.orderDate.setValue(new Date().toLocaleString());
      this.OrderService_api.addOrder(this.orderform.value).subscribe(
          (orderresponse) => {
              this.orderresponse = orderresponse;
              if (this.orderresponse.message === SuccessEnum.message ) {
                  alert("Order Placed Successfully");
                  this.orderform.reset();
                  this.router.navigate(['/product']);

              }
              else {
                  this.router.navigate(['/addorder']);
              }
          }
      )
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.orderform.dirty) {
      return confirm('Your changes are unsaved!! Do you like to exit');
    }
    return true;
  }
  

}

import { Route } from "@angular/compiler/src/core";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { LoginService } from "../login/login.service";
import { Orderservice_api } from "../orders/order.service";
import { IProduct } from "../products/product";
import { ProductService } from "../products/product.service";
import { SuccessEnum } from "../Shared/models";
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Observable } from "rxjs";
import { IOrder } from "../orders/order";
import Swal from "sweetalert2";


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
  array: IOrder[] = [];
  paymentorder: boolean = false;
  paymentHandler: any = null;
  
  

  
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private OrderService_api:Orderservice_api,
              private productService: ProductService,
              private loginService: LoginService,
              private currency: CurrencyPipe){}

  orderform:FormGroup=new FormGroup({});
  paymentform : FormGroup = new FormGroup({});
   myFormattedDate = this.pipe.transform(this.dateVal, 'short');


  ngOnInit(): void {
    this.invokeStripe();
    const productId = this.route.snapshot.paramMap.get('id');
    this.uId =this.loginService.getLoggedInUser();
    this.uName = this.loginService.getLoggedInUserName(); 
    this.initilizeformgroup();
    this.productDetail(productId); 

    this.paymentform = this.formBuilder.group({
      name: [undefined, [Validators.required]],
      cardno: [undefined, [Validators.required]],
      expirydate: [undefined, [Validators.required]],
      cvv: [undefined, [Validators.required]]
    })
    
  }

  initializePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51KUPw8SHSHxyev96uBqTVfnxQtkF4VW4grcuIoU8mS3K7EhSzZtuYzg5hPdgHFPXkhLIO9XT3piIpHfiYF8EvVg000CkIy224O',
      locale: 'auto',
      token: function (stripeToken: any) {

        Swal.fire("Payment Successful","Your transaction ID is : "+stripeToken.id,"success");

      },
    });

    paymentHandler.open({
      name: this.uName,
      description: "Buying from PlantO'Pedia", 
      amount: amount * 100, 
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_sLUqHXtqXOkwSdPosC8ZikQ800snMatYMb',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }


  initilizeformgroup() {
    this.orderform = this.formBuilder.group({
     userId: [this.uId],
     name: [this.uName],
     productId:[undefined],
     orderDate: [new Date()],
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
          price: this.product.price,
        })
      }
    })
  }

  // onSubmit():void {
  //     console.log(this.orderform.value);
  //     this.array.push(this.orderform.value);
  //     console.log(this.array);
  //     // this.orderform.controls.orderDate.setValue(new Date().toLocaleString());
  //     this.OrderService_api.addOrder(this.array).subscribe(
  //         (orderresponse) => { 
  //             this.orderresponse = orderresponse;
  //             if (this.orderresponse.message === SuccessEnum.message ) {
  //               Swal.fire("Yaahh !!","Order Added Successfully","success");
  //                 this.orderform.reset();
  //                 this.router.navigate(['/product']);

  //             }
  //             else {
  //                 this.router.navigate(['/addorder']);
  //             }
  //         }
  //     )
  // }
  success(){
    Swal.fire("Payment Successful !!!!", "Your Transection id is #123456789", "success");
    setTimeout(function () { window.location.replace('') }, 1000);
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.orderform.dirty) {
      return confirm('Your changes are unsaved!! Do you like to exit');
    }
    return true;
  }
  

}

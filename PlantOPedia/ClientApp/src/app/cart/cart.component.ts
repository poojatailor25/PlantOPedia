import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login/login.service';
import { CartService } from './cart.service';
import Swal from "sweetalert2";


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  uId: any;
  cartresponse!: Array<any>;
  cartDelete!: string;
  totalcost: any = 0;
  totalItems: number = 0;
  paymentorder: boolean = false;
  paymentHandler: any = null;
  uName: any;
  ispaymentsucess: boolean | undefined;
  paymentform : FormGroup = new FormGroup({});

  constructor( private loginService: LoginService,
              private cartService: CartService,
              private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.invokeStripe();
    this.uId =this.loginService.getLoggedInUser();
    this.uName = this.loginService.getLoggedInUserName(); 
    this.cartService.getCartProductById(this.uId).subscribe({
      next: cartresponse => {
        this.cartresponse = cartresponse;
        this.totalPrice();
      }
    })
    this.paymentform = this.formBuilder.group({
      name: [undefined, [Validators.required]],
      cardno: [undefined, [Validators.required]],
      expirydate: [undefined, [Validators.required]],
      cvv: [undefined, [Validators.required]]
    })
    
  }

  initializePayment(amount: number) {
    // this.ispaymentsucess = true;
    // this.OrderPlaced();
    localStorage.setItem("CartResponse",this.cartresponse.join(","));
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51KUPw8SHSHxyev96uBqTVfnxQtkF4VW4grcuIoU8mS3K7EhSzZtuYzg5hPdgHFPXkhLIO9XT3piIpHfiYF8EvVg000CkIy224O',
      locale: 'auto',
      token: async function (stripeToken: any) {
        console.log({ stripeToken });
        
        Swal.fire({
          title: 'Payment Successfull!!!',
          text: "Your Order is places sucessfully!!!",
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'ok'
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.setItem("StripeToken",stripeToken.id);
           window.location.replace('');
            }
        })
      },
    });

    paymentHandler.open({
      name: this.uName,
      description: "Buying from PlantO'Pedia", 
      amount: amount * 100, 
    });
  }

  OrderPlaced(){
    this.ispaymentsucess ? this.paymentorder = this.cartService.OrderArray(this.cartresponse) : '';
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

  OnDelete(cartId: string){
    this.cartService.deleteProductCart(cartId).subscribe({
      next: cartDelete => {
        this.cartDelete = cartDelete;
        window.location.reload();
      }
    }) 
  }

  totalPrice(){
    this.cartresponse.forEach( (pro: any) => {
      this.totalcost += pro.product.price as number;
    })
    this.totalItems = this.cartresponse.length;
  }

  productIds(){
    if(this.paymentform.invalid)
    {
      alert("Field is Invalid or Empty");
      console.log(this.paymentform.value);

    }
    else
    {
      this.paymentorder = this.cartService.OrderArray(this.cartresponse);
    }
  }
  // paysuccess(){
    // Swal.fire("Payment Successful","success");
  // }
}

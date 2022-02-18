import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login/login.service';
import { ICart } from './cart';
import { CartService } from './cart.service';

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


  paymentform : FormGroup = new FormGroup({});

  constructor( private loginService: LoginService,
              private cartService: CartService,
              private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.uId =this.loginService.getLoggedInUser();
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
    debugger
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
}

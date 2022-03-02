import { Component } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  uId: any;
  cartresponse!: Array<any>;

  constructor(
    private cartService: CartService,
    private loginService: LoginService
     ) { }

     ngOnInit(): void {
      if(localStorage.getItem("StripeToken")){
        console.log("it will work");
        this.uId =this.loginService.getLoggedInUser();
        this.cartService.getCartProductById(this.uId).subscribe({
          next: cartresponse => {
            console.log(cartresponse,"in")
            this.cartresponse = cartresponse;
            this.cartService.OrderArray(this.cartresponse);
            localStorage.removeItem("StripeToken");
          }
        });
       
      }else{
        console.log("It will not work");
      }
    }
}



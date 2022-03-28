import { Component } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { LoginService } from '../login/login.service';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  uId: any;
  cartresponse!: Array<any>;
   obj :any = {
    to_name: "pooja",
    email: "poojatailor25051999@gmail.com",
    }


  constructor(
    private cartService: CartService,
    private loginService: LoginService
     ) { }

     ngOnInit(): void {
       
      if(localStorage.getItem("StripeToken")){
        this.uId =this.loginService.getLoggedInUser();
        this.cartService.getCartProductById(this.uId).subscribe({
          next: cartresponse => {
            console.log(cartresponse,"in")
            this.cartresponse = cartresponse;
            this.sendEmail();
            this.cartService.OrderArray(this.cartresponse);
            localStorage.removeItem("StripeToken");
          }
        });
       
      }else{
    
      }
    }
    public sendEmail() {
      
      emailjs.send("react-email-service","template_mkfl5pr",{
        to_name: "pooja",
        email: "poojatailor25051999@gmail.com",
        },'user_kUrIryIxRdKheR75ytBvU');
      // emailjs.sendForm('service_ztb7jma', 'template_mkfl5pr', this.obj,'user_kUrIryIxRdKheR75ytBvU')
      //   .then((result: EmailJSResponseStatus) => {
      //     console.log(result.text);
      //   }, error => {
      //     console.log(error.text);
      //   });
    }
}



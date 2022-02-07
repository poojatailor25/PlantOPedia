import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { ProductService } from '../products/product.service'
import { FormBuilder } from '@angular/forms'
import { SuccessEnum } from '../Shared/models'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-product',
  templateUrl: './add-product.component.html'
})
export class AddProductComponent implements OnInit {
  productresponse:any;
  productTypeResponse:any;
  

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private ProductService:ProductService){}

  productform:FormGroup=new FormGroup({});

  ngOnInit(): void {
       this.productform = this.formBuilder.group({
        productName: [undefined],
        description:[undefined],
        price:[undefined],
        imageUrl:[undefined],
        productTypeId:[undefined],
      })
      this.productTypeDetail();

  }
  productTypeDetail(){
    this.ProductService.getProductTypes().subscribe(
        (productTypeResponse)=> {
            this.productTypeResponse = productTypeResponse;
            console.log("fetch data",this.productTypeResponse);
        }
    )
  }
  onSubmit():void {
    console.log(this.productform.value);
    this.ProductService.addproduct(this.productform.value).subscribe(
        (productresponse) => {
            this.productresponse = productresponse;
            if (this.productresponse.message === SuccessEnum.message) {
                // this.router.navigate(['']);
                alert("Product Added Successfully");
                this.productform.reset();

            }
            else {
                this.router.navigate(['/addproduct']);
            }
        }
    )
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.productform.dirty) {
      return confirm('Your changes are unsaved!! Do you like to exit');
    }
    return true;
  }
}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router'
import { SuccessEnum } from '../Shared/models';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  imageWidth = 200;
  imageMargin = 10;
  imagefit = 'fit';

  upresponce: any;
  

  product!: IProduct; 
  productdetail: any;
  productTypeResponse:any;
  

  productform: FormGroup = new FormGroup({});

  constructor(private route: ActivatedRoute, 
              private router: Router, 
              private productService: ProductService,  
              private formBuilder: FormBuilder) { }



  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');

    this.initilizeformgroup();
    this.productDetail(productId);
    this.productTypeDetail();


  }
  initilizeformgroup() {
    this.productform = this.formBuilder.group({
      productId: [undefined],
      productName: [undefined],
      description: [undefined],
      price: [undefined],
      imageUrl: [undefined],
      productTypeId: [undefined],
      productSubType: [undefined],
      categoryId: [undefined]
    })
  }

  productDetail(pid: any) {
    this.productService.getProductById(pid).subscribe({
      next: (product) => {
        this.product = product;
        console.log("Product detail method - ", product);
        this.productform.get('productName')?.setValue(this.product.productName);
        // this.productform.get('description')
        this.productform.setValue({
          productId: this.product.productId,
          productName: this.product.productName,
          description: this.product.description,
          price: this.product.price,
          imageUrl: this.product.imageUrl,
          productTypeId: this. product.productTypeId,
          productSubType: this.product.productType.productSubType,
          categoryId: this.product.productType.category.categoryId
        })

      }
    })
  }
  productTypeDetail(){
    this.productService.getProductTypes().subscribe(
        (productTypeResponse)=> {
            this.productTypeResponse = productTypeResponse;
            console.log("fetch data",this.productTypeResponse);
        }
    )
  }

  updateProduct() {
    console.log('Form value', this.productform.value);
    this.productService.updateProduct(this.product.productId, this.productform.value).subscribe({
      next: (upresponce) => {
        this.upresponce = upresponce;
        if (this.upresponce.message === SuccessEnum.message ) {
          // this.router.navigate(['']);
          alert("Product Updated Successfully");
          this.router.navigate(['/product/', this.product.productId]);

        }
        else {
          alert("Some Error occured");
          // this.router.navigate(['/']);
        }
      }
    })
  }



}

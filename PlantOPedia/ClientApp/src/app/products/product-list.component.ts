import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { isNotNullOrUndefine } from '../Shared/methods';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'app-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  imageWidth = 100;
  imagefit = 'fit';
  sub!: Subscription;

  products: IProduct[] = [];

  constructor(private ProductService : ProductService) {
    
   }
  ngOnDestroy(): void {
    
  }

  ngOnInit(): void {
    this.sub=this.ProductService.getProducts().subscribe({
      next: products => this.products = products
    });
    console.log('In OnInit');
  }
  
  ngAfterContentInit() {
    console.log("ngAfterContentInit called.....");
  }
  ngDestroy() {
    this.sub.unsubscribe();
    console.log('ondestroy is called......');
  }


}

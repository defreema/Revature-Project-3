import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product | undefined;

  constructor(private route: ActivatedRoute,
    private productService:ProductService,
    private location: Location) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    //route .snapshot is a static image of the route information soon after the component is created
    //paramMap is a dicitonary of route param values exctracted from the URL - 'id' key returns the id of the hero to fetch
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getSingleProduct(id).subscribe(product => this.product = product);
  }

  goBack():void{

   
    this.location.replace("home");
  }

}

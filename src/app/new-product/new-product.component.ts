import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../services/catalogue.service';
import {Router} from '@angular/router';
import {Product} from '../model/product.model';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  private currentProduct: Product;
  public mode: number=1;

  constructor(private catService:CatalogueService, private router:Router) { }

  ngOnInit() {
  }

  onSaveProduct(data: any) {
    this.catService.saveResource(this.catService.host+"/produits",data)
      .subscribe(res=>{
        //this.router.navigateByUrl("/products");
        this.currentProduct=res;
        this.mode=2;
      },error1 => {
        console.log(error1);
      })
  }

  onNewProduct(){
    this.mode=1;
  }

}

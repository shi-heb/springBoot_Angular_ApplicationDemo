import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CatalogueService} from '../services/catalogue.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

  produits;
  public size:number=5;
  public currentPage:number=0;
  public totalPages:number;
  public pages:Array<number>;
  public currentKeyword: string="";

  constructor(private catService: CatalogueService, private router:Router) { }

  ngOnInit() {
  }

  onGetProducts() {
      this.catService.getProducts(this.currentPage,this.size)
        .subscribe(data => {
        this.totalPages=data["page"].totalPages;
        this.pages=new Array<number>(this.totalPages);
        this.produits = data;
      }, err => {
        console.log(err);
      });
  }

  onPageProduct(i: number) {
    this.currentPage=i;
    this.ChercherProduits();
  }

  onChercher(form: any){
    this.currentPage=0;
    this.currentKeyword=form.keyword;
    this.ChercherProduits();
  }
  ChercherProduits() {
      this.catService.getProductsByKeyword(this.currentKeyword,this.currentPage,this.size)
      .subscribe(data => {
        this.totalPages=data["page"].totalPages;
        this.pages=new Array<number>(this.totalPages);
        this.produits = data;
      }, err => {
        console.log(err);
      });
  }

  onDeleteProduct(p) {
    let conf=confirm("Voulez vous supprimer?");
    if(conf){
      this.catService.deleteResource(p._links.self.href).subscribe(data=>{
        this.ChercherProduits();
      },err => {
        console.log(err);
      })
    }
  }

  onEditProduct(p){
    let url=p._links.self.href;

    this.router.navigateByUrl("/edit-product/"+btoa(url));
  }
}

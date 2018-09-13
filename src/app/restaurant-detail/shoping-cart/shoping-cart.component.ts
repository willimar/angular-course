import { ShoppingCartService } from './shopping-cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mt-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: []
})
export class ShopingCartComponent implements OnInit {

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
  }

  items(): any[]{
    return this.shoppingCartService.items;
  }

  clear(){
    return this.shoppingCartService.clear();
  }

  removeItem(item: any){
    this.shoppingCartService.removeItem(item);
  }

  addItem(item: any){
    this.shoppingCartService.addItem(item);
  }

  total(): number{
    return this.shoppingCartService.total();
  }
}

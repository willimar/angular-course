import { CartItem } from './../restaurant-detail/shoping-cart/cart-item.model';
import { ShoppingCartService } from './../restaurant-detail/shoping-cart/shopping-cart.service';
import { Injectable } from "@angular/core";

@Injectable()
export class OrderService{
    constructor(private cartService: ShoppingCartService){

    }

    cartItems(): CartItem[]{
        return this.cartService.items;
    }

    increaseQty(item: CartItem){
        this.cartService.increaseQty(item);
    }

    decreaseQty(item: CartItem){
        this.cartService.decreaseQty(item);
    }

    remove(item: CartItem){
        this.cartService.removeItem(item);
    }
}
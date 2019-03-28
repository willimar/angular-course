import { CartItem } from './../restaurant-detail/shoping-cart/cart-item.model';
import { OrderService } from './order.service';
import { Component, OnInit } from '@angular/core';
import { RadioOption } from 'app/shared/radio/radio-option.model';
import { Order, OrderItem } from './order.model';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html',
  styleUrls: []
})

export class OrderComponent implements OnInit {

  config = [
    {
      type: 'input',
      label: 'Full name',
      name: 'name',
      placeholder: 'Enter your name',
    },
    {
      type: 'select',
      label: 'Favourite food',
      name: 'food',
      options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
      placeholder: 'Select an option',
    },
    {
      label: 'Submit',
      name: 'submit',
      type: 'button',
    },
  ];

  delivery: number = 8;

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value:'MON'},
    {label: 'Cartão', value:'CARD'},
    {label: 'Ticket Refeição', value:'TICK'}
  ];

  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit() {
  }

  itemsValue(): number {
    return this.orderService.itemsValue();
  }

  cartItems(): CartItem[] {
    return this.orderService.cartItems();
  }

  increaseQty(item: CartItem){
    this.orderService.increaseQty(item);
  }

  decreaseQty(item: CartItem){
    this.orderService.decreaseQty(item);
  }

  remove(item: CartItem){
    this.orderService.remove(item);
  }

  checkOrder(order: Order){
    
    order.orderItems = this.cartItems()
      .map((item:CartItem) => new OrderItem(item.quantity, item.menuItem.id));
    
    this.orderService.checkOrder(order)
      .subscribe((orderId: string) => {
        this.router.navigate(['/order-sumary']);
        console.log(`Compra concluída: ${orderId}`);
      this.orderService.clear();
    });
    console.log(order);
    
  }
}

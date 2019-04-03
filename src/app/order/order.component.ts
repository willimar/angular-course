import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { Route, Router } from '@angular/router';

import { Order, OrderItem } from './order.model';
import { CartItem } from './../restaurant-detail/shoping-cart/cart-item.model';
import { OrderService } from './order.service';
import { RadioOption } from 'app/shared/radio/radio-option.model';


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

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  numberPattern = /^[0-9]*$/;

  orderForm: FormGroup;
  delivery: number = 8;

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value:'MON'},
    {label: 'Cartão', value:'CARD'},
    {label: 'Ticket Refeição', value:'TICK'}
  ];

  constructor(private orderService: OrderService, 
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAddress: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('', [Validators.required])
    }, {validator: OrderComponent.equalTo});
  }

  static equalTo(group: AbstractControl):{[key:string]: boolean}{
    const email = group.get('email');
    const emailConfirmation = group.get('emailConfirmation');

    if(!email || !emailConfirmation){
      return undefined;
    }

    if (email.value !== emailConfirmation.value){
      return {emailsNotMatch: true};
    }
    else{
      return undefined;
    }
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

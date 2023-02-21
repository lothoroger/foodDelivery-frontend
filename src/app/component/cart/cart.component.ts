import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/model/cart';
import { CartItem } from 'src/app/model/cartItem';
import { Cuisines } from 'src/app/model/cuisines';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cart!: Cart;
  food!: Cuisines;
  constructor(private cartService: CartService, private router: Router) {

    this.cartService.getCartObservable().subscribe((data: any) => {
      this.cart = data;
    })
  }

  ngOnInit(): void {
  }

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.food.id);
  }

  changeQuantity(cartItem: CartItem, quantityInString: string) {
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.food.id, quantity);
  }


  addToCart() {
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart');

  }
}


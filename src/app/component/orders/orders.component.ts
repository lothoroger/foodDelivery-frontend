import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Cuisines } from 'src/app/model/cuisines';
import { CartService } from 'src/app/services/cart.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  constructor(private httpClient: HttpClientModule, private cuisineService: DbService, private cartService: CartService, private router: Router) { }

  cuisineForm: FormGroup = new FormGroup({});
  cuisinelist: Cuisines[] | undefined;
  updation: boolean = false;
  loader: boolean = false;

  ngOnInit(): void {
    this.cuisineService.getCuisines();
    this.cuisineService.cuisines.subscribe((list) => {
      if (list.length !== 0) this.cuisinelist = list;

    })
  }



  addToCart(cuisine: Cuisines) {
    this.cartService.addToCart(cuisine);
    this.router.navigateByUrl('/cart');
  }

}

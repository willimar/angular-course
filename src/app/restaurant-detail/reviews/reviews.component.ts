import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

import { RestaurantService } from './../../restaurants/restaurants.service';

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: []
})
export class ReviewsComponent implements OnInit {

  reviews: Observable<any>;

  constructor(private restaurantService: RestaurantService, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.route.parent.snapshot.params['id']);
    this.reviews = this.restaurantService
      .reveiewsOfRestaurants(this.route.parent.snapshot.params['id']);
  }

}

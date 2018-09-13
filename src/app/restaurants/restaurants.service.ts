import { ErrorHandler } from './../app.error-handler';
import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

import { MEAT_API } from './../app.api';
import { Restaurant } from './restaurant/restaurant.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map';
import { MenuItem } from '../restaurant-detail/menu-item/menu-item.model';


@Injectable() 
export class RestaurantService
{
    constructor(private http: Http){}

    restaurants(): Observable<Restaurant[]>{
        return this.http.get(`${MEAT_API}/restaurants`)
            .map(response => response.json())
            .catch(ErrorHandler.handleError)
    }

    restaurantById(id: string): Observable<Restaurant>{
        return this.http.get(`${MEAT_API}/restaurants/${id}`)
            .map(response => response.json())
            .catch(ErrorHandler.handleError)
    }

    reveiewsOfRestaurants(id: string): Observable<any>{
        console.log(`${MEAT_API}/restaurants/${id}/reviews`);
        return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)
            .map(response => response.json())
            .catch(ErrorHandler.handleError)
    }

    menuOfRestaurant(id: string): Observable<MenuItem[]>{
        console.log(`${MEAT_API}/restaurants/${id}/reviews`);
        return this.http.get(`${MEAT_API}/restaurants/${id}/menu`)
            .map(response => response.json())
            .catch(ErrorHandler.handleError)
    }
}
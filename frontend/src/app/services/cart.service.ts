// cart.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  // Get cart items for a user
  getCartItems(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`/api/cart/${userId}`); // Adjust API URL as necessary
  }

  // Remove item from cart by basketId
  removeFromCart(basketId: number): Observable<void> {
    return this.http.delete<void>(`/api/cart/${basketId}`); // Adjust API URL as necessary
  }
}

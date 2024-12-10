import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:3000/basket'; // Update with your API base URL

  constructor(private http: HttpClient) {}

  addToCart(userId: number, itemId: number, quantity: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, { userId, itemId, quantity });
  }

  getCartItems(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}`);
  }

  removeFromCart(basketId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove/${basketId}`);
  }
}
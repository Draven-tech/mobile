import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit, OnDestroy {
  cartItems: any[] = [];
  private cartSubscription: Subscription = new Subscription(); // to hold the subscription

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.loadCartItems();
  }

  // Load items from the cart for the current user
  loadCartItems() {
    const userId = this.getUserId(); // Dynamically get the user ID, replace with actual logic
    this.cartSubscription.add(
      this.cartService.getCartItems(userId).subscribe(
        (items) => {
          this.cartItems = items;
        },
        (error) => {
          console.error('Error fetching cart items', error);
        }
      )
    );
  }

  // Remove an item from the cart
  removeFromCart(basketId: number) {
    this.cartSubscription.add(
      this.cartService.removeFromCart(basketId).subscribe(
        () => {
          this.loadCartItems(); // Refresh cart items after removal
        },
        (error) => {
          console.error('Error removing item from cart', error);
        }
      )
    );
  }

  // Get user ID from local storage or session (replace with actual logic)
  private getUserId(): number {
    // Replace this with the logic to fetch the actual logged-in user's ID
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.id || 1; // Default to 1 if no user found, replace with real logic
  }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}

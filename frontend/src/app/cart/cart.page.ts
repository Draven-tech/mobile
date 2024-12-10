import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartItems: any[] = [];
  userId: number = 1; // Replace with dynamic user ID

  constructor(private cartService: CartService, private alertCtrl: AlertController) {}

  ngOnInit() {
    this.loadCartItems();
  }

  loadCartItems() {
    this.cartService.getCartItems(this.userId).subscribe(
      (items) => (this.cartItems = items),
      (error) => console.error('Error loading cart items:', error)
    );
  }

  removeFromCart(basketId: number) {
    this.cartService.removeFromCart(basketId).subscribe(
      async () => {
        const alert = await this.alertCtrl.create({
          header: 'Removed',
          message: 'Item removed from cart.',
          buttons: ['OK'],
        });
        await alert.present();
        this.loadCartItems();
      },
      (error) => console.error('Error removing item:', error)
    );
  }
}

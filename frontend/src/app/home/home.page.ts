import { Component } from '@angular/core'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  banners = [
    { imageUrl: 'assets/banners/BANNER.png' },
  ];

  categories = [
    { name: 'Beverages', icon: 'assets/icon/beverages.png' },
    { name: 'Fruits', icon: 'assets/icon/fruits.png' },
    { name: 'Vegetables', icon: 'assets/icon/vegs.png' },
    { name: 'Snacks', icon: 'assets/icon/snacks.png' },
    { name: 'Condiments', icon: 'assets/icon/condi.png' },
    { name: 'Toiletries', icon: 'assets/icon/toilet.png' },
    { name: 'Frozen Foods', icon: 'assets/icon/frozenfoods.png' },
    { name: 'Dairy', icon: 'assets/icon/dairy.png' },
  ];

  products = [
    {
      name: 'Bananas',
      description: 'Long, curved fruits with soft, sweet flesh and a thick skin.',
      price: 1.99,
      imageUrl: 'assets/products/Bananas.png',
    },
    {
      name: 'Apples',
      description: 'A round, edible fruit from an apple tree, part of the rose family.',
      price: 2.99,
      imageUrl: 'assets/products/Apples.png',
    },
    {
      name: 'Carrots',
      description: 'Root vegetables that are long, firm, crisp, and have a sweet flavor.',
      price: 3.99,
      imageUrl: 'assets/products/Carrots.png',
    },
    {
      name: 'Strawberries',
      description: 'A sweet, juicy, and bright red fruit.',
      price: 4.99,
      imageUrl: 'assets/products/Strawberries.png',
    },
  ];

  constructor(private router: Router) {}

  /**
   * Logs out the user and redirects to the login page.
   */
  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  /**
   * Navigates to the category page.
   */
  viewCategory(category: any): void {
    console.log('Category clicked:', category);
    this.router.navigate(['/category', category.name]);
  }

  /**
   * Navigates to the product page.
   */
  viewProduct(product: any): void {
    console.log('Product clicked:', product);
    this.router.navigate(['/product', product.name]);
  }

  /**
   * Adds a product to the cart.
   */
  addToCart(product: any): void {
    console.log('Adding to cart:', product);
    // Implement logic to add the product to the cart here
    alert(`${product.name} added to the cart!`);
  }

  /**
   * Navigates to the cart page.
   */
  goToCart(): void {
    console.log('Navigating to cart page.');
    this.router.navigate(['/cart']);
  }
}
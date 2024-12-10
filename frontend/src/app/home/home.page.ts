import { Component } from '@angular/core'; 
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  banners = [
    { imageUrl: 'assets/banners/banner1.jpg' },
    { imageUrl: 'assets/banners/banner2.jpg' },
    { imageUrl: 'assets/banners/banner3.jpg' }
  ];

  categories = [
    { name: 'Electronics', icon: 'assets/icons/electronics.png' },
    { name: 'Fashion', icon: 'assets/icons/fashion.png' },
    { name: 'Home & Garden', icon: 'assets/icons/home-garden.png' },
    { name: 'Toys', icon: 'assets/icons/toys.png' },
    { name: 'Sports', icon: 'assets/icons/sports.png' },
    { name: 'Beauty', icon: 'assets/icons/beauty.png' },
    { name: 'Automotive', icon: 'assets/icons/automotive.png' },
    { name: 'Groceries', icon: 'assets/icons/groceries.png' }
  ];

  products = [
    { 
      name: 'Wireless Headphones', 
      description: 'Noise-cancelling over-ear headphones', 
      price: 199.99, 
      imageUrl: 'assets/products/headphones.jpg' 
    },
    { 
      name: 'Smartphone X12', 
      description: 'Latest model smartphone with 128GB storage', 
      price: 899.99, 
      imageUrl: 'assets/products/smartphone.jpg' 
    },
    { 
      name: 'Sports Watch', 
      description: 'Waterproof sports watch with GPS', 
      price: 99.99, 
      imageUrl: 'assets/products/watch.jpg' 
    },
    { 
      name: '4K Smart TV', 
      description: '50-inch 4K Smart TV with streaming apps', 
      price: 599.99, 
      imageUrl: 'assets/products/tv.jpg' 
    }
  ];

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('user'); 
    this.router.navigate(['/login']); 
  }

  viewCategory(category: any) {
    console.log('Category clicked:', category);
    this.router.navigate(['/category', category.name]); 
  }

  viewProduct(product: any) {
    console.log('Product clicked:', product);
    this.router.navigate(['/product', product.name]); 
  }
}

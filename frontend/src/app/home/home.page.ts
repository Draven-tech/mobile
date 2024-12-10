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
    { name: 'Beverages', icon: 'assets/icons/beverages.png' },
    { name: 'Fruits', icon: 'assets/icons/fruits.png' },
    { name: 'Vegetables', icon: 'assets/icons/vegs.png' },
    { name: 'Snacks', icon: 'assets/icons/snacks.png' },
    { name: 'Condiments', icon: 'assets/icons/condi.png' },
    { name: 'Toiletries', icon: 'assets/icons/toilet.png' },
    { name: 'Frozen Foods', icon: 'assets/icons/frozenfoods.png' },
    { name: 'Dairy', icon: 'assets/icons/dairy.png' }
  ];

  products = [
    { 
      name: 'Banana', 
      description: 'long, curved fruits with soft, sweet flesh and a thick skin.', 
      price: 1.99, 
      imageUrl: 'assets/products/headphones.jpg' 
    },
    { 
      name: 'Apple', 
      description: ' is a round, edible fruit that comes from an apple tree and is part of the rose family.', 
      price: 2.99, 
      imageUrl: 'assets/products/smartphone.jpg' 
    },
    { 
      name: 'Carrots', 
      description: 'root vegetables that are long, firm, crisp, and have a sweet flavor', 
      price: 3.99, 
      imageUrl: 'assets/products/watch.jpg' 
    },
    { 
      name: 'Strawberries', 
      description: 'a sweet, juicy, and bright red fruit', 
      price: 4.99, 
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

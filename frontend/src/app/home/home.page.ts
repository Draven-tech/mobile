import { Component } from '@angular/core'; 
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  banners = [
    { imageUrl: 'assets/banners/BANNER.png' }
  ];

  categories = [
    { name: 'Beverages', icon: 'assets/icon/beverages.png' },
    { name: 'Fruits', icon: 'assets/icon/fruits.png' },
    { name: 'Vegetables', icon: 'assets/icon/vegs.png' },
    { name: 'Snacks', icon: 'assets/icon/snacks.png' },
    { name: 'Condiments', icon: 'assets/icon/condi.png' },
    { name: 'Toiletries', icon: 'assets/icon/toilet.png' },
    { name: 'Frozen Foods', icon: 'assets/icon/frozenfoods.png' },
    { name: 'Dairy', icon: 'assets/icon/dairy.png' }
  ];

  products = [
    { 
      name: 'Bananas', 
      description: 'long, curved fruits with soft, sweet flesh and a thick skin.', 
      price: 1.99, 
      imageUrl: 'assets/products/Bananas.png' 
    },
    { 
      name: 'Apples', 
      description: ' is a round, edible fruit that comes from an apple tree and is part of the rose family.', 
      price: 2.99, 
      imageUrl: 'assets/products/Apples.png' 
    },
    { 
      name: 'Carrots', 
      description: 'root vegetables that are long, firm, crisp, and have a sweet flavor', 
      price: 3.99, 
      imageUrl: 'assets/products/Carrots.png' 
    },
    { 
      name: 'Strawberries', 
      description: 'a sweet, juicy, and bright red fruit', 
      price: 4.99, 
      imageUrl: 'assets/products/Strawberries.png' 
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

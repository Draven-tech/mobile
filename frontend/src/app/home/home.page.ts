import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
username: string = '';

  constructor(
    private router: Router, 
    private http: HttpClient,
    private cdr: ChangeDetectorRef 
  ) {}

 

  getUserDetails() {
    const user = JSON.parse(localStorage.getItem('user') || '{}'); // Retrieve user from localStorage
    const userId = user.id; // Assume `id` is stored in localStorage during login

    if (!userId) {
      console.error('User ID not found in localStorage');
      this.router.navigate(['/login']); // Redirect to login if no user ID
      return;
    }

    this.http.get(`http://localhost:8600/users/profile?id=${userId}`).subscribe(
      (response: any) => {
        console.log('Fetched username:', response.username); // Debugging log
        this.username = response.username; // Set the username
        this.cdr.detectChanges(); // Trigger change detection
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }


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

  ngOnInit() {
    this.loadUsername(); 
  }

  loadUsername() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.username = user.username || 'Guest'; 
  }

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



import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { AlertController } from '@ionic/angular';

interface Product { 
  id: number;
  item_name: string;
  quantity: string;
  category_id: string;
  note?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
username: string = '';
products: Product[] = [];

  constructor(
    private router: Router, 
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private alertController: AlertController
  ) {}

 ngOnInit() {
    this.loadUsername(); 
    this.fetchProducts();
  }

  loadUsername() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.username = user.username || 'Guest';  
  }

  getUserDetails() { // Adjusted for consistency
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
    { id: 1, name: 'Beverages', icon: 'assets/icon/beverages.png' },
    { id: 2, name: 'Fruits', icon: 'assets/icon/fruits.png' },
    { id: 3, name: 'Vegetables', icon: 'assets/icon/vegs.png' },
    { id: 4, name: 'Snacks', icon: 'assets/icon/snacks.png' },
    { id: 5, name: 'Condiments', icon: 'assets/icon/condi.png' },
    { id: 6, name: 'Toiletries', icon: 'assets/icon/toilet.png' },
    { id: 7, name: 'Frozen Foods', icon: 'assets/icon/frozenfoods.png' },
    { id: 8, name: 'Dairy', icon: 'assets/icon/dairy.png' }
  ];

  logout() {
    localStorage.removeItem('user'); 
    this.router.navigate(['/login']); 
  }

  viewCategory(category: any) {
    console.log('Category clicked:', category); // Debug log for category object
    const categoryId = category.id; // Extract the ID from the category object
    console.log('Category ID:', categoryId); // Debug log for category ID
    this.fetchProducts(categoryId); // Fetch products for the selected category
  
    this.http.get(`http://localhost:8600/products?categoryId=${category}`).subscribe(
      (response: any) => {
        this.products = response; // Update the product list with the fetched products
      },
      (error) => {
        console.error('Error fetching products:', error);
        // Optional: Handle specific errors (e.g., session expired)
        if (error.status === 401) {
          // Redirect to login if session is invalid
          this.router.navigate(['/login']);

          this.fetchProducts(categoryId);
        }
      }
    );
  }

  fetchProducts(categoryId?: string) {
    let url = 'http://localhost:8600/grocery-items'; // Correct endpoint
    if (categoryId) {
      url += `?categoryId=${categoryId}`; // Pass categoryId as query parameter
    }
  
    console.log('Fetching products from URL:', url); // Debugging log for the URL
  
    this.http.get<Product[]>(url).subscribe(
      (response: Product[]) => {
        console.log(`Fetched products for category ${categoryId}:`, response);
        this.products = response; // Update the products array
      },
      (error) => {
        console.error('Error fetching products:', error); // Log the error
      }
    );
  }
  
  async confirmDelete(product: any) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: `Are you sure you want to delete "${product.item_name}"?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Delete canceled');
          },
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteProduct(product.id); // Ensure `product.id` is a number
          },
        },
      ],
    });
  
    await alert.present();
  }

  viewProduct(product: any) {
    console.log('Product clicked:', product);
    this.router.navigate(['/product', product.name]); 
  }

  goToAddPage() {
    const user = localStorage.getItem('user'); // Check for user session
    if (!user) {
      console.error('User not logged in. Redirecting to login...');
      this.router.navigate(['/login']); // Redirect to login if no session
    } else {
      this.router.navigate(['/add-item']); // Navigate to the Add Item page
    }
  }

  editProduct(product: any) {
    console.log('Editing Product ID:', product.id); 
    this.router.navigate(['/edit-item', product.id]);
  }

  deleteProduct(productId: number) {
    console.log('Deleting product with ID:', productId); // Debugging log
    this.http.delete(`http://localhost:8600/grocery-items/${productId}`).subscribe(
      (response: any) => {
        console.log('Item deleted successfully:', response);
        // Refresh the product list after deletion
        this.products = this.products.filter((product) => product.id !== productId);
      },
      (error) => {
        console.error('Error deleting item:', error);
      }
    );
  }

}

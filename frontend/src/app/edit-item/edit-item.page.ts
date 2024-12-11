import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.page.html',
  styleUrls: ['./edit-item.page.scss'],
})
export class EditItemPage implements OnInit {
  itemId: string = '';
  itemName: string = '';
  quantity: string = '';
  categoryId: string = '';
  note: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    // Get the item ID from the route
    this.itemId = this.route.snapshot.paramMap.get('id') || '';
    console.log('Editing Product ID:', this.itemId); // Debug log
  
    // Fetch the item details
    this.fetchItemDetails();
  }

  fetchItemDetails() {
    this.http.get(`http://localhost:8600/grocery-items/${this.itemId}`).subscribe(
      (response: any) => {
        console.log('Fetched Item Details:', response); // Debugging log
        this.itemName = response.item_name;
        this.quantity = response.quantity;
        this.categoryId = response.category_id;
        this.note = response.note;
      },
      (error) => {
        console.error('Error fetching item details:', error);
      }
    );
  }

  updateItem() {
    const updatedItem = {
      item_name: this.itemName,
      quantity: this.quantity,
      category_id: this.categoryId,
      note: this.note,
    };
  
    this.http.put(`http://localhost:8600/grocery-items/${this.itemId}`, updatedItem).subscribe(
      (response) => {
        console.log('Item updated successfully:', response);
        this.router.navigate(['/home']); // Redirect to home after update
      },
      (error) => {
        console.error('Error updating item:', error);
      }
    );
  }
  
}

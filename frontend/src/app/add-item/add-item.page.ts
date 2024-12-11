import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})

export class AddItemPage  {
  itemName: string = '';
  quantity: string = '';
  categoryId: string = '';
  note: string = '';


 constructor(
  private http: HttpClient, 
  private router: Router
 ){}

 addItem() {
  const newItem = {
    item_name: this.itemName,
    quantity: this.quantity,
    category_id: this.categoryId,
    note: this.note,
  };

  console.log('Adding item:', newItem); // Debugging log

  this.http.post('http://localhost:8600/grocery-items', newItem).subscribe(
    (response) => {
      console.log('Item added successfully:', response);
      this.router.navigate(['/home']); // Navigate to home after adding the item
    },
    (error) => {
      console.error('Error adding item:', error);
    }
  );
}
}

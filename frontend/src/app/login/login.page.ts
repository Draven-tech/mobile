import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(
    private http: HttpClient, 
    private alertController: AlertController
  ) {}

  async login() {
    if (!this.username || !this.password) {
      this.showAlert('Error', 'Please enter both username and password.');
      return;
    }
  
    const loginData = { username: this.username, password: this.password };
  
    this.http.post('http://localhost:8600/users/login', loginData).subscribe(
      async (response: any) => {
        if (response.success) {
          // Save the user details, including the username
          localStorage.setItem('user', JSON.stringify({
            id: response.user.id,
            username: response.user.username
          }));
  
          this.showAlert('Success', 'Login successful!');
          
          // Redirect to the home page
          window.location.href = '/home';
        } else {
          this.showAlert('Error', response.message);
        }
      },
      async (error) => {
        console.error(error);
        this.showAlert('Error', 'Login failed. Please try again.');
      }
    );
  }
  

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
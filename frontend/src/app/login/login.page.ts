import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

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
    private alertController: AlertController,
    private router: Router
  ) {}

  ionViewWillEnter() {
    const isLoggedIn = !!localStorage.getItem('user');
    if (isLoggedIn) {
      this.router.navigate(['/home']);
    }

    console.log('ionViewWillEnter triggered');
  try {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    console.log('User session:', user);
    if (user) {
      console.log('User logged in. Redirecting to /home');
      this.router.navigate(['/home']);
    } else {
      console.log('No user session found.');
    }
  } catch (error) {
    console.error('Error parsing user session:', error);
    localStorage.removeItem('user'); // Clear corrupted session
  }
  }

  async login() {
    if (!this.username || !this.password) {
      this.showAlert('Error', 'Please enter both username and password.');
      return;
    }
  
    const loginData = { username: this.username, password: this.password };
  
    this.http.post('http://localhost:8600/users/login', loginData).subscribe(
      async (response: any) => {
        if (response.success) {
          // Store session data in localStorage
          localStorage.setItem('user', JSON.stringify(response.user)); // Save the user details
  
          this.showAlert('Success', 'Login successful!');
          
          // Navigate to home page
          window.location.href = '/home'; // Redirect to the home page
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
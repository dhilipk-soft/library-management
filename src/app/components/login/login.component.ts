import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/Auth/auth';
import { ILoginResponse } from '../../models/interface/loginResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, FormsModule  ]
})
export class LoginComponent {
  phone: string = '';
  password: string = '';
  logResponse: ILoginResponse | null = null ;
  constructor(private authService: Auth,
    private router: Router
  ){  }

  onSubmit() {
    
    this.authService.login(this.phone, this.password).subscribe(
      (response: ILoginResponse) => {
        this.logResponse = response;
        localStorage.setItem('accessToken', response.accessToken)
        localStorage.setItem('refreshToken', response.refreshToken)
        localStorage.setItem('expiresAt', response.expiresAt)
        this.password = ""
        this.phone = ""

        this.router.navigate(['/management/books']);

        // Handle successful login, e.g., store tokens, navigate to dashboard
      },
      (error) => {
        console.error('Login failed', error);
        // Handle  login error, e.g., display error message to user
      }
    );
    // Call backend login API here
  }
}

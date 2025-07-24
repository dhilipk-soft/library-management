import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Auth } from '../../services/Auth/auth';

@Component({
  selector: 'app-header',
  imports: [MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  router = inject(Router);
  profile: boolean = false;
  loginStatus: boolean = false;

  toggleBar: boolean = false;

  @Output() toggleBarChange = new EventEmitter<boolean>();

  constructor(authService: Auth) {
    this.loginStatus = authService.isLoggedIn();
    console.log(this.loginStatus);
  }

  handleToggle() {
    console.log(this.toggleBar);
    this.toggleBar = !this.toggleBar;
    this.toggleBarChange.emit(this.toggleBar);
  }

  openProfile() {
    this.profile = !this.profile;
    // console.log(this.profile);
  }

  profileTab() {
    this.openProfile();
  }

  logout() {
    if (!this.loginStatus) {
      this.router.navigate(['/login']);
    }

    this.openProfile();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    this.router.navigate(['/login']);
  }
}

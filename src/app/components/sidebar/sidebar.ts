import { Component, Input, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CLAIM_KEYS } from '../../constant/role';
import { Auth } from '../../services/Auth/auth';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterModule, MatIconModule, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class Sidebar {
  ROLES = CLAIM_KEYS.ROLES;

  @Input() role: string = '';
  @Input() toogleBar: boolean = false;

  loggedIn: boolean = false;

  constructor(private authService: Auth) {
    this.loggedIn = this.authService.isLoggedIn();
  }
}

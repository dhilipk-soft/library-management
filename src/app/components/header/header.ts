import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {  MatIconModule } from '@angular/material/icon';
import { routes } from '../../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})

export class Header {

  router = inject(Router)
  profile : boolean = false

  @Input() toggleBar: boolean = false;

  @Output() toggleBarChange = new EventEmitter<boolean>();

  handleToggle(){
    this.toggleBar = !this.toggleBar;
    this.toggleBarChange.emit(this.toggleBar);
  }

  openProfile(){
    this.profile = !this.profile
    console.log(this.profile)
  }

  profileTab(){
    this.openProfile();

  }

  logout(){
    this.openProfile();

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    this.router.navigate(['/login'])
  }
}
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../components/header/header';
import { Sidebar } from './sidebar/sidebar';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-management',
  imports: [RouterOutlet, CommonModule, Header, Sidebar, Footer],
  templateUrl: './management.html',
  styleUrl: './management.scss'
})
export class Management {
  
  role: string = "";
  toogleBar : boolean = false;

  ngOnInit(): void {
    this.handleRole();
  }

  handleToggle(value: boolean){
    this.toogleBar = value;
  }

  handleRole():void {
    
    const token = localStorage.getItem('accessToken')
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          this.role = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
           console.log("Role:", this.role);
        }

  }
}

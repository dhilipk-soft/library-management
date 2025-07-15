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
   toogleBar : boolean = false;

  handleToggle(value: boolean){
    this.toogleBar = value;
  }
}

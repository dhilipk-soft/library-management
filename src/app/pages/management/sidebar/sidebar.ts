import { Component, Input, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {CLAIM_KEYS} from '../../../constant/role';

@Component({
  selector: 'app-sidebar',
  imports: [ RouterLink, RouterModule, MatIconModule, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  encapsulation: ViewEncapsulation.None
})
export class Sidebar {

  ROLES = CLAIM_KEYS.ROLES

  @Input() role: string = ''

  @Input() toogleBar: boolean = false;
  
}

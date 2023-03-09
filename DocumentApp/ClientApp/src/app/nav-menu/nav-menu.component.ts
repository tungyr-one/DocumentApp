import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap, Observable } from 'rxjs';
import { Category } from '../_models/Category';
import { CategoryService } from '../_services/category.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  constructor(){}
}

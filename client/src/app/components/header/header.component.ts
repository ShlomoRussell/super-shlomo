import { Component, OnInit, TemplateRef } from '@angular/core';
import { NavigationEnd, Router, Scroll } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ItemsService } from 'src/app/services/items.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public isCollapsed = false;
  public user!: User;
  public isShopping = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private itemsService: ItemsService
  ) {}
  ngOnInit(): void {
    this.authService.getUser.subscribe((res) => (this.user = res));
    this.router.events.subscribe((event) => {
      if (event instanceof Scroll && event.routerEvent.url === '/shop') {
        this.isShopping = true;
      } else {
        this.isShopping = false;
      }
    });
  }
  public onChangeSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.itemsService.searchItems(target.value);
  }
  public logOut() {
    this.authService.logOut();
  }
}

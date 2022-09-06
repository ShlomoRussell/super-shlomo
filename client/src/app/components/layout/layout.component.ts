import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  public isLoggedIn = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.getLoggedIn.subscribe((res) => (this.isLoggedIn = res));
  }
}

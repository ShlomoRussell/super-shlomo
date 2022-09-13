import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public isCollapsed = false;
  public username: string | undefined;
  constructor(private auth: AuthService) {}
  ngOnInit(): void {
    this.auth.getUser.subscribe((res) => (this.username = res.username));
  }
}

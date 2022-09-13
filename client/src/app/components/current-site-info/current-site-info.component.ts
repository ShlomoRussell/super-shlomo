import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-current-site-info',
  templateUrl: './current-site-info.component.html',
  styleUrls: ['./current-site-info.component.css'],
})
export class CurrentSiteInfoComponent implements OnInit {
  constructor(private router:Router) {}

  ngOnInit(): void {}
  public startShopping() {
this.router.navigate(['/shop'])
  }
}

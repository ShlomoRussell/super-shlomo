import { Component, Input, OnInit } from '@angular/core';
import { Items } from 'src/app/models/item.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input()
   item!: Items
  constructor() { }

  ngOnInit(): void {
  }
  public addToCart() {
   
 }
}

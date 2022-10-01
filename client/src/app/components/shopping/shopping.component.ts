import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Items } from 'src/app/models/item.model';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css'],
})
export class ShoppingComponent implements OnInit {
  public items!: Items[];
  constructor(private itemsService: ItemsService) {}

  ngOnInit(): void {
    this.itemsService
      .getAllItems()
      .pipe(tap((res) => this.itemsService._items.next(res) ))
      .subscribe((res) => this.itemsService.setItems(res));

    this.itemsService.getItems.subscribe((res) => (this.items = res));
  }
}

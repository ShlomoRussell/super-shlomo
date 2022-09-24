import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  public categories: String[]=['All'];
  constructor(private itemsService: ItemsService) {}

  ngOnInit(): void {
    this.itemsService
      .getCategories()
      .subscribe((res) => (this.categories = [...this.categories,...res]));
  }

  public onCategoryClick(category: String): void {
    this.itemsService.filterCategories(category);
  }
}

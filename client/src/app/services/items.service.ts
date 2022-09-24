import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Items } from '../models/item.model';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private items = new BehaviorSubject<Items[]>([]);
  public getItems = this.items.asObservable();
  public setItems(items: Items[]) {
    return this.items.next(items);
  }
  public _items: Items[] = [];
  constructor(private httpClient: HttpClient) {}

  public filterCategories(category: String) {
    if (category === 'All') return this.setItems(this._items);

    return this.setItems(
      this._items.filter((item) => item.category === category)
    );
  }

  public searchItems(searchWords: string) {
    const regex = new RegExp(searchWords, 'gi');
    return this.setItems(
      this._items.filter((item) => item.productName?.match(regex))
    );
  }

  public getCategories(): Observable<String[]> {
    return this.httpClient.get<String[]>('/api/items/categories');
  }

  public getAllItems(): Observable<Items[]> {
    return this.httpClient.get<Items[]>('/api/items/allItems');
  }

  public addItem(item: FormData): Observable<Items> {
    return this.httpClient.post<Items>('/api/items/addItem', item);
  }
}

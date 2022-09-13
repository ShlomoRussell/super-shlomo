import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingLayoutComponent } from './shopping-layout.component';

describe('ShoppingLayoutComponent', () => {
  let component: ShoppingLayoutComponent;
  let fixture: ComponentFixture<ShoppingLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

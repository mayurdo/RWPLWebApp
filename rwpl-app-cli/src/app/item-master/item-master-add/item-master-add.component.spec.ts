import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemMasterAddComponent } from './item-master-add.component';

describe('ItemMasterAddComponent', () => {
  let component: ItemMasterAddComponent;
  let fixture: ComponentFixture<ItemMasterAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemMasterAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemMasterAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

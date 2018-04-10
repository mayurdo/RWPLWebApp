import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemMasterQualityAddComponent } from './item-master-quality-add.component';

describe('ItemMasterQualityAddComponent', () => {
  let component: ItemMasterQualityAddComponent;
  let fixture: ComponentFixture<ItemMasterQualityAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemMasterQualityAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemMasterQualityAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

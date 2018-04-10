import { TestBed, inject } from '@angular/core/testing';

import { StockMasterService } from './stock-master.service';

describe('StockMasterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StockMasterService]
    });
  });

  it('should be created', inject([StockMasterService], (service: StockMasterService) => {
    expect(service).toBeTruthy();
  }));
});

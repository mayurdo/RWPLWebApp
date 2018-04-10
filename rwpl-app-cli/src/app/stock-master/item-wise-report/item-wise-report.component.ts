import { Component, OnInit } from '@angular/core';

import { SharedService } from "../../shared/shared.service";
import { StockMasterService } from "../stock-master.service";
import { StockReport } from "../stock-master";
import { ItemMaster } from "../../item-master/item-master";

@Component({
  selector: 'app-item-wise-report',
  templateUrl: './item-wise-report.component.html',
  styleUrls: ['./item-wise-report.component.css'],
  providers: [StockMasterService]
})
export class ItemWiseReportComponent implements OnInit {

  constructor(private _stockMasterService: StockMasterService,
    private sharedService: SharedService) { }

  stockReportList: StockReport[] = [];
  itemMasterList: ItemMaster[] = [];
  boxCodeSearchList: string[] = [];
  selectedItem: ItemMaster = new ItemMaster();
  searchItem = {
    BoxCodeSearch: ""
  }


  ngOnInit() {
    
    this.itemMasterList = this.sharedService.ItemMasterList;
    this.boxCodeSearchList = this.itemMasterList.map(x => x.BoxCode + ' (' + x.ClientName + ')');
  }

  searchItemStock(): void {
    let boxCodeSearch = this.searchItem.BoxCodeSearch;
    let selectedItems = this.itemMasterList.filter(function (item) {
      return (item.BoxCode + ' (' + item.ClientName + ')' == boxCodeSearch)
    });

    if (selectedItems.length <= 0)
      return;

    this.selectedItem = selectedItems[0];

    this.sharedService.showSpinner();
    this._stockMasterService.getStockReport(null, this.selectedItem.Id).subscribe(
      data => this.stockReportList = data,
      err => console.log(err),
      () => this.sharedService.hideSpinner()
    );
  }

}

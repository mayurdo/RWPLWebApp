import { Component, OnInit } from '@angular/core';
import { DatePipe } from "@angular/common";
import { Observable } from "rxjs/Rx";

import { SharedService } from "../../shared/shared.service";
import { StockMasterService } from "../stock-master.service";
import { StockReport } from "../stock-master";
import { ItemMaster } from "../../item-master/item-master";

@Component({
  selector: 'app-stock-report',
  templateUrl: './stock-report.component.html',
  styleUrls: ['./stock-report.component.css'],
  providers: [StockMasterService]
})
export class StockReportComponent implements OnInit {

  constructor(private _stockMasterService: StockMasterService,
    private _datePipe: DatePipe,
    private sharedService: SharedService) { }

  stockReportList: StockReport[] = [];
  itemMasterList: ItemMaster[] = [];
  boxCodeSearchList: string[] = [];
  clientNameSearchList: string[] = [];
  searchItem = {
    StockEntryDate: this._datePipe.transform(new Date(), "yyyy-MM-dd"),
    ItemId: null,
    BoxCodeSearch: "",
    ClientName: "",
    ShowAvailableStock: ""
  }

  ngOnInit() {
    this.searchItemStock();

    this.itemMasterList = this.sharedService.ItemMasterList;
    this.boxCodeSearchList = this.itemMasterList.map(x => x.BoxCode + ' (' + x.ClientName + ')');

    console.log("start distinct")
    Observable.merge(this.itemMasterList.map(x => x.ClientName))
      .distinct(x => x)
      .subscribe(data => { this.clientNameSearchList.push(data); console.log(data); })
  }


  searchItemStock(): void {
    let boxCodeSearch = this.searchItem.BoxCodeSearch;
    let selectedItems = this.itemMasterList.filter(function (item) {
      return (item.BoxCode + ' (' + item.ClientName + ')' == boxCodeSearch)
    });


    this.searchItem.ItemId = (selectedItems.length > 0) ? selectedItems[0].Id : null;

    this.sharedService.showSpinner();
    this._stockMasterService.getStockReport(this.searchItem.StockEntryDate, this.searchItem.ItemId).subscribe(
      data => this.fiterStockDataByClient(data),
      err => console.log(err),
      () => this.sharedService.hideSpinner()
    );
  }

  private fiterStockDataByClient(data: StockReport[]) {
    let clientName = this.searchItem.ClientName;
    let showAvailableStock = this.searchItem.ShowAvailableStock;

    let itemIds = this.itemMasterList.filter(x => x.ClientName == clientName).map(x => x.Id);

    this.stockReportList = data.filter(x => ((!clientName) || itemIds.indexOf(x.ItemId) >= 0)
                                          && ((!showAvailableStock) || x.OpeningStock > 0));
  }

}

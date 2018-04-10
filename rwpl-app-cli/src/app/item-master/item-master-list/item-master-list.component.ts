import { Component, OnInit } from '@angular/core';
import { ItemMaster } from "../item-master";
import { ItemMasterService } from "../item-master.service";
import { SharedService } from "../../shared/shared.service";

@Component({
  selector: 'app-item-master-list',
  templateUrl: './item-master-list.component.html',
  styleUrls: ['./item-master-list.component.css']
})
export class ItemMasterListComponent implements OnInit {

  constructor(private sharedService: SharedService) { }

  gridItemList: ItemMaster[] = [];
  itemSearch: any = {
    BoxCode: "",
    ClientName: ""
  };

  ngOnInit() {    
    console.log("ItemListCompOnInit");
    this.gridItemList = this.sharedService.ItemMasterList;
  }

  itemSearchValueChange(): void {
    let boxCode = this.itemSearch.BoxCode;
    let clientName = this.itemSearch.ClientName;

    this.gridItemList = this.sharedService.ItemMasterList.filter(function (item) {
      if (((boxCode == "") || (item.BoxCode.toUpperCase().indexOf(boxCode.toUpperCase()) >= 0))
        && ((clientName == "") || (item.ClientName.toUpperCase().indexOf(clientName.toUpperCase()) >= 0)))
        return true;
    })
  }
}

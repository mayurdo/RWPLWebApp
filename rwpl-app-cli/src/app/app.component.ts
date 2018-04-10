import { Component } from '@angular/core';

import { SharedService } from "./shared/shared.service";
import { ItemMasterService } from "./item-master/item-master.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private sharedService: SharedService, private itemMasterService: ItemMasterService) {
    this.loadItemMaster();
  }

  private loadItemMaster(): void {
    this.sharedService.showSpinner();
    this.itemMasterService.getAll().subscribe(
      data => this.sharedService.ItemMasterList = data,
      err => console.log(err),
      () => this.sharedService.hideSpinner()
    )
  }

  title = 'app';
}

import { Component, OnInit } from '@angular/core';
import { DatePipe } from "@angular/common";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

import { SharedService } from "../../shared/shared.service";
import { StockMasterService } from "../stock-master.service";
import { ItemMaster } from "../../item-master/item-master";

@Component({
  selector: 'app-stock-entry',
  templateUrl: './stock-entry.component.html',
  styleUrls: ['./stock-entry.component.css'],
  providers: [StockMasterService]
})
export class StockEntryComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder, private _datePipe: DatePipe,
    private _stockMasterService: StockMasterService,
    private sharedService: SharedService) { }

  entryFormGroup: FormGroup;
  itemMasterList: ItemMaster[] = [];
  boxCodeSearchList: string[] = [];
  savedMessage: string = "";
  errorMessage: string = "";

  ngOnInit() {
    this.createStockEntryForm();

    this.itemMasterList = this.sharedService.ItemMasterList;
    this.boxCodeSearchList = this.itemMasterList.map(x => x.BoxCode + ' (' + x.ClientName + ')');
  }

  boxCodeSearchChanged(value: string): void {

    let selectedItems = this.itemMasterList.filter(function (item) {
      return (item.BoxCode + ' (' + item.ClientName + ')' == value)
    });

    if (selectedItems.length <= 0)
      return;

    this.entryFormGroup.controls.BoxCode.setValue(selectedItems[0].BoxCode);
    this.entryFormGroup.controls.ClientName.setValue(selectedItems[0].ClientName);
    this.entryFormGroup.controls.POCode.setValue(selectedItems[0].POCode);
    this.entryFormGroup.controls.ItemId.setValue(selectedItems[0].Id);

    let itemId = this.entryFormGroup.controls.ItemId.value;
    let stockDate = this.entryFormGroup.controls.StockEntryDate.value;



    //    this.entryFormGroup.controls.ProduceQty.
    this.sharedService.showSpinner();
    this._stockMasterService.getStockReport(stockDate, itemId)
      .subscribe(
      data => {

        if (data.length <= 0)
          return;

        let stockReport = data[0];
        this.entryFormGroup.controls.Id.setValue(stockReport.Id || 0);
        this.entryFormGroup.controls.OpeningStock.setValue(stockReport.OpeningStock);
        this.entryFormGroup.controls.ProduceQty.setValue(stockReport.ProduceQty);
        this.entryFormGroup.controls.DispatchQty.setValue(stockReport.DispatchQty);
        this.entryFormGroup.controls.InvoiceNo.setValue(stockReport.InvoiceNo);
        this.entryFormGroup.controls.GrnNo.setValue(stockReport.GrnNo);

        console.log(this.entryFormGroup.controls.Id.value);
      },
      err => console.log(err),
      () => this.sharedService.hideSpinner()
      );
  }

  resetForm() {
    this.entryFormGroup.controls.DispatchQty.value > 0
    this.entryFormGroup.reset();
    this.entryFormGroup.controls.StockEntryDate.setValue(this._datePipe.transform(new Date(), "yyyy-MM-dd"));
    this.savedMessage = "";
    this.errorMessage = "";
  }

  dispatchQtyChange() {
    if (this.entryFormGroup.controls.DispatchQty.value <= 0) {
      this.entryFormGroup.controls.InvoiceNo.setValue("");
    }
  }


  saveForm(): void {

    let openingStock = this.entryFormGroup.controls.OpeningStock.value;
    let produceQty = this.entryFormGroup.controls.ProduceQty.value;
    let dispatchQty = this.entryFormGroup.controls.DispatchQty.value;
    
    
    if (this.entryFormGroup.invalid) {
      this.sharedService.validateAllFormFields(this.entryFormGroup);
      return;
    }

    if ( !produceQty  && !dispatchQty) {
      this.entryFormGroup.controls.ProduceQty.markAsDirty();
      this.errorMessage = "Please enter Produce Qty or Dispatch Qty";
      console.log(this.errorMessage);
      return;
    }

    if ((openingStock + produceQty) - dispatchQty < 0) {
      this.errorMessage = "Dispatch Qty should be less then (Opening Stock + Produce Qty)";
      return;
    }

    let itemMaster: ItemMaster = this.entryFormGroup.value;

    this.sharedService.showSpinner();
    this._stockMasterService.save(this.entryFormGroup.value)
      .subscribe(data => {
        //console.log(data);
        this.resetForm();
        console.log("Item Master data saved");
        this.savedMessage = "Stock saved successfull";
      }, err => {
        console.log(err);
        this.errorMessage = "Error while saving Stock";
      },
      () => this.sharedService.hideSpinner()
      );

  }


  createStockEntryForm(): void {
    this.entryFormGroup = this._formBuilder.group({
      Id: [""],
      StockEntryDate: [this._datePipe.transform(new Date(), "yyyy-MM-dd"), Validators.required],
      BoxCodeSearch: ["", Validators.required],
      ItemId: [""],
      BoxCode: ["", Validators.required],
      ClientName: ["", Validators.required],
      POCode: [],
      OpeningStock: [],
      ProduceQty: [],
      DispatchQty: [],
      ClosingStock: [],
      InvoiceNo: [],
      GrnNo: []
    })
  }

}

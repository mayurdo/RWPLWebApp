import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { ItemMaster } from "../item-master";
import { ItemFitment } from "../item-fitment";
import { ItemMasterVm } from "../item-master-vm";
import { ItemMasterService } from "../item-master.service";
import { SharedService } from "../../shared/shared.service";

@Component({
  selector: 'app-item-master-add',
  templateUrl: './item-master-add.component.html',
  styleUrls: ['./item-master-add.component.css']
})
export class ItemMasterAddComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder,
    private _itemMasterService: ItemMasterService,
    private _activeRoute: ActivatedRoute,
    private sharedService: SharedService) {

  }

  itemAddForm: FormGroup;
  fitmentList: string[] = [];
  itemId: number;
  savedMessage: string = "";
  errorMessage: string = " ";

  ngOnInit() {

    this._activeRoute.params.subscribe(params => this.itemId = params.id);

    this.createFormGroup();
  }

  createFormGroup(): void {

    this.createNewItemForm();
    if (this.itemId == undefined) {
      this.createNewItemForm();
      return;
    }

    this.sharedService.showSpinner();
    this._itemMasterService.getEntity(this.itemId).subscribe(
      data => this.editItemForm(data),
      err => console.log(err),
      () => this.sharedService.hideSpinner()
    )

  }

  createNewItemForm(): void {
    console.log("CreateForm")
    this.itemAddForm = this._formBuilder.group({
      Id: [0],
      ClientName: ["", Validators.required],
      BoxCode: ["", Validators.required],
      POCode: [""],
      BoxSizeLength: [],
      BoxSizeWidth: [],
      BoxSizeHeight: [],
      BoardSizeLength: [],
      BoardSizeWidth: [],
      fitmentName: [""]
    });
  }

  editItemForm(itemMasterVM: ItemMasterVm): void {
    console.log("EditForm")

    this.fitmentList = itemMasterVM.ItemFitments.map(x => x.FitmentName);
    let itemMaster: ItemMaster = itemMasterVM.ItemMaster;

    console.log(itemMaster);

    this.itemAddForm = this._formBuilder.group({
      Id: [itemMaster.Id],
      ClientName: [itemMaster.ClientName, Validators.required],
      BoxCode: [itemMaster.BoxCode, Validators.required],
      POCode: [itemMaster.POCode],
      BoxSizeLength: [itemMaster.BoxSizeLength],
      BoxSizeWidth: [itemMaster.BoxSizeWidth],
      BoxSizeHeight: [itemMaster.BoxSizeHeight],
      BoardSizeLength: [itemMaster.BoardSizeLength],
      BoardSizeWidth: [itemMaster.BoardSizeWidth],
      fitmentName: [""]
    });
  }

  addFitment(fitmentFormControl: FormControl): void {
    let fitmentName = fitmentFormControl.value;
    if (!fitmentName)
      return
    this.fitmentList.push(fitmentName);
    fitmentFormControl.setValue("");
  }

  deleteFitment(fitmentName: string): void {
    let removeIndex: number = this.fitmentList.indexOf(fitmentName);
    this.fitmentList.splice(removeIndex, 1);
  }

  checkDuplicateItem(): boolean {
    let boxCode = this.itemAddForm.controls.BoxCode.value;
    let clientName = this.itemAddForm.controls.ClientName.value;
    let selectedItem = this.sharedService.ItemMasterList.find(x => x.BoxCode == boxCode
      && x.ClientName == clientName);

    if (selectedItem) {
      this.errorMessage = "Item is allready exist";
      return true;
    } else {
      this.errorMessage = "";
      return false;
    }
  }

  saveItemMaster(): void {

    if (this.checkDuplicateItem())
      return;

    if (this.itemAddForm.invalid) {
      this.sharedService.validateAllFormFields(this.itemAddForm);
      return;
    }

    let itemMaster: ItemMaster = this.itemAddForm.value;
    let itemFitmentList: ItemFitment[] = [];

    this.fitmentList.forEach((value) => itemFitmentList.push({
      Id: 0,
      FitmentName: value,
      ClientName: itemMaster.ClientName,
      BoxCode: itemMaster.BoxCode
    }));

    //console.log(itemMaster);
    this.sharedService.showSpinner();
    this._itemMasterService.save(itemMaster, itemFitmentList)
      .subscribe(data => {
        //console.log(data);

        this._itemMasterService.getAll().subscribe(
          data => this.sharedService.ItemMasterList = data,
          err => console.log(err),
          () => this.sharedService.hideSpinner()
        )
        this.resetForm();
        console.log("Item Master data saved");
        this.savedMessage = "Item Master saved successfull";
      }, err => {
        console.log(err);
        this.errorMessage = "Error while saving Item Master";
      },
      () => console.log("Item Save Done")
      );
  }

  resetForm(): void {
    this.itemAddForm.reset();
    this.fitmentList = [];
    this.savedMessage = "";
    this.errorMessage = ""
  }






}





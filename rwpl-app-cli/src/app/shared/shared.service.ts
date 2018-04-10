import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { ItemMaster } from "../item-master/item-master";

@Injectable()
export class SharedService {

  constructor(private spinnerService: Ng4LoadingSpinnerService) {
    
  }

  public static get BaseServiceUrl():string { 
    //return "http://localhost:52227/api/";
    return "http://rwplservices.bestdeeal.com/api/";
  }

  public ItemMasterList: ItemMaster[] = [];


  public showSpinner():void{
    this.spinnerService.show();
  }

  public hideSpinner():void{
    this.spinnerService.hide();
  }

  public validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  // public loadItemMasterData(): void {
  //   console.log("loadItemMaster");
  //   this.spinnerService.show();
  //   this.itemService.getAll().subscribe(
  //     data => this.ItemMasterList = data,
  //     err => console.log(err),
  //     () => this.spinnerService.hide()
  //   )
  // }
}

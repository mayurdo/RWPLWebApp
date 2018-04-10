import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { SharedService } from "../shared/shared.service";
import { ItemMaster } from "./item-master";
import { ItemFitment } from "./item-fitment";
import { ItemMasterVm } from "./item-master-vm";

@Injectable()
export class ItemMasterService {

  constructor(private _http: HttpClient) { }

  private serviceUrl: string = SharedService.BaseServiceUrl + "/ItemMaster";

  getAll(): Observable<ItemMaster[]> {

    return this._http.get<ItemMaster[]>(this.serviceUrl);

  }

  getEntity(id: number): Observable<ItemMasterVm> {
    let paramsData = new HttpParams().set("id", id.toString())
    return this._http.get<ItemMasterVm>(this.serviceUrl, { params: paramsData })
  }

  save(itemMaster: ItemMaster, itemFitmentList: ItemFitment[]): Observable<Object> {
    let itemMasterData: any = {
      ItemMaster: itemMaster,
      ItemFitments: itemFitmentList
    };
    console.log(itemMasterData);
    return this._http.post(this.serviceUrl, itemMasterData)
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { SharedService } from "../shared/shared.service";
import { StockMaster,StockReport } from "./stock-master";


@Injectable()
export class StockMasterService {

  constructor(private _http:HttpClient) { }

  private serviceUrl:string=  SharedService.BaseServiceUrl +"/stockmaster";

  getStockReport(stockDate?:string,itemId?:number):Observable<StockReport[]>{

    return this._http.get<StockReport[]>(this.serviceUrl+"/GetStockReport/"+ 
                                                itemId+"/"+stockDate);
  }

  save(stockMaster:StockMaster):Observable<object> {
    return this._http.post(this.serviceUrl,stockMaster)
  }

}

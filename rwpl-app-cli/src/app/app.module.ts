import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { DatePipe } from "@angular/common";
import { Ng2AutoCompleteModule } from "ng2-auto-complete";
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { ItemMasterService } from "./item-master/item-master.service";
import { SharedService } from "./shared/shared.service";

import { AppComponent } from './app.component';
import { RouteModule } from "./app.route";
import { ItemMasterListComponent } from './item-master/item-master-list/item-master-list.component';
import { ItemMasterAddComponent } from './item-master/item-master-add/item-master-add.component';
import { StockEntryComponent } from './stock-master/stock-entry/stock-entry.component';
import { StockReportComponent } from './stock-master/stock-report/stock-report.component';
import { ItemWiseReportComponent } from './stock-master/item-wise-report/item-wise-report.component';
import { ItemMasterQualityAddComponent } from './item-master-quality/item-master-quality-add/item-master-quality-add.component';



@NgModule({
  declarations: [
    AppComponent,
    ItemMasterListComponent,
    ItemMasterAddComponent,
    StockEntryComponent,
    StockReportComponent,
    ItemWiseReportComponent,
    ItemMasterQualityAddComponent
  ],
  imports: [
    BrowserModule,
    RouteModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2AutoCompleteModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [DatePipe,ItemMasterService,SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }

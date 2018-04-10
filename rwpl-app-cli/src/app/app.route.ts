
import { ModuleWithProviders } from "@angular/core";
import {  RouterModule, Routes } from "@angular/router";
import { ItemMasterListComponent } from './item-master/item-master-list/item-master-list.component';
import { ItemMasterAddComponent } from './item-master/item-master-add/item-master-add.component';
import { StockEntryComponent } from "./stock-master/stock-entry/stock-entry.component";
import { StockReportComponent } from "./stock-master/stock-report/stock-report.component";
import { ItemWiseReportComponent } from "./stock-master/item-wise-report/item-wise-report.component";
import { ItemMasterQualityAddComponent } from './item-master-quality/item-master-quality-add/item-master-quality-add.component';

const routes:Routes=[    
    {
        path:'list-item-master',
        component:ItemMasterListComponent
    },
    {
        path:'add-item-master',
        component: ItemMasterAddComponent
    },
    {
        path:'edit-item/:id',
        component:ItemMasterAddComponent
    },
    {
        path:'add-item-master-quality',
        component: ItemMasterQualityAddComponent
    },
    {
        path:'stock-entry',
        component:StockEntryComponent
    },
    {
        path:'stock-report',
        component:StockReportComponent
    },
    {
        path:'item-stock-report',
        component:ItemWiseReportComponent
    },

]

  export const RouteModule:ModuleWithProviders= RouterModule.forRoot(routes); 

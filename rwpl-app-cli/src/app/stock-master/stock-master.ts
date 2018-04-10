export class StockMaster {
    public Id:number;
    public ItemId:number;
    public StockEntryDate:Date;
    public ProduceQty?:number;
    public DispatchQty?:number;
    public InvoiceNo:string;
    public GrnNo:string;
}

export class StockReport extends StockMaster {

    public OpeningStock?:number;
}

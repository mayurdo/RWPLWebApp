import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BoxPaperCombination  } from "./../box-paper-combination";

@Component({
  selector: 'app-item-master-quality-add',
  templateUrl: './item-master-quality-add.component.html',
  styleUrls: ['./item-master-quality-add.component.css']
})
export class ItemMasterQualityAddComponent implements OnInit {

  constructor(private formBuilder:FormBuilder) { }

  itemAddForm: FormGroup;
  boxPaperCombinationList:BoxPaperCombination[]=[];
  

  ngOnInit() {
    this.createNewItemForm();    
  }


  calculateWeight():void{
     let boardLength = this.itemAddForm.controls.BoardSizeLength.value ? this.itemAddForm.controls.BoardSizeLength.value : 0;
     let boardWidth=this.itemAddForm.controls.BoardSizeWidth.value ? this.itemAddForm.controls.BoardSizeWidth.value : 0;
     let gsm=this.itemAddForm.controls.GSM.value ? this.itemAddForm.controls.GSM.value : 0;

     let flutingAdustment=1;

     console.log("boardLength: "+boardLength)
     console.log("boardWidth: "+boardWidth)
     console.log("gsm: "+gsm)

     let weight = (boardLength * boardWidth * (gsm / 1000) * flutingAdustment) / 1550;

     this.itemAddForm.controls.Weight.setValue(weight.toFixed(3));
      
  }



  createNewItemForm(): void {
    console.log("CreateForm")
    this.itemAddForm = this.formBuilder.group({
      Id: [0],
      ClientName: ["", Validators.required],
      BoxCode: ["", Validators.required],
      POCode: [""],
      BoxSizeLength: [],
      BoxSizeWidth: [],
      BoxSizeHeight: [],
      BoardSizeLength: [],
      BoardSizeWidth: [],
      PinQty: [],
      NoOfPly: [],
      PaperType: [this.plyList[this.boxPaperCombinationList.length]],
      BF: [],
      GSM: [],
      Weight: [],
      Bursting: [],      
      fitmentName: [""]
    });
  }


  plyList:string[]=[
    "Top",
    "Flute 1",
    "Liner 1",
    "Flute 2",
    "Liner 2",
    "Flute 3",
    "Liner 3",
    "Flute 4",
    "Liner 4",    
  ]

}

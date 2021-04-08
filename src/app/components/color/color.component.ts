import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  constructor(private colorService:ColorService) { }

  colors:Color[]=[];
  currentColor :Color;
  allColor:Color;
  dataLoaded = false;
  filterText="";
  @Output() colorId = new EventEmitter<string>();

  ngOnInit(): void {
    this.getColors();
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data
      this.dataLoaded=true;
    })
  }

  setCurrentColor(color:Color){    
    this.currentColor=color;
  } 

  allColorSelected(){
    return this.currentColor == undefined ? true : false;
  } 

  clearFilter() {
    this.filterText = "";
    this.getColors();
  }

  getAllColorClass() {
    if (!this.currentColor) {
      return 'list-group-item active cursorPointer';
    } else {
      return 'list-group-item cursorPointer';
    }
  }

  getColorClass(color:Color){
    if(color == this.currentColor){
      return "list-group-item active cursorPointer"
    }else{
      return "list-group-item cursorPointer"
    }
  }

}

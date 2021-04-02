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
  @Output() colorId = new EventEmitter<string>();

  ngOnInit(): void {
    this.getColors();
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data
    })
  }

  setCurrentColor(){    
    this.colorId.emit(this.currentColor?.colorId.toString());
  } 

  allColorSelected(){
    return this.currentColor == undefined ? true : false;
  } 

}

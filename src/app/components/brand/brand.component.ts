import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  brands:Brand[]=[];
  currentBrand:Brand;
  allBrand:Brand;
  filterText="";
  dataLoaded = false;
  @Output() brandId = new EventEmitter<string>();
  

  constructor(private brandService:BrandService) { }

  ngOnInit(): void {
    console.log("Brandın initi çalıştı")
    this.getBrands();
    this.dataLoaded=true;
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data
    })
  }

  setCurrentBrand(brand:Brand){
    this.currentBrand = brand;
  }

  getCurrentBrandClass(brand:Brand){
    if(brand==this.currentBrand){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }
  allBrandSelected(){
    return this.currentBrand == undefined ? true : false;
  } 
  setCurrentBrand2(){    
    this.brandId.emit(this.currentBrand?.brandId.toString());
} 
clearFilter() {
  this.filterText = "";
  this.getBrands();
}

}

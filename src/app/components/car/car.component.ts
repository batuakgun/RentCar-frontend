import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { CarImage } from 'src/app/models/caImage';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars:Car[] = [];
  brands: Brand[] = [];
  colors : Color[] = [];
  images:CarImage[];
  dataLoaded=false;
  currentCar:Car;
  filterText="";

  brandFilter: number;
  colorFilter: number;

  imageUrl='https://localhost:44360/'

  constructor(private carService:CarService, private activatedRoute:ActivatedRoute,
    private carImageService:CarImageService, private brandService:BrandService, private colorService:ColorService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.getBrands();
    this.getColors();
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getCarsByBrand(params["brandId"]);
      }else if(params["colorId"]){
         this.getCarsByColor(params["colorId"]);
      }else if(params["selectedBrandId"] && params["selectedColorId"]){
        this.getCarsByBrandandColor(params["selectedBrandId"],params["selectedColorId"]);
      }else{
        this.getCars();
      }
    })
    })
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByBrand(brandId:number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarImagesByCarId(carId:number){
    this.carImageService.getCarImagesByCarId(carId).subscribe(response=>{
     this.images=response.data;
     console.log(response);
    })
     
  }
  getSliderClassName(index:Number){
    if(index == 0){
      return "carousel-item active";
    } else {
      return "carousel-item";
    }
  }
  
  setCurrentCar(car:Car){
    this.currentCar = car;
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  getSelectedBrand(brandId: number) {
    if (this.brandFilter == brandId)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  getSelectedColor(colorId: number) {
    if (this.colorFilter == colorId)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  getCarsByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe(response => {
      this.cars = response.data
    })
  }
  
  getCarClass(car:Car){

    if(car == this.currentCar){
      return "table-info cursorPointer"
    }else{
      return "cursorPointer"
    }
  }

  getCarsByBrandandColor(brandId:number, colorId: number) {
    this.carService.getCarsByBrandAndColor(brandId,colorId).subscribe(response => {
    this.cars = response.data
  })
  
}
  
}

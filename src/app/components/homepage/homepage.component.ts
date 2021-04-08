import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarImage } from 'src/app/models/caImage';
import { Car } from 'src/app/models/car';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  imageUrl = 'https://localhost:44360/'
  cars:Car[]=[];
  images:CarImage[];
  dataLoaded=false;

  constructor(private carService:CarService,private carImageService:CarImageService, private activatedRoute:ActivatedRoute) 
     { }

  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe((params) => {
      if(params["brandId"]){
        this.getCarsByBrand(params["brandId"]);
        
      }
      else if(params["colorId"]){
        this.getCarsByColor(params["colorId"]);
      }else if(params["carId"]){
        this.getCarImagesByCarId(params["carId"]);
      }
      else{
        this.getCars();
        
      }
      
    });
    
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

  getCarsByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe(response => {
      this.cars = response.data
    })
  }
  
}

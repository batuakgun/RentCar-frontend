import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {
  colorUpdateForm:FormGroup;
  color:Color;

  constructor(private formBuilder:FormBuilder, private colorService:ColorService, private toastr:ToastrService,
    private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.createUpdateForm();
    this.activatedRoute.params.subscribe(parameter=>{
      if(parameter["colorId"]){
        this.getColorByCarId(parameter["colorId"]);
      }
    });
  }


  getColorByCarId(colorId:number){
    this.colorService.getColorByCarId(colorId).subscribe(response=>{
      this.color=response.data;
      this.colorUpdateForm.setValue({
        name:this.color.colorName
      })
    })
  }

  createUpdateForm(){
    this.colorUpdateForm = this.formBuilder.group({
      name:["",Validators.required]
    })
  }


  updateColor(){
    if(this.colorUpdateForm.valid){
      let color = Object.assign({},this.colorUpdateForm.value)
      console.log(color);
      color.colorId=this.color.colorId;
      this.colorService.updateColor(color).subscribe(response=>{
        this.toastr.success("Başarılı");
        this.router.navigate(['/all/list']);
      }, responseError => {
        console.log(responseError.error.ValidationErrors)
        if (responseError.error.ValidationErrors.length > 0) {
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastr.error(responseError.error.ValidationErrors[i].ErrorMessage);
          }
        }
      });
    }else{
      this.toastr.error("Hata!")
    }
  }



}

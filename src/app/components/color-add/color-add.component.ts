import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {
  colorAddForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private colorService: ColorService, private toastr: ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.createColorAddForm();
  }


  createColorAddForm() {
    this.colorAddForm = this.formBuilder.group({
      name: ["", Validators.required]
    })
  }

  addColor() {
    if (this.colorAddForm.valid) {
      let colorModel = Object.assign({}, this.colorAddForm.value)
      this.colorService.addColor(colorModel).subscribe(response => {
        this.toastr.success("Add OK")
        this.router.navigate(['/all/list']);
      }, responseError => {
        console.log(responseError.error.ValidationErrors)
        if (responseError.error.ValidationErrors.length > 0) {
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastr.error(responseError.error.ValidationErrors[i].ErrorMessage);
          }
        }
      })
    }
    else {
      this.toastr.error("Form Error")
    }
  }


}

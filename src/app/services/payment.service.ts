import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl = 'https://localhost:44360/api/payments'

  constructor(private httpClient:HttpClient) { }

  payment(payment:Payment):Observable<ResponseModel>{
    let newPath = this.apiUrl+'testpayment';
    return this.httpClient.post<ResponseModel>(newPath,payment);
  }
}

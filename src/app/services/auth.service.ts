import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'https://localhost:44360/api/auth/'

  constructor(private httpClient:HttpClient) { }

  login(loginModel:LoginModel){
    let newPath = this.apiUrl + 'login';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,loginModel)
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }

  register(registerModel: RegisterModel): Observable<SingleResponseModel<TokenModel>> {
    let newPath=this.apiUrl+'register';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,registerModel);
  }

  logOut(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("email");
  }

}

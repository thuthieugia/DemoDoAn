import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from 'src/app/models/constants';
import { User } from 'src/app/models/User';


const baseUrl = `${ApiUrl.BASE_URL}/api/User`;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {}
  login(params: any) {
    return this.http.post<User[]>(`${baseUrl}/login?userName=${params.userName}&password=${params.password}`, {});
  }
}

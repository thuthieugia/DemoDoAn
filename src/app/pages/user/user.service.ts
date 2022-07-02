import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from 'src/app/models/constants';
import { User } from 'src/app/models/User';
const baseUrl = `${ApiUrl.BASE_URL}/api/User`;
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}
  // lấy tất
  getAll() {
    return this.http.get<User[]>(baseUrl);
  }
  // lấy dữ liệu bằng id
  getById(classID: string) {
    return this.http.get<User>(`${baseUrl}/${classID}`);
  }
  // thêm
  create(params: any) {
    return this.http.post(baseUrl, params);
  }
  // update
  update(userID: string, params: any) {
    return this.http.put(`${baseUrl}/${userID}`, params);
  }
  // xoá
  delete(classID: string) {
    return this.http.delete(`${baseUrl}/${classID}`);
  }

  getAllPermission() {
    return this.http.get(`${ApiUrl.BASE_URL}/api/Permission`);
  }
}

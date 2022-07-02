import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from 'src/app/models/constants';
import { Practicegroup } from 'src/app/models/practicegroup';

const baseUrl = `${ApiUrl.BASE_URL}/api/PracticeGroup`;
@Injectable({
  providedIn: 'root'
})
export class PracticegroupService {
  router: any;
  constructor(private http: HttpClient) {}
  // lấy tất
  getAll() {
    return this.http.get<Practicegroup[]>(baseUrl);
  }
  // lấy dữ liệu bằng id
  getById(practiceGroupID: string) {
    return this.http.get<Practicegroup>(`${baseUrl}/${practiceGroupID}`);
  }
  // thêm
  create(params: any) {
    return this.http.post(baseUrl, params);
  }
  // update
  update(params: any, practiceGroupID: any) {
    return this.http.put(`${baseUrl}/${practiceGroupID}`, params);
  }
  // xoá
  delete(practiceGroupID: string) {
    return this.http.delete(`${baseUrl}/${practiceGroupID}`);
  }
  getAllStudent(){
    return this.http.get(`${ApiUrl.BASE_URL}/api/Student`);
  }
  findIdDetailpracticegroup(id: string) {
    this.router.navigate(['detailpracticegroup',id]);
  }
}

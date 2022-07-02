import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from 'src/app/models/constants';
import { Maintainance } from 'src/app/models/maintainance ';

const baseUrl = `${ApiUrl.BASE_URL}/api/Maintainance`;
@Injectable({
  providedIn: 'root'
})
export class MaintainanceService {
  constructor(private http: HttpClient) {}
  // lấy tất
  getAll() {
    return this.http.get<Maintainance[]>(baseUrl);
  }
  // lấy dữ liệu bằng id
  getById(CourseID: string) {
    return this.http.get<Maintainance>(`${baseUrl}/${CourseID}`);
  }
  // thêm
  create(params: any) {
    return this.http.post(baseUrl, params);
  }
  // update
  update(params: any, CourseID: any) {
    return this.http.put(`${baseUrl}/${CourseID}`, params);
  }
  // xoá
  delete(CourseID: string) {
    return this.http.delete(`${baseUrl}/${CourseID}`);
  }
  getAllPracticalLaboratory(){
    return this.http.get(`${ApiUrl.BASE_URL}/api/PracticalLaboratory`);
  }
}

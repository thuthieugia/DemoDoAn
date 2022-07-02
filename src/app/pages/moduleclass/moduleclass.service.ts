import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from 'src/app/models/constants';
import { Moduleclass } from 'src/app/models/moduleclass';

const baseUrl = `${ApiUrl.BASE_URL}/api/Moduleclass`;
@Injectable({
  providedIn: 'root'
})
export class ModuleclassService {
  [x: string]: any;
  constructor(private http: HttpClient) {}
  // lấy tất
  getAll() {
    return this.http.get<Moduleclass[]>(baseUrl);
  }
  // lấy dữ liệu bằng id
  getById(moduleClassID: string) {
    return this.http.get<Moduleclass>(`${baseUrl}/${moduleClassID}`);
  }
  // thêm
  create(params: any) {
    return this.http.post(baseUrl, params);
  }
  // update
  update(moduleClassID: any, params: any) {
    return this.http.put(`${baseUrl}/${moduleClassID}`, params);
  }
  // xoá
  delete(moduleClassID: string) {
    return this.http.delete(`${baseUrl}/${moduleClassID}`);
  }
  getAllModule(){
    return this.http.get(`${ApiUrl.BASE_URL}/api/Module`);
  }
  getAllSchoolYear(){
    return this.http.get(`${ApiUrl.BASE_URL}/api/SchoolYear`);
  }
  getAlSemester(){
    return this.http.get(`${ApiUrl.BASE_URL}/api/Semester`);
  }
  getAllTeacher(){
    return this.http.get(`${ApiUrl.BASE_URL}/api/Teacher`);
  }
  }


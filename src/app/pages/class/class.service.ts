import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from 'src/app/models/constants';
import { Class } from 'src/app/models/class';

const baseUrl = `${ApiUrl.BASE_URL}/api/Class`;
@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private http: HttpClient) {}
  // lấy tất
  getAll() {
    return this.http.get<Class[]>(baseUrl);
  }
  // lấy dữ liệu bằng id
  getById(classID: string) {
    return this.http.get<Class>(`${baseUrl}/${classID}`);
  }
  // thêm
  create(params: any) {
    return this.http.post(baseUrl, params);
  }
  // update
  update(classID: any, params: any) {
    return this.http.put(`${baseUrl}/${classID}`, params);
  }
  // xoá
  delete(classID: string) {
    return this.http.delete(`${baseUrl}/${classID}`);
  }
  getAllCourse() {
    return this.http.get(`${ApiUrl.BASE_URL}/api/Course`);
  }
  getAllMajors() {
    return this.http.get(`${ApiUrl.BASE_URL}/api/Majors`);
  }
}

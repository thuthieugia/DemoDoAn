import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from 'src/app/models/constants';
import { Teacher } from 'src/app/models/teacher';


const baseUrl = `${ApiUrl.BASE_URL}/api/Teacher`;
@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) {}
  // lấy tất
  getAll() {
    return this.http.get<Teacher[]>(baseUrl);
  }
  // lấy dữ liệu bằng id
  getById(teacherID: string) {
    return this.http.get<Teacher>(`${baseUrl}/${teacherID}`);
  }
  // thêm
  create(params: any) {
    return this.http.post(baseUrl, params);
  }
  // update
  update(teacherID: any ,params: any) {
    return this.http.put(`${baseUrl}/${teacherID}`, params);
  }
  // xoá
  delete(teacherID: string) {
    return this.http.delete(`${baseUrl}/${teacherID}`);
  }
  getAllSubject() {
    return this.http.get(`${ApiUrl.BASE_URL}/api/Subject`);
  }
}

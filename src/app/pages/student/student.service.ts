import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from 'src/app/models/constants';
import { Student } from 'src/app/models/student';



const baseUrl = `${ApiUrl.BASE_URL}/api/Student`;
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private http: HttpClient) {}
  // lấy tất
  getAll() {
    return this.http.get<Student[]>(baseUrl);
  }
  // lấy dữ liệu bằng id
  getById(studentID: string) {
    return this.http.get<Student>(`${baseUrl}/${studentID}`);
  }
  // thêm
  create(params: any) {
    return this.http.post(baseUrl, params);
  }
  // update
  update(studentID: any ,params: any ) {
    return this.http.put(`${baseUrl}/${studentID}`, params);
  }
  // xoá
  delete(studentID: string) {
    return this.http.delete(`${baseUrl}/${studentID}`);
  }
  getAllClass() {
    return this.http.get(`${ApiUrl.BASE_URL}/api/Class`);
  }
}


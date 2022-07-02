import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from 'src/app/models/constants';
import { Subject } from 'src/app/models/subject';


const baseUrl = `${ApiUrl.BASE_URL}/api/Subject`;
@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  constructor(private http: HttpClient) {}
  // lấy tất
  getAll() {
    return this.http.get<Subject[]>(baseUrl);
  }
  // lấy dữ liệu bằng id
  getById(SubjectID: string) {
    return this.http.get<Subject>(`${baseUrl}/${SubjectID}`);
  }
  // thêm
  create(params: any) {
    return this.http.post(baseUrl, params);
  }
  // update
  update( SubjectID: any ,params: any) {
    return this.http.put(`${baseUrl}/${SubjectID}`, params);
  }
  // xoá
  delete(SubjectID: string) {
    return this.http.delete(`${baseUrl}/${SubjectID}`);
  }
  }

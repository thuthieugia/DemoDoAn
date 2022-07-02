import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from 'src/app/models/constants';
import { Semester } from 'src/app/models/semester';


const baseUrl = `${ApiUrl.BASE_URL}/api/Semester`;
@Injectable({
  providedIn: 'root'
})
export class SemesterService {
  constructor(private http: HttpClient) {}
  // lấy tất
  getAll() {
    return this.http.get<Semester[]>(baseUrl);
  }
  // lấy dữ liệu bằng id
  getById(SemesterID: string) {
    return this.http.get<Semester>(`${baseUrl}/${SemesterID}`);
  }
  // thêm
  create(params: any) {
    return this.http.post(baseUrl, params);
  }
  // update
  update(SemesterID: any , params: any) {
    return this.http.put(`${baseUrl}/${SemesterID}`, params);
  }
  // xoá
  delete(SemesterID: string) {
    return this.http.delete(`${baseUrl}/${SemesterID}`);
  }
  }

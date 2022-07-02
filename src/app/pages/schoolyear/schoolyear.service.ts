import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from 'src/app/models/constants';
import { Schoolyear } from 'src/app/models/schoolyear';

const baseUrl = `${ApiUrl.BASE_URL}/api/Schoolyear`;
@Injectable({
  providedIn: 'root'
})
export class SchoolyearService {
  constructor(private http: HttpClient) {}
  // lấy tất
  getAll() {
    return this.http.get<Schoolyear[]>(baseUrl);
  }
  // lấy dữ liệu bằng id
  getById(schoolYearID: string) {
    return this.http.get<Schoolyear>(`${baseUrl}/${schoolYearID}`);
  }
  // thêm
  create(params: any) {
    return this.http.post(baseUrl, params);
  }
  // update
  update(schoolYearID: any ,params: any ) {
    return this.http.put(`${baseUrl}/${schoolYearID}`, params);
  }
  // xoá
  delete(schoolYearID: string) {
    return this.http.delete(`${baseUrl}/${schoolYearID}`);
  }
  }

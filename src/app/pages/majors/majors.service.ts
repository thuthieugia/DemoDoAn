import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from 'src/app/models/constants';
import { Majors } from 'src/app/models/majors';

const baseUrl = `${ApiUrl.BASE_URL}/api/Majors`;
@Injectable({
  providedIn: 'root'
})
export class MajorsService {
  constructor(private http: HttpClient) {}
// lấy tất
getAll() {
  return this.http.get<Majors[]>(baseUrl);
}
  // lấy dữ liệu bằng id
  getById(MajorsID: string) {
    return this.http.get<Majors>(`${baseUrl}/${MajorsID}`);
  }
  // thêm
  create(params: any) {
    return this.http.post(baseUrl, params);
  }
  // update
  update( MajorsID: any ,params: any) {
    return this.http.put(`${baseUrl}/${MajorsID}`, params);
  }
  // xoá
  delete(MajorsID: string) {
    return this.http.delete(`${baseUrl}/${MajorsID}`);
  }
  getAllOlogy() {
    return this.http.get(`${ApiUrl.BASE_URL}/api/Ology`);
  }
}

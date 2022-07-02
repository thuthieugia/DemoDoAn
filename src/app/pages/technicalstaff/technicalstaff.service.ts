import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from 'src/app/models/constants';
import { Technicalstaff } from 'src/app/models/technicalstaff';

const baseUrl = `${ApiUrl.BASE_URL}/api/Technicalstaff`;
@Injectable({
  providedIn: 'root'
})
export class TechnicalstaffService {

    constructor(private http: HttpClient) {}
    // lấy tất
    getAll() {
      return this.http.get<Technicalstaff[]>(baseUrl);
    }
    // lấy dữ liệu bằng id
    getById(technicalstaffID: string) {
      return this.http.get<Technicalstaff>(`${baseUrl}/${technicalstaffID}`);
    }
    // thêm
    create(params: any) {
      return this.http.post(baseUrl, params);
    }
    // update
    update(technicalstaffID: any, params: any ) {
      return this.http.put(`${baseUrl}/${technicalstaffID}`, params);
    }
    // xoá
    delete(technicalstaffID: string) {
      return this.http.delete(`${baseUrl}/${technicalstaffID}`);
    }
}

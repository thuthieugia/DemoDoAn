import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from 'src/app/models/constants';
import { Ology } from 'src/app/models/ology';

const baseUrl = `${ApiUrl.BASE_URL}/api/Ology`;
@Injectable({
  providedIn: 'root'
})
export class OlogyService {

  constructor(private http: HttpClient) {}
  // lấy tất
  getAll() {
    return this.http.get<Ology[]>(baseUrl);
  }
    // lấy dữ liệu bằng id
    getById(OlogyID: string) {
      return this.http.get<Ology>(`${baseUrl}/${OlogyID}`);
    }
    // thêm
    create(params: any) {
      return this.http.post(baseUrl, params);
    }
    // update
    update( OlogyID: any ,params: any) {
      return this.http.put(`${baseUrl}/${OlogyID}`, params);
    }
    // xoá
    delete(OlogyID: string) {
      return this.http.delete(`${baseUrl}/${OlogyID}`);
    }
  }

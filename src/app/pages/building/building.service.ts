import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from 'src/app/models/constants';
import { Building } from 'src/app/models/building';

const baseUrl = `${ApiUrl.BASE_URL}/api/Building`;
@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  constructor(private http: HttpClient) {}
  // lấy tất
  getAll() {
    return this.http.get<Building[]>(baseUrl);
  }
  // lấy dữ liệu bằng id
  getById(BuildingID: string) {
    return this.http.get<Building>(`${baseUrl}/${BuildingID}`);
  }
  // thêm
  create(params: any) {
    return this.http.post(baseUrl, params);
  }
  // update
  update( BuildingID: any ,params: any) {
    return this.http.put(`${baseUrl}/${BuildingID}`, params);
  }
  // xoá
  delete(BuildingID: string) {
    return this.http.delete(`${baseUrl}/${BuildingID}`);
  }
}

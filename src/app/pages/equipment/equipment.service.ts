import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from 'src/app/models/constants';
import { Equipment } from 'src/app/models/equipment';

const baseUrl = `${ApiUrl.BASE_URL}/api/Equipment`;
@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  constructor(private http: HttpClient) {}
  // lấy tất
  getAll() {
    return this.http.get<Equipment[]>(baseUrl);
  }
  update(equipmentID: any, params: any) {
    return this.http.put(`${baseUrl}/${equipmentID}`, params);
  }
   create(params: any) {
    return this.http.post(baseUrl, params);
  }
  getById(equipmentID: string) {
    return this.http.get<Equipment>(`${baseUrl}/${equipmentID}`);
  }
  getBypracticallaboratory(practicalLaboratoryID: string) {
    return this.http.get(`${baseUrl}/get-practicalLaboratory?detaimId=${practicalLaboratoryID}`);
  }
  delete(equipmentID: string) {
    return this.http.delete(`${baseUrl}/${equipmentID}`);
  }
}

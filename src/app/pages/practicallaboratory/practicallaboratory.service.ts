import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from 'src/app/models/constants';
import { Practicallaboratory } from 'src/app/models/practicallaboratory';

const baseUrl = `${ApiUrl.BASE_URL}/api/Practicallaboratory`;
@Injectable({
  providedIn: 'root'
})
export class PracticallaboratoryService {
  router: any;
  constructor(private http: HttpClient) {}
  // lấy tất
  getAll() {
    return this.http.get<Practicallaboratory[]>(baseUrl);
  }
  // lấy dữ liệu bằng id
  getById(practicalLaboratoryID: string) {
    return this.http.get<Practicallaboratory>(`${baseUrl}/${practicalLaboratoryID}`);
  }
  // thêm
  create(params: any) {
    return this.http.post(baseUrl, params);
  }
  // update
  update(practicalLaboratoryID: any, params: any) {
    return this.http.put(`${baseUrl}/${practicalLaboratoryID}`, params);
  }
  // xoá
  delete(practicalLaboratoryID: string) {
    return this.http.delete(`${baseUrl}/${practicalLaboratoryID}`);
  }
  getAllOlogy(){
    return this.http.get(`${ApiUrl.BASE_URL}/api/Ology`);
  }
  getAllBuilding(){
    return this.http.get(`${ApiUrl.BASE_URL}/api/Building`);
  }
  getAllSubject(){
    return this.http.get(`${ApiUrl.BASE_URL}/api/Subject`);
  }
  findIdEquipment(id: string) {
    this.router.navigate(['equipment',id]);
  }
}


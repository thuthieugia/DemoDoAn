import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from 'src/app/models/constants';
import { DetailModuleClass } from 'src/app/models/detailmoduleclass';

const baseUrl = `${ApiUrl.BASE_URL}/api/Detailmoduleclass`;
@Injectable({
  providedIn: 'root'
})
export class DetailmoduleclassService {

  constructor(private http: HttpClient) {}
  // lấy tất
  getAll() {
    return this.http.get<DetailModuleClass[]>(baseUrl);
  }
  update(detailModuleclassID: any, params: any) {
    return this.http.put(`${baseUrl}/${detailModuleclassID}`, params);
  }
   create(params: any) {
    return this.http.post(baseUrl, params);
  }
  // lấy dữ liệu bằng id
  getById(detailModuleclassID: string) {
    return this.http.get<DetailModuleClass>(`${baseUrl}/${detailModuleclassID}`);
  }
  getBymoduleclass(ModuleClassID: string) {
    return this.http.get(`${baseUrl}/get-moduleclass?detaimId=${ModuleClassID}`);
  }
  delete(detailModuleclassID: string) {
    return this.http.delete(`${baseUrl}/${detailModuleclassID}`);
  }
}


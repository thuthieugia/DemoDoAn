import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from 'src/app/models/constants';

import { DetailPracticeGroup } from 'src/app/models/detailpracticegroup';

const baseUrl = `${ApiUrl.BASE_URL}/api/Detailpracticegroup`;
@Injectable({
  providedIn: 'root'
})
export class DetailpracticegroupService {
  constructor(private http: HttpClient) {}
  getAll() {
    return this.http.get<DetailPracticeGroup[]>(baseUrl);
  }
  update(detailPracticeGroupID: any, params: any) {
    return this.http.put(`${baseUrl}/${detailPracticeGroupID}`, params);
  }
   create(params: any) {
    return this.http.post(baseUrl, params);
  }
  getById(detailPracticeGroupID: string) {
    return this.http.get<DetailPracticeGroup>(`${baseUrl}/${detailPracticeGroupID}`);
  }
  getByPracticeGroup(detailPracticeGroupID: string) {
    return this.http.get(`${baseUrl}/get-PracticeGroup?detaimId=${detailPracticeGroupID}`);
  }
  delete(detailPracticeGroupID: string) {
    return this.http.delete(`${baseUrl}/${detailPracticeGroupID}`);
  }
}

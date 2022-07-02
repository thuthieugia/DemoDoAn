import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from 'src/app/models/constants';
import { Module } from '../../models/modules';

const baseUrl = `${ApiUrl.BASE_URL}/api/Module`;
@Injectable({
  providedIn: 'root'
})
export class ModulesService {
  constructor(private http: HttpClient) {}
  // lấy tất
  getAll() {
    return this.http.get<Module[]>(baseUrl);
  }
  // lấy dữ liệu bằng id
  getById(ModuleID: string) {
    return this.http.get<Module>(`${baseUrl}/${ModuleID}`);
  }
  // thêm
  create(params: any) {
    return this.http.post(baseUrl, params);
  }
  // update
  update( ModuleID: any ,params: any) {
    return this.http.put(`${baseUrl}/${ModuleID}`, params);
  }
  // xoá
  delete(ModuleID: string) {
    return this.http.delete(`${baseUrl}/${ModuleID}`);
  }
  getAllSubject() {
    return this.http.get(`${ApiUrl.BASE_URL}/api/Subject`);
  }
  }


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from 'src/app/models/constants';
import { Practiceschedule } from 'src/app/models/practiceschedule';

const baseUrl = `${ApiUrl.BASE_URL}/api/PracticeSchedule`;
@Injectable({
  providedIn: 'root'
})
export class PracticescheduleService {
  constructor(private http: HttpClient) {}
  // lấy tất
  getAll() {
    return this.http.get<Practiceschedule[]>(baseUrl);
  }
  // lấy dữ liệu bằng id
  getById(practiceScheduleID: string) {
    return this.http.get<Practiceschedule>(`${baseUrl}/${practiceScheduleID}`);
  }
  // thêm
  create(params: any) {
    return this.http.post(baseUrl, params);
  }
  // update
  update(practiceScheduleID: any, params: any) {
    return this.http.put(`${baseUrl}/${practiceScheduleID}`, params);
  }
  // xoá
  delete(practiceScheduleID: string) {
    return this.http.delete(`${baseUrl}/${practiceScheduleID}`);
  }
  getAllPracticeShift(){
    return this.http.get(`${ApiUrl.BASE_URL}/api/PracticeShift`);
  }
  getAllPracticeGroup(){
    return this.http.get(`${ApiUrl.BASE_URL}/api/PracticeGroup`);
  }
  getAllPracticalLaboratory()    {
    return this.http.get(`${ApiUrl.BASE_URL}/api/PracticalLaboratory`);
  }
  getAllTeacher(){
    return this.http.get(`${ApiUrl.BASE_URL}/api/Teacher`);
  }
  getAllSemester(){
    return this.http.get(`${ApiUrl.BASE_URL}/api/Semester`);
  }
  getAllSchoolYear(){
    return this.http.get(`${ApiUrl.BASE_URL}/api/SchoolYear`);
  }
  }

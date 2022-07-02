import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Attendance } from 'src/app/models/attendance';
import { ApiUrl } from 'src/app/models/constants';

const baseUrl = `${ApiUrl.BASE_URL}/api/Attendance`;
@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private http: HttpClient) {}
  // lấy tất
  // getAll() {
  //   return this.http.get<Attendance[]>(baseUrl);
  // }
  // lấy dữ liệu bằng id
  getById(AttendanceID: string) {
    return this.http.get<Attendance>(`${baseUrl}/${AttendanceID}`);
  }
  getBypracticeschedule(practiceScheduleID: string) {
    return this.http.get(`${baseUrl}/get-practiceschedule?pracId=${practiceScheduleID}`);
  }

  // // thêm
  // create(params: any) {
  //   return this.http.post(baseUrl, params);
  // }
  // // update
  // update(params: any, BuildingID: any) {
  //   return this.http.put(`${baseUrl}/${BuildingID}`, params);
  // }
  // // xoá
  // delete(BuildingID: string) {
  //   return this.http.delete(`${baseUrl}/${BuildingID}`);
  // }
}

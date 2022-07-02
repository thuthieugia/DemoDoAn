import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from 'src/app/models/constants';
import { Course } from 'src/app/models/course';


const baseUrl = `${ApiUrl.BASE_URL}/api/Course`;
@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private http: HttpClient) {}
  // lấy tất
  getAll() {
    return this.http.get<Course[]>(baseUrl);
  }
  // lấy dữ liệu bằng id
  getById(courseID: string) {
    return this.http.get<Course>(`${baseUrl}/${courseID}`);
  }
  // thêm
  create(params: any) {
    return this.http.post(baseUrl, params);
  }
  // update
  update( courseID: any , params: any) {
    return this.http.put(`${baseUrl}/${courseID}`, params);
  }
  // xoá
  delete(courseID: string) {
    return this.http.delete(`${baseUrl}/${courseID}`);
  }
}

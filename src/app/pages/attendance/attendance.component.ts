import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Attendance } from 'src/app/models/attendance';
import { Practiceschedule } from 'src/app/models/practiceschedule';
import { PracticescheduleService } from '../practiceschedule/practiceschedule.service';
import { AttendanceService } from './attendance.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
})
export class AttendanceComponent implements OnInit {
  selectedattendance: any;
  studentID: any;
  practiceschedule: any;
  id!: string ;
  isNull: boolean = true;






  attendances: Practiceschedule = new Practiceschedule();
  listAttendance: Attendance[] = [];
  constructor(
    private route: ActivatedRoute,
    private practicescheduleService: PracticescheduleService,
    private attendanceService: AttendanceService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log('id: ', this.id);
    this.practicescheduleService.getById(this.id).subscribe(
      (attendances: any) => {
        console.log(attendances);
        this.attendances = attendances[0];

        this.attendanceService.getBypracticeschedule(this.id).subscribe(
          (attendances: any) => {
            this.listAttendance = attendances;
            this.caculateVang();
          },
          (err) => console.log('err: ', err)
        );
      },
      (err) => console.log('err: ', err)
    );
  }

  caculateVang() {
    var total = this.listAttendance.length;
    let daDiemDanh = 0;
    for (var item of this.listAttendance) {
      var diemDanh =
        item.attendanceStatus === undefined ? 0 : item.attendanceStatus;
      daDiemDanh += diemDanh;
    }

    this.attendances.vang = total - daDiemDanh;
  }




// testing
visible = false;

open(): void {
  this.visible = true;
}

close(): void {
  this.visible = false;
}


}

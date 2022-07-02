import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Practiceschedule } from 'src/app/models/practiceschedule';
import { PracticescheduleService } from './practiceschedule.service';
import { Attendance } from 'src/app/models/attendance';
import { AttendanceService } from '../attendance/attendance.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-practiceschedule',
  templateUrl: './practiceschedule.component.html',
  styleUrls: ['./practiceschedule.component.css'],
})
export class PracticescheduleComponent implements OnInit {
  selectedPracticeschedule: any;
  practiceShiftID: any;
  schoolYearID: any;
  semesterID: any;
  practicalLaboratoryID: any;
  practiceGroupID: any;
  teacherID: any;
  id!: string | undefined;
  isNull: boolean = true;
  practiceschedules!: Practiceschedule[];
  listSchoolYear: any;
  listPracticeShift: any;
  listSemester: any;
  listTeacher: any;
  listPracticalLaboratory: any;
  listPracticeGroup: any;
  practiceschedule: Practiceschedule = new Practiceschedule();
  loading = false;
  constructor(
    private practicescheduleService: PracticescheduleService,
    private modal: NzModalService,
    private router: Router
  ) {}
  ngOnInit() {
    this.practicescheduleService.getAllSemester().subscribe((sem: any) => {
      this.listSemester = sem;
    });
    this.practicescheduleService.getAllPracticeShift().subscribe((prst: any) => {
        this.listPracticeShift = prst;
      });
    this.practicescheduleService.getAllSchoolYear().subscribe((sch: any) => {
      this.listSchoolYear = sch;
    });
    this.practicescheduleService.getAllPracticeGroup().subscribe((lst: any) => {
      this.listPracticeGroup = lst;
    });
    this.practicescheduleService
      .getAllPracticalLaboratory()
      .subscribe((lbtr: any) => {
        this.listPracticalLaboratory = lbtr;
      });
    this.practicescheduleService.getAllTeacher().subscribe((tec: any) => {
      this.listTeacher = tec;
    });
    this.practicescheduleService.getAll().subscribe((practiceschedules) => {
      console.log(practiceschedules);
      this.practiceschedules = practiceschedules;
    });
  }
  doubleClick($event: any) {
    this.isNull = false;
    this.selectedPracticeschedule = $event;
    this.id = $event.practiceScheduleID;
    this.practicescheduleService
      .getById($event.practiceScheduleID)
      .subscribe((event: any) => {
        console.log('event: ', event);
        this.practiceschedule = event[0];
        this.practiceShiftID = this.practiceschedule.practiceShiftID;
        this.schoolYearID = this.practiceschedule.schoolYearID;
        this.semesterID = this.practiceschedule.semesterID;
        this.practiceGroupID = this.practiceschedule.practiceGroupID;
        this.practicalLaboratoryID =
          this.practiceschedule.practicalLaboratoryID;
        this.teacherID = this.practiceschedule.teacherID;
        this.isVisible = true;
      });
    this.isVisible = true;
  }
  isVisible = false;

  click($event: any) {
    this.isNull = true;
    this.id = undefined;
    this.isVisible = true;

    this.practiceShiftID = undefined;
    this.schoolYearID = undefined;
    this.semesterID = undefined;
    this.practiceGroupID = undefined;
    this.practicalLaboratoryID = undefined;
    this.teacherID = undefined;
  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {
    if (this.isNull) {
      console.log('' + this.id);
      this.practiceschedule.practiceShiftID = this.practiceShiftID;
      this.practiceschedule.schoolYearID = this.schoolYearID;
      this.practiceschedule.semesterID = this.semesterID;
      this.practiceschedule.practiceGroupID = this.practiceGroupID;
      this.practiceschedule.practicalLaboratoryID = this.practicalLaboratoryID;
      this.practiceschedule.teacherID = this.teacherID;
      this.practicescheduleService
        .create(this.practiceschedule)
        .subscribe((result) => this.ngOnInit());
      this.isVisible = false;
    } else {
      console.log('OK id' + this.id);
      this.practiceschedule.practiceShiftID = this.practiceShiftID;
      this.practiceschedule.schoolYearID = this.schoolYearID;
      this.practiceschedule.semesterID = this.semesterID;
      this.practiceschedule.practiceGroupID = this.practiceGroupID;
      this.practiceschedule.practicalLaboratoryID = this.practicalLaboratoryID;
      this.practiceschedule.teacherID = this.teacherID;
      this.practicescheduleService
        .update(this.id, this.practiceschedule)
        .subscribe((result) => this.ngOnInit());
      this.isVisible = false;

      var item = this.practiceschedules.find(
        (x: any) => x.practiceScheduleID == this.id
      );
      var index = this.practiceschedules.findIndex(
        (x: any) => x.practiceScheduleID == this.id
      );

      if (item) {
        console.log('request: ', this.practiceschedule.request);
        item.request = this.practiceschedule.request ? 1 : 0;
        this.practiceschedules[index] = item;
      }
    }
  }
  changePracticeShift($event: any) {
    this.practiceShiftID = $event;
  }
  changeSchoolYear($event: any) {
    this.schoolYearID = $event;
  }
  changeSemester($event: any) {
    this.semesterID = $event;
  }
  changePracticeGroup($event: any) {
    this.practiceGroupID = $event;
  }
  changePracticalLaboratory($event: any) {
    this.practicalLaboratoryID = $event;
  }
  changeTeacher($event: any) {
    this.teacherID = $event;
  }
  delete(id: string | undefined) {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc chắn xoá năm học này?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        const cloth = this.practiceschedules.find(
          (x) => x.practiceScheduleID === id
        );
        if (!cloth) return;
        cloth.isDeleting = true;
        this.practicescheduleService
          .delete(id!)
          .subscribe(
            () =>
              (this.practiceschedules = this.practiceschedules.filter(
                (x) => x.practiceScheduleID !== id
              ))
          );
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }

  showConfirm(): void {
    this.modal.confirm({
      nzTitle: '<i>Do you Want to delete these items?</i>',
      nzContent: '<b>Some descriptions</b>',
      nzOnOk: () => console.log('OK'),
    });
  }

  changeGender($event: any) {
    console.log($event);
  }

  findIdAttendance(id: string) {
    this.router.navigate(['attendance', id]);
  }
}

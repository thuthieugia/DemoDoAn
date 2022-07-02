import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Teacher } from 'src/app/models/teacher';
import { TeacherService } from './teacher.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  selectedTeacher:any;
  subjectID : any;
  id!: string | undefined;
  isNull : boolean = true;
  teachers!: Teacher[];
  listSubject: any;
  teacher: Teacher =new Teacher();
  loading = false;
    constructor(private teacherService: TeacherService,private modal: NzModalService, private router: Router) {}
  ngOnInit() {
    this.teacherService.getAllSubject().subscribe((olo: any) => {
      this.listSubject = olo;
    });
    this.teacherService.getAll().subscribe(teachers => {
    console.log(teachers);
      this.teachers = teachers;
    });
  }
  doubleClick($event: any) {
    this.isNull = false;
    this.selectedTeacher = $event;
    this.id = $event.teacherID;
    this.teacherService.getById($event.teacherID).subscribe(event => {
      console.log(event);
      this.teacher = event;
      this.subjectID = this.teacher.subjectID;
      this.isVisible = true;
    });
    this.isVisible = true;
  }
  isVisible = false;

  click($event: any) {
    this.isNull = true;
    this.id = undefined;
    this.isVisible = true;
    this.teacher.fullName = '';
    this.teacher.teacherCode = '';
    this.teacher.phoneNumber = '';
    this.teacher.email = '';
    }



handleCancel() {
  this.isVisible = false;
}

handleOk() {    if(this.isNull){
  console.log("" + this.id);
  this.teacher.subjectID = this.subjectID;
  this.teacherService
  .create(this.teacher)
  .subscribe((result) => this.ngOnInit());
  this.isVisible = false;
} else {
  this.teacher.subjectID = this.subjectID;
  this.teacherService
    .update(this.id, this.teacher)
    .subscribe(result => this.ngOnInit());
  this.isVisible = false;
}
}
changeSubject($event: any) {
  this.subjectID = $event;
}
delete(id: string | undefined) {
  this.modal.confirm({
    nzTitle: 'Bạn có chắc chắn xoá giảng viên này?',
    nzOkText: 'Yes',
    nzOkType: 'primary',
    nzOkDanger: true,
    nzOnOk: () => {
      const cloth = this.teachers.find((x) => x.teacherID === id);
      if (!cloth) return;
      cloth.isDeleting = true;
      this.teacherService
        .delete(id!)
        .subscribe(
          () =>
            (this.teachers = this.teachers.filter(
              (x) => x.teacherID !== id
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

}


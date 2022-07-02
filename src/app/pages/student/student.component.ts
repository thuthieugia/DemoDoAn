import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Student } from 'src/app/models/student';
import { StudentService } from './student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  selectedStudent: any;
  classID: any;
  id!: string | undefined;
  isNull: boolean = true;
  students!: Student[];
  listClass: any;
  student: Student = new Student();
  loading = false;
  constructor(
    private studentService: StudentService,
    private modal: NzModalService,
    private router: Router
  ) {}
  ngOnInit() {
    this.studentService.getAllClass().subscribe((olo: any) => {
      this.listClass = olo;
    });
    this.studentService.getAll().subscribe((students) => {
      console.log(students);
      this.students = students;
    });
  }
  doubleClick($event: any) {
    this.isNull = false;
    this.selectedStudent = $event;
    this.id = $event.studentID;
    this.studentService.getById($event.studentID).subscribe((event) => {
      console.log(event);
      this.student = event;
      this.classID = this.student.classID;
      this.isVisible = true;
    });
    this.isVisible = true;
  }
  isVisible = false;

  click($event: any) {
    this.isNull = true;
    this.id = undefined;
    this.isVisible = true;
    this.student.fullName = '';
    this.student.studentCode = '';
    this.student.gender = 1;
    this.student.dateOfBirth = '';
  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {
    if (this.isNull) {
      console.log('' + this.id);
      this.student.classID = this.classID;
      this.studentService
        .create(this.student)
        .subscribe((result) => this.ngOnInit());
      this.isVisible = false;
    } else {
      this.student.classID = this.classID;
      this.studentService
        .update(this.id, this.student)
        .subscribe((result) => this.ngOnInit());
      this.isVisible = false;
    }
  }
  changeClass($event: any) {
    this.classID = $event;
  }
  delete(id: string | undefined) {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc chắn xoá năm học này?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        const cloth = this.students.find((x) => x.studentID === id);
        if (!cloth) return;
        cloth.isDeleting = true;
        this.studentService
          .delete(id!)
          .subscribe(
            () =>
              (this.students = this.students.filter((x) => x.studentID !== id))
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
}

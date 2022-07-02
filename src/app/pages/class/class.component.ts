import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Class } from 'src/app/models/class';
import { ClassService } from './class.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {
  selectedClass: any;
  majorsID: any;
  courseID: any;
  id!: string | undefined;
  classs!: Class[];
  class: Class =new Class();
  listCourse: any[] = [];
  listMajors: any[] = [];
  isNull : boolean = true;
  loading = false;
  constructor(
    private classService: ClassService,
    private modal: NzModalService,
     private router: Router) {}
  ngOnInit() {
    this.classService.getAllCourse().subscribe((per: any) => {
      this.listCourse = per;
    });
    this.classService.getAllMajors().subscribe((per: any) => {
      this.listMajors = per;
    });
    this.classService.getAll().subscribe((classs) => {
      console.log(classs);
      this.classs = classs;
    });
  }
  doubleClick($event: any) {
    this.isNull = false;
    this.selectedClass = $event;
    this.id = $event.classID;
    this.classService.getById($event.classID).subscribe(event => {
      console.log(event);
      this.class = event;
      this.courseID = this.class.courseID;
      this.majorsID = this.class.majorsID;
      this.isVisible = true;
    });
    this.isVisible = true;
  }
  isVisible = false;

  click($event: any) {
    this.isNull = true;
    this.id = undefined;
    this.isVisible = true;
    this.class.className = '';
    this.class.classCode = '';
    }


handleCancel() {
  this.isVisible = false;
}

  handleOk() {
    if(this.isNull){
      this.class.courseID = this.courseID;
      this.class.majorsID = this.majorsID;
      console.log("" + this.id);
      this.classService
      .create(this.class)
      .subscribe((result) => this.ngOnInit());
      this.isVisible = false;
    } else {
      this.class.courseID = this.courseID;
      this.class.majorsID = this.majorsID;
      console.log("OK id" + this.id);
      this.classService
      .update(this.id, this.class)
      .subscribe((result) => this.ngOnInit());
      this.isVisible = false;
    }
}
delete(id: string | undefined) {
  this.modal.confirm({
    nzTitle: 'Bạn có chắc chắn xoá năm học này?',
    nzOkText: 'Yes',
    nzOkType: 'primary',
    nzOkDanger: true,
    nzOnOk: () => {
      const cloth = this.classs.find((x) => x.classID === id);
      if (!cloth) return;
      cloth.isDeleting = true;
      this.classService
        .delete(id!)
        .subscribe(
          () =>
            (this.classs = this.classs.filter(
              (x) => x.classID !== id
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
    changeCourse($event: any){
    this.courseID = $event;
  }
  changeMajors($event: any){
    this.majorsID = $event;
  }
}

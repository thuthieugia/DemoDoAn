import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Course } from 'src/app/models/course';
import { CourseService } from './course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  selectedCourse:any;
  id!: string| undefined;
  isNull : boolean = true;
  courses!: Course[];
  course: Course =new Course();
  loading = false;
    constructor(private courseService: CourseService, private modal: NzModalService, private router: Router) {}
  ngOnInit() {
    this.courseService.getAll().subscribe(courses => {
    console.log(courses);
      this.courses = courses;
    });
  }
  doubleClick($event: any) {
    this.isNull = false;
    this.selectedCourse = $event;
    this.id = $event.courseID;
    this.courseService.getById($event.courseID).subscribe(event => {
      console.log(event);
      this.course = event;
    });
    this.isVisible = true;
  }
  isVisible = false;
  click($event: any) {
    this.isNull = true;
    this.id = undefined;
    this.isVisible = true;
    this.course.courseName = '';
    }
handleCancel() {
  this.isVisible = false;
}

handleOk() {
  if(this.isNull){
    console.log("" + this.id);
    this.courseService
    .create(this.course)
    .subscribe((result) => this.ngOnInit());
    this.isVisible = false;
  } else {
    console.log("OK id" + this.id);
    this.courseService
    .update(this.id, this.course)
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
      const cloth = this.courses.find((x) => x.courseID === id);
      if (!cloth) return;
      cloth.isDeleting = true;
      this.courseService
        .delete(id!)
        .subscribe(
          () =>
            (this.courses = this.courses.filter(
              (x) => x.courseID !== id
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


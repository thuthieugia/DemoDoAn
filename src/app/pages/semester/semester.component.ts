import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Semester } from 'src/app/models/semester';
import { SemesterService } from './semester.service';

@Component({
  selector: 'app-semester',
  templateUrl: './semester.component.html',
  styleUrls: ['./semester.component.css']
})
export class SemesterComponent implements OnInit {

  selectedSemester:any;
  id!: string | undefined;
  isNull : boolean = true;
  semesters!: Semester[];
  semester: Semester =new Semester();
  loading = false;
    constructor(private semesterService: SemesterService,private modal: NzModalService, private router: Router) {}
  ngOnInit() {
    this.semesterService.getAll().subscribe(semesters => {
    console.log(semesters);
      this.semesters = semesters;
    });
  }
  doubleClick($event: any) {
    this.isNull = false;
    this.selectedSemester = $event;
    this.id = $event.semesterID;
    this.semesterService.getById($event.semesterID).subscribe(event => {
      console.log(event);
      this.semester = event;
    });
    this.isVisible = true;
  }
  isVisible = false;

  click($event: any) {
    this.isNull = true;
    this.id = undefined;
    this.isVisible = true;
    this.semester.semesterName = '';
    }
handleCancel() {
  this.isVisible = false;
}

handleOk() {
  if(this.isNull){
    console.log("" + this.id);
    this.semesterService
    .create(this.semester)
    .subscribe((result) => this.ngOnInit());
    this.isVisible = false;
  } else {
    console.log("OK id" + this.id);
    this.semesterService
    .update(this.id, this.semester)
    .subscribe((result) => this.ngOnInit());
    this.isVisible = false;
  }

}
delete(id: string | undefined) {
  this.modal.confirm({
    nzTitle: 'Bạn có chắc chắn xoá học kỳ này?',
    nzOkText: 'Yes',
    nzOkType: 'primary',
    nzOkDanger: true,
    nzOnOk: () => {
      const cloth = this.semesters.find((x) => x.semesterID === id);
      if (!cloth) return;
      cloth.isDeleting = true;
      this.semesterService
        .delete(id!)
        .subscribe(
          () =>
            (this.semesters = this.semesters.filter(
              (x) => x.semesterID !== id
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

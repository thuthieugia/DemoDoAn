import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject } from '../../models/subject';
import { SubjectService } from './subject.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  selectedSubject:any;
  id!: string | undefined;
  isNull : boolean = true;
  subjects!: Subject[];
  subject: Subject =new Subject();
  loading = false;
    constructor(private subjectService: SubjectService, private modal: NzModalService,  private router: Router) {}
  ngOnInit() {
    this.subjectService.getAll().subscribe(subjects => {
    console.log(subjects);
      this.subjects = subjects;
    });
  }
  doubleClick($event: any) {
    this.isNull = false;
    this.selectedSubject = $event;
    this.id = $event.subjectID;
    this.subjectService.getById($event.subjectID).subscribe(event => {
      console.log(event);
      this.subject = event;
    });
    this.isVisible = true;
  }
  isVisible = false;
  click($event: any) {
    this.isNull = true;
    this.id = undefined;
    this.isVisible = true;
    this.subject.subjectName = '';

    }

handleCancel() {
  this.isVisible = false;
}

handleOk() {
  if(this.isNull){
    console.log("" + this.id);
    this.subjectService
    .create(this.subject)
    .subscribe((result) => this.ngOnInit());
    this.isVisible = false;
  } else {
    console.log("OK id" + this.id);
    this.subjectService
    .update(this.id, this.subject)
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
      const cloth = this.subjects.find((x) => x.subjectID === id);
      if (!cloth) return;
      cloth.isDeleting = true;
      this.subjectService
        .delete(id!)
        .subscribe(
          () =>
            (this.subjects = this.subjects.filter(
              (x) => x.subjectID !== id
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


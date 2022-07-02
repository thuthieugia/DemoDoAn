import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Practicegroup } from 'src/app/models/practicegroup';
import { PracticegroupService } from './practicegroup.service';

@Component({
  selector: 'app-practicegroup',
  templateUrl: './practicegroup.component.html',
  styleUrls: ['./practicegroup.component.css']
})
export class PracticegroupComponent implements OnInit {
  selectedPracticegroup: any;
  studentID : any;
  id!: string | undefined;
  isNull: boolean = true;
  practicegroups!: Practicegroup[];
  listStudent: any;
  practicegroup: Practicegroup = new Practicegroup();
  loading = false;
  constructor(
    private PracticegroupService: PracticegroupService,
    private modal: NzModalService,
    private router: Router
  ) {}
  ngOnInit() {
    this.PracticegroupService.getAllStudent().subscribe((stu: any) => {
      this.listStudent = stu;
    });
      this.PracticegroupService.getAll().subscribe((practicegroups) => {
      console.log(practicegroups);
      this.practicegroups = practicegroups;
    });
  }
  doubleClick($event: any) {
    this.isNull = false;
    this.selectedPracticegroup = $event;
    this.id = $event.practiceGroupID;
    this.PracticegroupService
    .getById($event.practiceGroupID)
    .subscribe((event: any) => {
      console.log(event);
      this.practicegroup = event.find((x:any) => x.practiceGroupID == $event.practiceGroupID);
      this.studentID = this.practicegroup.studentID;
      this.isVisible = true;
    });
    this.isVisible = true;
  }
  isVisible = false;

  click($event: any) {
    this.isNull = true;
    this.id = undefined;
    this.isVisible = true;
    this.studentID = undefined;

  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {
    if (this.isNull) {
      console.log('' + this.id);
      this.practicegroup.studentID = this.studentID;
      this.PracticegroupService
        .create(this.practicegroup)
        .subscribe((result) => this.ngOnInit());
      this.isVisible = false;
    } else {
      console.log('OK id' + this.id);
      this.practicegroup.studentID = this.studentID;

      this.PracticegroupService
        .update(this.id, this.practicegroup)
        .subscribe((result) => this.ngOnInit());
      this.isVisible = false;
    }
  }
  changeStudent($event: any) {
    this.studentID = $event;
  }
  delete(id: string | undefined) {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc chắn xoá năm học này?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        const cloth = this.practicegroups.find((x) => x.practiceGroupID === id);
        if (!cloth) return;
        cloth.isDeleting = true;
        this.PracticegroupService
          .delete(id!)
          .subscribe(
            () =>
              (this.practicegroups = this.practicegroups.filter((x) => x.practiceGroupID !== id))
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
findIdDetailpracticegroup(id: string) {
  this.router.navigate(['detailpracticegroup',id]);
}
}

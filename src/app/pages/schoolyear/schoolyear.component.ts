import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Schoolyear } from '../../models/schoolyear';
import { SchoolyearService } from './schoolyear.service';

@Component({
  selector: 'app-schoolyear',
  templateUrl: './schoolyear.component.html',
  styleUrls: ['./schoolyear.component.css'],
})
export class SchoolyearComponent implements OnInit {
  selectedSchoolyear: any;
  id!: string | undefined;
  isNull : boolean = true;
  schoolyears!: Schoolyear[];
  schoolyear: Schoolyear = new Schoolyear();
  loading = false;
  constructor(
    private schoolyearService: SchoolyearService,
    private modal: NzModalService,
    private router: Router
  ) {}

  ngOnInit() {
    this.schoolyearService.getAll().subscribe((schoolyears) => {
      console.log(schoolyears);
      this.schoolyears = schoolyears;
    });
  }

  doubleClick($event: any) {
    this.isNull = false;
    this.selectedSchoolyear = $event;
    this.id = $event.schoolYearID;
    this.schoolyearService.getById($event.schoolYearID).subscribe((event) => {
      console.log(event);
      this.schoolyear = event;
    });
    this.isVisible = true;
  }
  isVisible = false;

click($event: any) {
  this.isNull = true;
  this.id = undefined;
  this.isVisible = true;
  this.schoolyear.schoolYearName = '';
  }


  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {
    if(this.isNull){
      console.log("" + this.id);
      this.schoolyearService
      .create(this.schoolyear)
      .subscribe((result) => this.ngOnInit());
      this.isVisible = false;
    } else {
      console.log("OK id" + this.id);
      this.schoolyearService
      .update(this.id, this.schoolyear)
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
        const cloth = this.schoolyears.find((x) => x.schoolYearID === id);
        if (!cloth) return;
        cloth.isDeleting = true;
        this.schoolyearService
          .delete(id!)
          .subscribe(
            () =>
              (this.schoolyears = this.schoolyears.filter(
                (x) => x.schoolYearID !== id
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

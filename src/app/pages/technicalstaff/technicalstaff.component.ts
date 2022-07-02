import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Technicalstaff } from 'src/app/models/technicalstaff';
import { TechnicalstaffService } from './technicalstaff.service';

@Component({
  selector: 'app-technicalstaff',
  templateUrl: './technicalstaff.component.html',
  styleUrls: ['./technicalstaff.component.css']
})
export class TechnicalstaffComponent implements OnInit {
  selectedTechnicalstaff:any;
  id!: string | undefined;
  isNull : boolean = true;
  technicalstaffs!: Technicalstaff[];
  technicalstaff: Technicalstaff =new Technicalstaff();
  loading = false;
    constructor(private technicalstaffService: TechnicalstaffService,private modal: NzModalService, private router: Router) {}
    ngOnInit() {
      this.technicalstaffService.getAll().subscribe(technicalstaffs => {
      console.log(technicalstaffs);
        this.technicalstaffs = technicalstaffs;
      });
    }
    doubleClick($event: any) {
      this.isNull = false;
      this.selectedTechnicalstaff = $event;
      this.id = $event.technicalStaffID;
      this.technicalstaffService.getById($event.technicalStaffID).subscribe(event => {
        console.log(event);
        this.technicalstaff = event;
      });
      this.isVisible = true;
    }
    isVisible = false;

    click($event: any) {
      this.isNull = true;
      this.id = undefined;
      this.isVisible = true;
      this.technicalstaff.fullName = '';
      }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {    if(this.isNull){
  console.log("" + this.id);
  this.technicalstaffService
  .create(this.technicalstaff)
  .subscribe((result) => this.ngOnInit());
  this.isVisible = false;
} else{
    this.technicalstaffService
    .update(this.id, this.technicalstaff)
    .subscribe(result => this.ngOnInit());
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
        const cloth = this.technicalstaffs.find((x) => x.technicalStaffID === id);
        if (!cloth) return;
        cloth.isDeleting = true;
        this.technicalstaffService
          .delete(id!)
          .subscribe(
            () =>
              (this.technicalstaffs = this.technicalstaffs.filter(
                (x) => x.technicalStaffID !== id
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


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Maintainance } from 'src/app/models/maintainance ';
import { MaintainanceService } from './maintainance.service';

@Component({
  selector: 'app-maintainance',
  templateUrl: './maintainance.component.html',
  styleUrls: ['./maintainance.component.css']
})
export class MaintainanceComponent implements OnInit {
  selectedMaintainance:any;
  practicalLaboratoryID: any;
  id!: string | undefined;
  isNull : boolean = true;
  maintainances!: Maintainance[];
  listPracticalLaboratory: any[] = [];
  maintainance: Maintainance =new Maintainance();
  loading = false;
    constructor(private maintainanceService: MaintainanceService,private modal: NzModalService, private router: Router) {}
  ngOnInit() {
    this.maintainanceService.getAllPracticalLaboratory().subscribe((sub: any) => {
      this.listPracticalLaboratory = sub;
    });
    this.maintainanceService.getAll().subscribe(maintainances => {
    console.log(maintainances);
      this.maintainances = maintainances;
    });
  }
  doubleClick($event: any) {
    this.isNull = false;
    this.selectedMaintainance = $event;
    this.id = $event.maintainanceID;
    this.maintainanceService.getById($event.maintainanceID).subscribe(event => {
      console.log(event);
      this.maintainance = event;
      this.practicalLaboratoryID = this.maintainance.practicalLaboratoryID;
      this.isVisible = true;
    });
    this.isVisible = true;
  }
  isVisible = false;

  click($event: any) {
    this.isNull = true;
    this.id = undefined;
    this.isVisible = true;
    }

handleCancel() {
  this.isVisible = false;
}

handleOk() {
  if(this.isNull){
    console.log("" + this.id);
    this.maintainance.practicalLaboratoryID = this.practicalLaboratoryID;
    this.maintainanceService
    .create( this.maintainance)
    .subscribe((result) => this.ngOnInit());
    this.isVisible = false;
  } else {
  this.maintainance.practicalLaboratoryID = this.practicalLaboratoryID;
  this.maintainanceService
  .update(this.id, this.maintainance)
  .subscribe(result => this.ngOnInit());
  this.isVisible = false;
  }
}
changePracticalLaboratory($event: any) {
  this.practicalLaboratoryID = $event;
}

delete(id: string | undefined) {
  this.modal.confirm({
    nzTitle: 'Bạn có chắc chắn xoá năm học này?',
    nzOkText: 'Yes',
    nzOkType: 'primary',
    nzOkDanger: true,
    nzOnOk: () => {
      const cloth = this.maintainances.find((x) => x.maintainanceID === id);
      if (!cloth) return;
      cloth.isDeleting = true;
      this.maintainanceService
        .delete(id!)
        .subscribe(
          () =>
            (this.maintainances = this.maintainances.filter(
              (x) => x.maintainanceID !== id
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
// testing
visible = false;

open(): void {
  this.visible = true;
}

close(): void {
  this.visible = false;
}

}


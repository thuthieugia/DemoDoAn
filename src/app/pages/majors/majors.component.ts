import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Majors } from 'src/app/models/majors';
import { MajorsService } from './majors.service';

@Component({
  selector: 'app-majors',
  templateUrl: './majors.component.html',
  styleUrls: ['./majors.component.css']
})
export class MajorsComponent implements OnInit {
  selectedMajors:any;
  ologyID : any;
  id!: string | undefined;
  isNull : boolean = true;
  majorss!: Majors[];
  listOlogy: any;
  majors: Majors =new Majors();
  loading = false;
    constructor(private majorsService: MajorsService,private modal: NzModalService, private router: Router) {}
  ngOnInit() {
    this.majorsService.getAllOlogy().subscribe((olo: any) => {
      this.listOlogy = olo;
    });
    this.majorsService.getAll().subscribe(majorss => {
    console.log(majorss);
      this.majorss = majorss;
    });
  }
  doubleClick($event: any) {
    this.isNull = false;
    this.selectedMajors = $event;
    this.id = $event.majorsID;
    this.majorsService.getById($event.majorsID).subscribe(event => {
      console.log(event);
      this.majors = event;
      this.ologyID = this.majors.ologyID;
      this.isVisible = true;
    });
    this.isVisible = true;
  }
  isVisible = false;

  click($event: any) {
    this.isNull = true;
    this.id = undefined;
    this.isVisible = true;
    this.majors.majorsName = '';
    }



handleCancel() {
  this.isVisible = false;
}

handleOk() {    if(this.isNull){
  console.log("" + this.id);
  this.majors.ologyID = this.ologyID;
  this.majorsService
  .create(this.majors)
  .subscribe((result) => this.ngOnInit());
  this.isVisible = false;
} else {
  this.majors.ologyID = this.ologyID;
  this.majorsService
    .update(this.id, this.majors)
    .subscribe(result => this.ngOnInit());
  this.isVisible = false;
}
}
changeOlogy($event: any) {
  this.ologyID = $event;
}
delete(id: string | undefined) {
  this.modal.confirm({
    nzTitle: 'Bạn có chắc chắn xoá năm học này?',
    nzOkText: 'Yes',
    nzOkType: 'primary',
    nzOkDanger: true,
    nzOnOk: () => {
      const cloth = this.majorss.find((x) => x.majorsID === id);
      if (!cloth) return;
      cloth.isDeleting = true;
      this.majorsService
        .delete(id!)
        .subscribe(
          () =>
            (this.majorss = this.majorss.filter(
              (x) => x.majorsID !== id
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

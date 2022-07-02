import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Ology } from '../../models/ology';
import { OlogyService } from './ology.service';
@Component({
  selector: 'app-ology',
  templateUrl: './ology.component.html',
  styleUrls: ['./ology.component.css']
})
export class OlogyComponent implements OnInit {
  selectedOlogy:any;
  id!: string | undefined;
  isNull : boolean = true;
  ologys!: Ology[];
  ology: Ology =new Ology();
  loading = false;
    constructor(private ologyService: OlogyService, private modal: NzModalService, private router: Router) {}
  ngOnInit() {
    this.ologyService.getAll().subscribe(ologys => {
    console.log(ologys);
      this.ologys = ologys;
    });
  }
  doubleClick($event: any) {
    this.isNull = false;
    this.selectedOlogy = $event;
    this.id = $event.ologyID;
    this.ologyService.getById($event.ologyID).subscribe(event => {
      console.log(event);
      this.ology = event;
    });
    this.isVisible = true;
  }
  isVisible = false;


  click($event: any) {
    this.isNull = true;
    this.id = undefined;
    this.isVisible = true;
    this.ology.ologyName = '';
    this.ology.ologyCode = '';
    }
handleCancel() {
  this.isVisible = false;
}

handleOk() {
  if(this.isNull){
    console.log("" + this.id);
    this.ologyService
    .create(this.ology)
    .subscribe((result) => this.ngOnInit());
    this.isVisible = false;
  } else {
    console.log("OK id" + this.id);
    this.ologyService
    .update(this.id, this.ology)
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
      const cloth = this.ologys.find((x) => x.ologyID === id);
      if (!cloth) return;
      cloth.isDeleting = true;
      this.ologyService
        .delete(id!)
        .subscribe(
          () =>
            (this.ologys = this.ologys.filter(
              (x) => x.ologyID !== id
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DetailModuleClass } from 'src/app/models/detailmoduleclass';
import { Moduleclass } from 'src/app/models/moduleclass';
import { ModuleclassService } from '../moduleclass/moduleclass.service';

import { DetailmoduleclassService } from './detailmoduleclass.service';

@Component({
  selector: 'app-detailmoduleclass',
  templateUrl: './detailmoduleclass.component.html',
  styleUrls: ['./detailmoduleclass.component.css']
})
export class DetailmoduleclassComponent implements OnInit {
  moduleclass: any;
  isNull: boolean = true;
  detailmoduleclass: DetailModuleClass = new DetailModuleClass();
  selectedDetailmoduleclass: any;
  id!: string;
  detailmoduleclasss: any[] = [];
  detailmoduleclasss1: any;
  constructor(
    private route: ActivatedRoute,
    private moduleclassService: ModuleclassService,
    private detailmoduleclassService: DetailmoduleclassService,
    private modal: NzModalService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.moduleclassService.getById(this.id).subscribe(
      (detailmoduleclasss: any) => {
        console.log(detailmoduleclasss);
        this.detailmoduleclassService.getBymoduleclass(this.id).subscribe(
          (detailmoduleclasss: any) => {
            this.detailmoduleclasss = detailmoduleclasss;
            this.detailmoduleclasss1 = detailmoduleclasss[0];
          },
          (err) => console.log('err: ', err)
        );
      },
      (err) => console.log('err: ', err)
    );
  }
  doubleClick($event: any) {
    this.isNull = false;
    this.selectedDetailmoduleclass = $event;
    this.id = $event.detailModuleClassID;
    this.detailmoduleclassService.getById($event.detailModuleClassID).subscribe((event) => {
      console.log(event);
      this.detailmoduleclass = event;
    });
    this.isVisible = true;
  }
  isVisible = false;

  click($event: any) {
    this.isNull = true;
    this.id = '';
    this.isVisible = true;
    // this.detailmoduleclass.detailmoduleclassName = '';
  }

  handleCancel() {
    this.detailmoduleclass = new DetailModuleClass();
    this.isVisible = false;
  }

  handleOk() {
    if (this.isNull) {
      console.log('' + this.id);
      this.detailmoduleclassService
        .create(this.detailmoduleclass)
        .subscribe((result) => this.ngOnInit());
      this.isVisible = false;
    } else {
      console.log('OK id' + this.id);
      this.detailmoduleclassService
        .update(this.id, this.detailmoduleclass)
        .subscribe((result) => this.ngOnInit());
      this.isVisible = false;
    }
  }
  delete(id: string | undefined) {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc chắn xoá khu thực hành này?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        const cloth = this.detailmoduleclasss.find((x) => x.detailModuleClassID === id);
        if (!cloth) return;
        cloth.isDeleting = true;
        this.detailmoduleclassService
          .delete(id!)
          .subscribe(
            () =>
              (this.detailmoduleclasss = this.detailmoduleclasss.filter(
                (x) => x.detailModuleClassID !== id
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


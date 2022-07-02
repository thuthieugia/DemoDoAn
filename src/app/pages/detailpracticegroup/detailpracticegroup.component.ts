import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DetailPracticeGroup } from 'src/app/models/detailpracticegroup';
import { Practicegroup } from 'src/app/models/practicegroup';
import { PracticegroupService } from '../practicegroup/practicegroup.service';
import { DetailpracticegroupService } from './detailpracticegroup.service';

@Component({
  selector: 'app-detailpracticegroup',
  templateUrl: './detailpracticegroup.component.html',
  styleUrls: ['./detailpracticegroup.component.css']
})
export class DetailpracticegroupComponent implements OnInit {
  practicegroup: any;
  isNull: boolean = true;
  detailpracticegroup: DetailPracticeGroup = new DetailPracticeGroup();
  selectedDetailpracticegroup: any;
  id!: string;
  detailpracticegroups!: DetailPracticeGroup[];
  constructor(
    private route: ActivatedRoute,
    private practicegroupService: PracticegroupService,
    private detailpracticegroupService: DetailpracticegroupService,
    private modal: NzModalService
  ) {}

  ngOnInit() {
  //   this.detailpracticegroupService.getAll(this.id).subscribe((detailpracticegroups) => {
  //     console.log(detailpracticegroups);
  //     this.detailpracticegroups = detailpracticegroups;
  //   });
  // }
    this.id = this.route.snapshot.params['id'];
    this.practicegroupService.getById(this.id).subscribe(
      (detailpracticegroups: any) => {
        console.log(detailpracticegroups);
        this.detailpracticegroupService.getByPracticeGroup(this.id).subscribe(
          (detailpracticegroups: any) => {
            this.detailpracticegroups = detailpracticegroups;
          },
          (err) => console.log('err: ', err)
        );
      },
      (err) => console.log('err: ', err)
    );
  }
  doubleClick($event: any) {
    this.isNull = false;
    this.selectedDetailpracticegroup = $event;
    this.id = $event.detailPracticeGroupID;
    this.detailpracticegroupService.getById($event.detailPracticeGroupID).subscribe((event) => {
      console.log(event);
      this.detailpracticegroup = event;
    });
    this.isVisible = true;
  }
  isVisible = false;

  click($event: any) {
    this.isNull = true;
    this.id = '';
    this.isVisible = true;
    this.detailpracticegroup.detailPracticeGroupID = '';
  }

  handleCancel() {
    this.detailpracticegroup = new DetailPracticeGroup();
    this.isVisible = false;
  }

  handleOk() {
    if (this.isNull) {
      console.log('' + this.id);
      this.detailpracticegroupService
        .create(this.detailpracticegroup)
        .subscribe((result) => this.ngOnInit());
      this.isVisible = false;
    } else {
      console.log('OK id' + this.id);
      this.detailpracticegroupService
        .update(this.id, this.detailpracticegroup)
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
        const cloth = this.detailpracticegroups.find((x) => x.detailPracticeGroupID === id);
        if (!cloth) return;
        cloth.isDeleting = true;
        this.detailpracticegroupService
          .delete(id!)
          .subscribe(
            () =>
              (this.detailpracticegroups = this.detailpracticegroups.filter(
                (x) => x.detailPracticeGroupID !== id
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


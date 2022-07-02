import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Equipment } from 'src/app/models/equipment';
import { Practicallaboratory } from 'src/app/models/practicallaboratory';
import { EquipmentService } from './equipment.service';
import { PracticallaboratoryService } from '../practicallaboratory/practicallaboratory.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css'],
})
export class EquipmentComponent implements OnInit {
  practicallaboratory: any;
  isNull: boolean = true;
  equipment: Equipment = new Equipment();
  selectedEquipment: any;
  id!: string;
  equipments!: Equipment[];
  constructor(
    private route: ActivatedRoute,
    private practicallaboratoryService: PracticallaboratoryService,
    private equipmentService: EquipmentService,
    private modal: NzModalService
  ) {}

  ngOnInit() {
  //   this.equipmentService.getAll(this.id).subscribe((equipments) => {
  //     console.log(equipments);
  //     this.equipments = equipments;
  //   });
  // }
    this.id = this.route.snapshot.params['id'];
    this.practicallaboratoryService.getById(this.id).subscribe(
      (equipments: any) => {
        console.log(equipments);
        this.equipmentService.getBypracticallaboratory(this.id).subscribe(
          (equipments: any) => {
            this.equipments = equipments;
          },
          (err) => console.log('err: ', err)
        );
      },
      (err) => console.log('err: ', err)
    );
  }
  doubleClick($event: any) {
    this.isNull = false;
    this.selectedEquipment = $event;
    this.id = $event.equipmentID;
    this.equipmentService.getById($event.equipmentID).subscribe((event) => {
      console.log(event);
      this.equipment = event;
    });
    this.isVisible = true;
  }
  isVisible = false;

  click($event: any) {
    this.isNull = true;
    this.id = '';
    this.isVisible = true;
    this.equipment.equipmentName = '';
  }

  handleCancel() {
    this.equipment = new Equipment();
    this.isVisible = false;
  }

  handleOk() {
    if (this.isNull) {
      console.log('' + this.id);
      this.equipmentService
        .create(this.equipment)
        .subscribe((result) => this.ngOnInit());
      this.isVisible = false;
    } else {
      console.log('OK id' + this.id);
      this.equipmentService
        .update(this.id, this.equipment)
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
        const cloth = this.equipments.find((x) => x.equipmentID === id);
        if (!cloth) return;
        cloth.isDeleting = true;
        this.equipmentService
          .delete(id!)
          .subscribe(
            () =>
              (this.equipments = this.equipments.filter(
                (x) => x.equipmentID !== id
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

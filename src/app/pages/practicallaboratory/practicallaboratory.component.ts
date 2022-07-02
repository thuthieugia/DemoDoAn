import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Practicallaboratory } from 'src/app/models/practicallaboratory';
import { PracticallaboratoryService } from './practicallaboratory.service';

@Component({
  selector: 'app-practicallaboratory',
  templateUrl: './practicallaboratory.component.html',
  styleUrls: ['./practicallaboratory.component.css']
})
export class PracticallaboratoryComponent implements OnInit {
  selectedPracticallaboratory: any;
  ologyID : any;
  buildingID: any;
  subjectID: any;
  id!: string | undefined;
  isNull: boolean = true;
  practicallaboratorys!: Practicallaboratory[];
  listOlogy: any;
  listBuilding: any;
  listSubject: any;
  practicallaboratory: Practicallaboratory = new Practicallaboratory();
  loading = false;
  constructor(
    private practicallaboratoryService: PracticallaboratoryService,
    private modal: NzModalService,
    private router: Router
  ) {}
  ngOnInit() {
    this.practicallaboratoryService.getAllOlogy().subscribe((olo: any) => {
      this.listOlogy = olo;
    });
    this.practicallaboratoryService.getAllBuilding().subscribe((bul: any) => {
      this.listBuilding = bul;
    });
    this.practicallaboratoryService.getAllSubject().subscribe((sub: any) => {
      this.listSubject = sub;
    });
    this.practicallaboratoryService.getAll().subscribe((practicallaboratorys) => {
      console.log(practicallaboratorys);
      this.practicallaboratorys = practicallaboratorys;
    });
  }
  doubleClick($event: any) {
    this.isNull = false;
    this.selectedPracticallaboratory = $event;
    this.id = $event.practicalLaboratoryID;
    this.practicallaboratoryService
    .getById($event.practicalLaboratoryID)
    .subscribe((event: any) => {
      console.log(event);
      this.practicallaboratory = event.find((x:any) => x.practicalLaboratoryID == $event.practicalLaboratoryID);
      this.buildingID = this.practicallaboratory.buildingID;
      this.subjectID = this.practicallaboratory.subjectID;
      this.ologyID = this.practicallaboratory.ologyID;
      this.isVisible = true;
    });
    this.isVisible = true;
  }
  isVisible = false;

  click($event: any) {
    this.isNull = true;
    this.id = undefined;
    this.isVisible = true;
    this.buildingID = undefined;
    this.subjectID = undefined;
    this.ologyID = undefined;

  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {
    if (this.isNull) {
      console.log('' + this.id);
      this.practicallaboratory.buildingID = this.buildingID;
      this.practicallaboratory.subjectID = this.subjectID;
      this.practicallaboratory.ologyID = this.ologyID;
      this.practicallaboratoryService
        .create(this.practicallaboratory)
        .subscribe((result) => this.ngOnInit());
      this.isVisible = false;
    } else {
      console.log('OK id' + this.id);
      this.practicallaboratory.buildingID = this.buildingID;
      this.practicallaboratory.subjectID = this.subjectID;
      this.practicallaboratory.ologyID = this.ologyID;

      this.practicallaboratoryService
        .update(this.id, this.practicallaboratory)
        .subscribe((result) => this.ngOnInit());
      this.isVisible = false;
    }
  }
  changeBuilding($event: any) {
    this.buildingID = $event;
  }
  changeSubject($event: any) {
    this.subjectID = $event;
  }
  changeOlogy($event: any) {
    this.ologyID = $event;
  }
  delete(id: string | undefined) {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc chắn xoá phòng thực hành này?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        const cloth = this.practicallaboratorys.find((x) => x.practicalLaboratoryID === id);
        if (!cloth) return;
        cloth.isDeleting = true;
        this.practicallaboratoryService
          .delete(id!)
          .subscribe(
            () =>
              (this.practicallaboratorys = this.practicallaboratorys.filter((x) => x.practicalLaboratoryID !== id))
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
findIdEquipment(id: string) {
  this.router.navigate(['equipment',id]);
}
}

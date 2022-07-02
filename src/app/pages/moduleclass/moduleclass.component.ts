import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Moduleclass } from 'src/app/models/moduleclass';
import { ModuleclassService } from './moduleclass.service';

@Component({
  selector: 'app-moduleclass',
  templateUrl: './moduleclass.component.html',
  styleUrls: ['./moduleclass.component.css']
})
export class ModuleclassComponent implements OnInit {
  selectedModuleclass: any;
  schoolYearID: any;
  moduleID : any;
  semesterID: any;
  teacherID: any;
  id!: string | undefined;
  isNull: boolean = true;
  moduleclasss!: Moduleclass[];
  listSchoolYear: any;
  listModule: any;
  listSemester: any;
  listTeacher: any;
  moduleclass: Moduleclass = new Moduleclass();
  loading = false;
  constructor(
    private moduleclassService: ModuleclassService,
    private modal: NzModalService,
    private router: Router
  ) {}
  ngOnInit() {
    this.moduleclassService.getAllModule().subscribe((mod: any) => {
      this.listModule = mod;
    });
    this.moduleclassService.getAllSchoolYear().subscribe((sch: any) => {
      this.listSchoolYear = sch;
    });
    this.moduleclassService.getAlSemester().subscribe((sem: any) => {
      this.listSemester = sem;
    });
    this.moduleclassService.getAllTeacher().subscribe((tea: any) => {
      this.listTeacher = tea;
    });
    this.moduleclassService.getAll().subscribe((moduleclasss) => {
      console.log(moduleclasss);
      this.moduleclasss = moduleclasss;
    });
  }
  doubleClick($event: any) {
    this.isNull = false;
    this.selectedModuleclass = $event;
    this.id = $event.moduleClassID;
    this.moduleclassService
    .getById($event.moduleClassID)
    .subscribe((event: any) => {
      console.log(event);
      this.moduleclass = event.find((x:any) => x.moduleClassID == $event.moduleClassID);
      this.schoolYearID = this.moduleclass.schoolYearID;
      this.semesterID = this.moduleclass.semesterID;
      this.teacherID = this.moduleclass.teacherID;
      this.moduleID = this.moduleclass.moduleID;
      this.isVisible = true;
    });
    this.isVisible = true;
  }
  isVisible = false;

  click($event: any) {
    this.isNull = true;
    this.id = undefined;
    this.isVisible = true;
    this.schoolYearID = undefined;
    this.semesterID = undefined;
    this.teacherID = undefined;
    this.moduleID = undefined;
  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {
    if (this.isNull) {
      console.log('' + this.id);
      this.moduleclass.schoolYearID = this.schoolYearID;
      this.moduleclass.semesterID = this.semesterID;
      this.moduleclass.teacherID = this.teacherID;
      this.moduleclass.moduleID = this.moduleID;
      console.log('moduleclass: ', this.moduleclass.status);
      this.moduleclassService
        .create(this.moduleclass)
        .subscribe((result) => this.ngOnInit());
      this.isVisible = false;
    } else {
      console.log('OK id' + this.id);
      this.moduleclass.schoolYearID = this.schoolYearID;
      this.moduleclass.semesterID = this.semesterID;
      this.moduleclass.teacherID = this.teacherID;
      this.moduleclass.moduleID = this.moduleID;
      console.log('moduleclass: ', this.moduleclass.status);
      this.moduleclassService
        .update(this.id, this.moduleclass)
        .subscribe((result) => this.ngOnInit());
      this.isVisible = false;
    }
  }
  changeSchoolYear($event: any) {
    this.schoolYearID = $event;
  }
  changeSemester($event: any) {
    this.semesterID = $event;
  }
  changeTeacher($event: any) {
    this.teacherID = $event;
  }
  changeModule($event: any) {
    this.moduleID = $event;
  }
  delete(id: string | undefined) {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc chắn xoá năm học này?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        const cloth = this.moduleclasss.find((x) => x.moduleClassID === id);
        if (!cloth) return;
        cloth.isDeleting = true;
        this.moduleclassService
          .delete(id!)
          .subscribe(
            () =>
              (this.moduleclasss = this.moduleclasss.filter((x) => x.moduleClassID !== id))
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

  findIdDetailModuleClass(id: string) {
    this.router.navigate(['detailmoduleclass',id]);
  }
}

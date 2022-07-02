import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Module } from 'src/app/models/modules';
import { ModulesService } from './modules.service';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css']
})
export class ModulesComponent implements OnInit {
  selectedModules:any;
  subjectID: any;
  id!: string | undefined;
  isNull : boolean = true;
  moduless!: Module[];
  listSubject: any[] = [];
  modules: Module =new Module();
  loading = false;
    constructor(private modulesService: ModulesService,private modal: NzModalService, private router: Router) {}
  ngOnInit() {
    this.modulesService.getAllSubject().subscribe((sub: any) => {
      this.listSubject = sub;
    });
    this.modulesService.getAll().subscribe(moduless => {
    console.log(moduless);
      this.moduless = moduless;
    });
  }
  doubleClick($event: any) {
    this.isNull = false;
    this.selectedModules = $event;
    this.id = $event.moduleID;
    this.modulesService.getById($event.moduleID).subscribe(event => {
      console.log(event);
      this.modules = event;
      this.subjectID = this.modules.subjectID;
      this.isVisible = true;
    });
    this.isVisible = true;
  }
  isVisible = false;

  click($event: any) {
    this.isNull = true;
    this.id = undefined;
    this.isVisible = true;
    this.modules.moduleName = '';
    this.modules.moduleCode = '';
    this.modules.numberOfModule = '';
    }

handleCancel() {
  this.isVisible = false;
}

handleOk() {
  if(this.isNull){
    console.log("" + this.id);
    this.modules.subjectID = this.subjectID;
    this.modulesService
    .create( this.modules)
    .subscribe((result) => this.ngOnInit());
    this.isVisible = false;
  } else {
  this.modules.subjectID = this.subjectID;
  this.modulesService
  .update(this.id, this.modules)
  .subscribe(result => this.ngOnInit());
  this.isVisible = false;
  }
}
changeSubject($event: any) {
  this.subjectID = $event;
}

delete(id: string | undefined) {
  this.modal.confirm({
    nzTitle: 'Bạn có chắc chắn xoá năm học này?',
    nzOkText: 'Yes',
    nzOkType: 'primary',
    nzOkDanger: true,
    nzOnOk: () => {
      const cloth = this.moduless.find((x) => x.moduleID === id);
      if (!cloth) return;
      cloth.isDeleting = true;
      this.modulesService
        .delete(id!)
        .subscribe(
          () =>
            (this.moduless = this.moduless.filter(
              (x) => x.moduleID !== id
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Building } from '../../models/building';
import { BuildingService } from './building.service';
@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})
export class BuildingComponent implements OnInit {
  selectedBuilding:any;
  id!: string | undefined;
  isNull : boolean = true;
  buildings!: Building[];
  building: Building =new Building();
  loading = false;
    constructor(
      private buildingService: BuildingService,
      private modal: NzModalService,
      private router: Router) {}
  ngOnInit() {
    this.buildingService.getAll().subscribe(buildings => {
    console.log(buildings);
      this.buildings = buildings;
    });
  }
  doubleClick($event: any) {
    this.isNull = false;
    this.selectedBuilding = $event;
    this.id = $event.buildingID;
    this.buildingService.getById($event.buildingID).subscribe(event => {
      console.log(event);
      this.building = event;
    });
    this.isVisible = true;
  }
  isVisible = false;

  click($event: any) {
    this.isNull = true;
    this.id = undefined;
    this.isVisible = true;
    this.building.buildingName = '';
    this.building.baseBuilding = '';
    }



handleCancel() {
  this.isVisible = false;
}

handleOk() {
  if(this.isNull){
    console.log("" + this.id);
    this.buildingService
    .create(this.building)
    .subscribe((result) => this.ngOnInit());
    this.isVisible = false;
  } else {
    console.log("OK id" + this.id);
    this.buildingService
    .update(this.id, this.building)
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
      const cloth = this.buildings.find((x) => x.buildingID === id);
      if (!cloth) return;
      cloth.isDeleting = true;
      this.buildingService
        .delete(id!)
        .subscribe(
          () =>
            (this.buildings = this.buildings.filter(
              (x) => x.buildingID !== id
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

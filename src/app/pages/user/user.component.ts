import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MajorsService } from '../majors/majors.service';

@Component({
  selector: 'app-user',

  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  selectedUser:any;
  permissionID : any;
  id!: string | undefined;
  isNull : boolean = true;
  users!: User[];
  listPermission: any;
  user: User =new User();
  loading = false;
    constructor(private userService: UserService,private modal: NzModalService, private router: Router) {}
  ngOnInit() {
    this.userService.getAllPermission().subscribe((olo: any) => {
      this.listPermission = olo;
    });
    this.userService.getAll().subscribe(users => {
    console.log(users);
      this.users = users;
    });
  }
  doubleClick($event: any) {
    this.isNull = false;
    this.selectedUser = $event;
    this.id = $event.userID;
    this.userService.getById($event.userID).subscribe(event => {
      console.log(event);
      this.user = event;
      this.permissionID = this.user.permissionID;
      this.isVisible = true;
    });
    this.isVisible = true;
  }
  isVisible = false;

  click($event: any) {
    this.isNull = true;
    this.id = undefined;
    this.isVisible = true;
    this.user.userName = '';
    this.user.password = '';
    this.permissionID = '';
    }



handleCancel() {
  this.isVisible = false;
}

handleOk() {    if(this.isNull){
  console.log("" + this.id);
  this.user.permissionID = this.permissionID;
  this.userService
  .create(this.user)
  .subscribe((result) => this.ngOnInit());
  this.isVisible = false;
} else {
  this.user.permissionID = this.permissionID;
  this.userService
    .update(this.id!, this.user)
    .subscribe(result => this.ngOnInit());
  this.isVisible = false;
}
}
changePermission($event: any) {
  this.permissionID = $event;
}
delete(id: string | undefined) {
  this.modal.confirm({
    nzTitle: 'Bạn có chắc chắn xoá người dùng này?',
    nzOkText: 'Yes',
    nzOkType: 'primary',
    nzOkDanger: true,
    nzOnOk: () => {
      const cloth = this.users.find((x) => x.userID === id);
      if (!cloth) return;
      cloth.isDeleting = true;
      this.userService
        .delete(id!)
        .subscribe(
          () =>
            (this.users = this.users.filter(
              (x) => x.userID !== id
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

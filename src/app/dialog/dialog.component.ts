import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../services/data.service';
import { User } from '../models/user';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  public data;
  public usersToAdd;

  constructor(
    private dialogRef: MatDialogRef<DialogComponent>, private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) data) {

    this.data = data;
  }
  ngOnInit() {
    this.usersToAdd = this.data.usersToAdd;
  }

  add(user: User){
    // wyslac puta
    user.roleId = this.data.roleId;
    this.dataService.updateUser(user.id, user).subscribe(response => {
      this.close();
    });
  }

  close() {
    this.dialogRef.close();
  }

}

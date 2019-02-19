import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Role } from '../models/role';
import { User } from '../models/user';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  public users: User[];
  public roles: Role[];
  public displayedColumns: string[] = ['role', 'add'];

  public dataSource: any[];

  constructor(private data: DataService, private dialog: MatDialog) { }

  ngOnInit() {
    this.data.getUsers().subscribe(data => {
      this.users = data;
    });

    this.data.getRoles().subscribe(data => {
      this.roles = data;
    });
  }

  openDialog(role) {
    // pokaz modala z dostepnymi uzytkownikami w formie tabelki user ---- plusik
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const usersToAdd = this.users.filter(u => u.roleId!== role.id);

    dialogConfig.data = {
      roleName: role.name, 
      roleId: role.id,
      usersToAdd: usersToAdd
    };
    this.dialog.open(DialogComponent, dialogConfig);
  }
}

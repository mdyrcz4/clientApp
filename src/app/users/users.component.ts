import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { User } from '../models/user';
import { Role } from '../models/role';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users: User[];
  public roles: Role[];
  public updated = false;
  public displayedColumns: string[] = ['firstName', 'lastName', 'role', 'update'];
  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getUsers().subscribe(data => {
      this.users = data;
    });

    this.data.getRoles().subscribe(data => {
      this.roles = data;
    });
  }

  update(element) {
    const userToUpdate = this.users[this.users.indexOf(element)];
    const userId = userToUpdate.id;
    this.data.updateUser(userId, userToUpdate).subscribe(response => {
      if (response)
        this.updated = true;
    });
  }

  onChange(newRoleName, element) {
    const role = this.roles.find(r => r.name === newRoleName.value);
    this.users[this.users.indexOf(element)].roleId = role.id;
  }

  close(){
    this.updated = false;
  }
}

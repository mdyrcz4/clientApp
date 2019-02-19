import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Role } from '../models/role';
import { User } from '../models/user';

const USERS = 'users';
const ROLES = 'roles';
const UPDATEENDPOINT = 'users/'

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get<User[]>(environment.url + USERS);
  }

  getRoles(){

    return this.http.get<Role[]>(environment.url + ROLES);
  }

  updateUser(id, user){
    return this.http.put(environment.url + UPDATEENDPOINT + id, user);
  }
}

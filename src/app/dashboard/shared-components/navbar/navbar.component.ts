import { Component, OnInit } from '@angular/core';
import { CommonService } from './../../../shared/services/common.service';
import { User } from '../../../shared/models/models';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit{
  currentUser:User;

  constructor( public cmnSrv: CommonService,private userService:UserService) { 

  }

  ngOnInit(){
    this.userService.currentUser.subscribe((user)=>{
      this.currentUser=user;
    });
  }

}

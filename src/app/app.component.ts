import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'social-market';

  constructor(private router:Router,private userService:UserService){
    this.userService.populate();
  }

  ngOnInit(){
  }
}

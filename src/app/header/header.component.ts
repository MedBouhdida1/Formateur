import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any;
  token: any;
  constructor(
    private router: Router,
    private service: CrudService

  ) {
    this.user = this.service.userDetail();

  }
  Logout() {
    localStorage.clear()
    window.location.reload()
  }
  ngOnInit(): void {
    console.log(this.user)
    this.token = localStorage.getItem("myToken")
    console.log(this.token)
  }


}

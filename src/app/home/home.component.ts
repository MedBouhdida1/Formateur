import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(

    private router: Router
  ) { }
  open() {
    this.router.navigate(['/register']);
  }


  ngOnInit(): void {
    console.log(localStorage.getItem("User"))
  }

}

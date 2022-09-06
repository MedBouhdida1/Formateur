import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
  displayonclick: string = "accordion";
  changestyle: string = ""
  constructor() { }


  onSubmit() {
    if (this.displayonclick == "accordion") {
      this.changestyle = "active"
      this.displayonclick = "accordion display";
    }
    else {
      this.changestyle = ""
      this.displayonclick = "accordion";
    }
  }
  ngOnInit(): void {
  }

}

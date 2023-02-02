import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { Entreprise } from '../Model/Entreprise.model';
import { Formateur } from '../Model/Formateur.model';
import * as $ from "jquery";


declare var require: any
const FileSaver = require('file-saver');

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  userEnt = new Entreprise();
  userFor = new Formateur();
  token: any;
  userType: any;
  id: any;
  file: any
  user: any

  constructor(
    private router: Router,
    private service: CrudService,
    private sanitizer: DomSanitizer


  ) {
    this.user = this.service.userDetail();

  }
  Logout() {
    this.router.navigate(["/home"])
    localStorage.clear()
    window.location.reload()


  }
  toggleTitle() {
    $('.navbar-nav').slideToggle();
  }
  toggleOffre() {
    $('.dropdown-menu').slideToggle();
  }

  downloadPdf(pdfURL: any) {
    const pdfName = 'Cv';
    FileSaver.saveAs(pdfURL, pdfName);
  }
  openDoc(pdfUrl: any) {
    window.open(pdfUrl, '_blank', '');
  }
  ngOnInit(): void {
    this.token = localStorage.getItem("myToken")
    this.userType = localStorage.getItem("User")
    if (this.token) {
      this.id = this.service.userDetail().id;

      if (this.userType == "entreprise") {
        this.service.getEntrepriseById(this.id).subscribe(data => {
          this.user = data
          console.log(this.user)
          // console.log(this.user.offre[0].id)
          this.service.getOffreById(this.user.offre[0].id).subscribe(off => {
            // console.log(off)
          })
        })
      }
      else {
        this.service.getFormateurById(this.id).subscribe(data => {
          this.user = data
          // const blob = new Blob([this.user.cv], { type: 'application/pdf' });
          // this.file = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
        })
      }


    }


  }


}

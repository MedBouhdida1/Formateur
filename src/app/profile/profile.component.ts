import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Entreprise } from '../Model/Entreprise.model';
import { Formateur } from '../Model/Formateur.model';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  message?: String
  imgURL: any
  imagePath: any
  userFile: any
  id: any;
  currentEntreprise = new Entreprise()
  currentFormateur = new Formateur()
  currentToken: any
  constructor(
    private service: CrudService,
    private router: Router,
    private toast: NgToastService


  ) { }
  onSelectFile(event: any) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userFile = file;


      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = 'Only images are supported.';
        return;
      }

      var reader = new FileReader();

      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
        if (this.currentToken == "entreprise") {
          this.currentEntreprise.logo = this.imgURL;
        }
        else {
          this.currentFormateur.photo = this.imgURL;
        }
      };
    }
  }
  modifierEntreprise() {
    this.service.updateEntreprise(this.id, this.currentEntreprise).subscribe(entreprise => {
      this.service.loginentreprise(this.currentEntreprise).subscribe(res => {
        let token = res.token;
        localStorage.setItem("myToken", token)
        window.location.reload()
      })
      this.router.navigate(["/home"])
    })
  }
  modifierFormateur() {
    this.service.updateFormateur(this.id, this.currentFormateur).subscribe(formateur => {
      this.service.loginformateur(this.currentFormateur).subscribe(res => {
        let token = res.token;
        localStorage.setItem("myToken", token)
        window.location.reload()
      })
      this.router.navigate(["/home"])
    })
  }
  ngOnInit(): void {
    this.id = this.service.userDetail().id;
    this.currentToken = localStorage.getItem("User")
    if (this.currentToken == "entreprise") {
      this.service.getEntrepriseById(this.id).subscribe(data => {
        this.currentEntreprise = data;
        console.log(this.currentEntreprise)
      })
    }
    else {
      this.service.getFormateurById(this.id).subscribe(data => {
        this.currentFormateur = data;

      })
    }


  }

}

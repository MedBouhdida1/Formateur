import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as saveAs from 'file-saver';
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
  CvURL: any
  imagePath: any
  cvPath: any
  userFile: any
  userCV: any
  file: any
  id: any;
  currentEntreprise = new Entreprise()
  currentFormateur = new Formateur()
  currentToken: any
  constructor(
    private service: CrudService,
    private router: Router,
    private toast: NgToastService,
    private sanitizer: DomSanitizer


  ) { }
  openDoc(pdfUrl: any) {
    // window.open(pdfUrl, '_blank', '');
    var win = window.open();
    win!.document.write('<iframe src="' + pdfUrl + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
  }
  onSelectFile(event: any) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userFile = file;


      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = 'Only images are supported.';
        console.log(this.message)
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
  onSelectCV(event: any) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userCV = file;


      var mimeType = event.target.files[0].type;
      if (mimeType.match(/pdf\/*/) == null) {
        this.message = 'Only images are supported.';
        console.log(this.message)
        return;
      }

      var reader = new FileReader();

      this.cvPath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.CvURL = reader.result;
        this.currentFormateur.cv = this.CvURL

        // const blob = new Blob([this.currentFormateur.cv!], { type: 'application/pdf' })
        // this.file = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
      };
    }
  }

  modifierEntreprise() {
    if (this.currentEntreprise.nom == null || this.currentEntreprise.email == null || this.currentEntreprise.numeroTel == null ||
      this.currentEntreprise.site == null || this.currentEntreprise.localisation == null || this.currentEntreprise.logo == null) {
      this.toast.info({
        summary: "Tous les champs sont obligatoire"
      })
    }
    else {
      this.service.updateEntreprise(this.id, this.currentEntreprise).subscribe(entreprise => {
        setTimeout(() => {
          this.router.navigate(["/home"])

          this.toast.success({
            summary: "Votre compte a ete modifie avec succées"
          })
        }, 2000
        )
      })
    }

  }
  modifierFormateur() {
    if (this.currentFormateur.nom == null || this.currentFormateur.email == null || this.currentFormateur.numeroTel == null ||
      this.currentFormateur.cv == null || this.currentFormateur.photo == null) {
      this.toast.info({
        summary: "Tous les champs sont obligatoire"
      })
    }
    else {
      this.service.updateFormateur(this.id, this.currentFormateur).subscribe(formateur => {


        setTimeout(() => {
          this.router.navigate(["/home"])

          this.toast.success({
            summary: "Votre compte a ete modifie avec succées"
          });
        }, 1000
        )

      })
    }

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

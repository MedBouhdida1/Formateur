import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Entreprise } from '../Model/Entreprise.model';
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
  currentUser = new Entreprise()
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
        this.currentUser.logo = this.imgURL;
      };
    }
  }
  modifierEntreprise() {
    this.service.updateEntreprise(this.id, this.currentUser).subscribe(entreprise => {
      this.router.navigate(["/home"]).then(() => {
        this.toast.info({
          summary: "Votre profil a été mis à jour avec succès"
        });

      })
    })
  }
  ngOnInit(): void {
    this.id = this.service.userDetail().id;
    this.service.getEntrepriseById(this.id).subscribe(data => {
      this.currentUser = data;
      console.log(this.currentUser)

    })

  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Contact } from '../Model/contact.model';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  now = new Date();
  currentUser: any
  contact = new Contact()
  userType: any
  constructor(
    private service: CrudService,
    private router: Router,
    private toast: NgToastService
  ) {



  }

  addContact() {
    if (this.userType) {
      this.contact.nom = this.currentUser.nom
      this.contact.email = this.currentUser.email
    }

    let date = this.now.toLocaleDateString()
    let contact = new Contact(
      undefined, this.contact.nom, this.contact.email, this.contact.sujet, this.contact.msg, this.now.toLocaleString()
    );
    console.log(contact);

    if (this.contact.nom == null || this.contact.email == null || this.contact.sujet == null || this.contact.msg == null) {
      this.toast.info({
        detail: "Erreur msg !!",
        summary: "les champs sont obligatoires"

      }
      );
    }
    else {
      this.service.addContact(contact).subscribe(

        res => {
          console.log(res);

          this.router.navigate(['/home']);
          this.toast.info({
            summary: "Le message a ete envoyée"
          })
        },
        err => {
          console.log(err);
          this.toast.error({
            detail: "Error msg",
            summary: "verifier votre formulaire"
          });

        }

      )
    }
  }
  ngOnInit(): void {
    this.userType = localStorage.getItem("User")
    if (this.userType == "entreprise")
      this.service.getEntrepriseById(this.service.userDetail().id).subscribe(entreprise => {
        this.currentUser = entreprise
      })
    if (this.userType == "formateur") {
      this.service.getFormateurById(this.service.userDetail().id).subscribe(formateur => {
        this.currentUser = formateur
      })
    }
  }

}

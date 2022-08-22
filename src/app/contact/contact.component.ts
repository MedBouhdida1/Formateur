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
  addContactForm: FormGroup
  now = new Date();


  constructor(
    private service: CrudService,
    private router: Router,
    private fb: FormBuilder,
    private toast: NgToastService
  ) {
    let formControls = {


      nom: new FormControl('', [
        Validators.required,

      ]),
      email: new FormControl('', [
        Validators.required,

      ]),
      sujet: new FormControl('', [
        Validators.required,

      ]),
      msg: new FormControl('', [
        Validators.required,

      ]),
    }
    this.addContactForm = this.fb.group(formControls)
  }
  get nom() { return this.addContactForm.get('nom') }
  get email() { return this.addContactForm.get('email') }
  get sujet() { return this.addContactForm.get('sujet') }
  get msg() { return this.addContactForm.get('msg') }
  addContact() {
    let data = this.addContactForm.value;
    console.log(data);
    let contact = new Contact(
      undefined, data.nom, data.email, data.sujet, data.msg, this.now.toISOString().slice(0, 10)
    );
    console.log(contact);

    if (data.nom == 0 || data.email == 0 || data.sujet == 0 || data.msg == 0) {
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
  }

}

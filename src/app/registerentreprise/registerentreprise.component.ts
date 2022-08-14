import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Entreprise } from "../Model/Entreprise.model";
import { CrudService } from '../service/crud.service';
@Component({
  selector: 'app-registerentreprise',
  templateUrl: './registerentreprise.component.html',
  styleUrls: ['./registerentreprise.component.css']
})
export class RegisterentrepriseComponent implements OnInit {

  registerForm: FormGroup
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

      mdp: new FormControl('', [
        Validators.required,

      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email

      ])


    }
    this.registerForm = this.fb.group(formControls)
  }
  get nom() { return this.registerForm.get('nom') }
  get mdp() { return this.registerForm.get('mdp') }
  get email() { return this.registerForm.get('email') }

  registerEntreprise() {
    let data = this.registerForm.value;
    console.log(data);
    let entreprise = new Entreprise(
      undefined, data.nom, data.mdp, data.email, undefined);
    console.log(entreprise);

    if (data.nom == 0 || data.email == 0 || data.mdp == 0) {
      this.toast.info({
        detail: "Erreur msg !!",
        summary: "les champs sont obligatoires"

      }
      );
    }
    else {

      this.service.addentreprise(entreprise).subscribe(

        res => {
          console.log(res);

          this.router.navigate(['/loginentreprise']);
          this.toast.info({
            summary: "Votre demande de creation  de compte a ete envoyé avec succées"
          })
        },
        err => {
          console.log(err);
          this.toast.error({
            detail: "Error msg",
            summary: "verifier vore formulaire"
          });

        }

      )
    }
  }

  ngOnInit(): void {
    this.service.acessLogin()

  }

}

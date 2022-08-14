import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgToastService } from 'ng-angular-popup';
import { Entreprise } from '../Model/Entreprise.model';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-loginentreprise',
  templateUrl: './loginentreprise.component.html',
  styleUrls: ['./loginentreprise.component.css']
})
export class LoginentrepriseComponent implements OnInit {

  loginForm: FormGroup
  chechEntre = new Entreprise()
  helper = new JwtHelperService()
  constructor(
    private service: CrudService,
    private router: Router,
    private fb: FormBuilder,
    private toast: NgToastService
  ) {

    let formControls = {



      mdp: new FormControl('', [
        Validators.required,

      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email

      ])
    }
    this.loginForm = this.fb.group(formControls)
  }
  get mdp() { return this.loginForm.get('mdp') }
  get email() { return this.loginForm.get('email') }


  loginEntreprise() {
    let data = this.loginForm.value;
    let entreprise = new Entreprise(null, null, data.mdp, data.email, undefined);

    if (data.email == 0 || data.mdp == 0) {
      this.toast.info({
        detail: "Erreur msg !!",
        summary: "les champs sont obligatoires"
      });
    }


    else {
      this.service.loginentreprise(entreprise).subscribe(
        res => {
          console.log(res);
          let token = res.token;
          let decodeToken = this.helper.decodeToken(token);
          if (decodeToken.data.etat == 0) {
            this.toast.info({
              summary: "Votre demande de creation de compte est en cours de traitement"
            })
          }
          else {
            localStorage.setItem("myToken", token);
            this.router.navigate(["/home"]);
          }

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

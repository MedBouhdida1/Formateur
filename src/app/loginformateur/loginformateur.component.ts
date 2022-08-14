import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Formateur } from '../Model/Formateur.model';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-loginformateur',
  templateUrl: './loginformateur.component.html',
  styleUrls: ['./loginformateur.component.css']
})
export class LoginformateurComponent implements OnInit {

  loginForm: FormGroup

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


  loginFormateur() {
    let data = this.loginForm.value;
    console.log(data);
    let formateur = new Formateur(null, null, null, null, data.email, data.mdp);
    if (data.email == 0 || data.mdp == 0) {
      this.toast.info({
        detail: "Erreur msg !!",
        summary: "les champs sont obligatoires"
      });
    }
    else {
      this.service.loginformateur(formateur).subscribe(
        res => {
          console.log(res);
          let token = res.token;
          localStorage.setItem("myToken", token);
          this.router.navigate(["/home"]);
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Offres } from '../Model/Offres.model';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.css']
})
export class OffreComponent implements OnInit {
  listeOffres: Offres[] | undefined
  numberOffres: number = 0
  userType: any;
  constructor(
    private route: Router,

    private service: CrudService,
    private toast: NgToastService

  ) { }


  //add apply
  apply() {
    if (this.userType == null) {
      this.route.navigate(["/loginformateur"]);
      this.toast.info({
        summary: "Vous devez connecter pour postuler a un offre"
      })
    }
  }
  ngOnInit(): void {
    // this.service.loginRequired();
    this.userType = localStorage.getItem("User")
    this.service.getOffreByEtat(1).subscribe(offre => {
      this.listeOffres = offre
      this.numberOffres = offre.length
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Formateur } from '../Model/Formateur.model';
import { Offres } from '../Model/Offres.model';
import { CrudService } from '../service/crud.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.css']
})
export class OffreComponent implements OnInit {
  listeOffres: Offres[] = []
  listeOffres1: Offres[] = []
  numberOffres: number = 0
  userType: any;
  now = new Date()
  userId: any
  nbrOffres: number = 0
  currentFormateur = new Formateur()
  page: number = 1;
  SearchedOffre = new Offres()

  constructor(
    private route: Router,
    private service: CrudService,
    private toast: NgToastService

  ) { }

  searchtitre() {
    console.log(this.SearchedOffre.titre)

    if (this.SearchedOffre.titre != "") {
      this.listeOffres = this.listeOffres1;
      this.listeOffres = this.listeOffres.filter(offre => offre.titre?.toLowerCase().match(this.SearchedOffre.titre!.toLowerCase()))
    }
    else {
      this.listeOffres = this.listeOffres1;
    }
  }
  // search() {
  //   console.log(this.SearchedOffre.type)
  //   if (this.SearchedOffre.type != "Tous") {
  //     this.listeOffres = this.listeOffres1;
  //     this.listeOffres = this.listeOffres.filter(off => off.type == this.SearchedOffre.type)
  //   }
  //   else {
  //     this.listeOffres = this.listeOffres1;
  //   }
  // }

  // Tous() {
  //   this.listeOffres = this.listeOffres1;
  // }
  // pleinTempsOffers() {
  //   this.listeOffres = this.listeOffres1;
  //   this.listeOffres = this.listeOffres.filter(offre => offre.type == 'Plein temps')
  // }
  // TempsPartielOffers() {
  //   this.listeOffres = this.listeOffres1;
  //   this.listeOffres = this.listeOffres.filter(offre => offre.type == 'Temps partiel')

  // }
  // StageOffers() {
  //   this.listeOffres = this.listeOffres1;
  //   this.listeOffres = this.listeOffres.filter(offre => offre.type == 'Stage')

  // }
  //add apply
  apply() {
    if (this.userType == null) {
      this.route.navigate(["/loginformateur"]);
      this.toast.info({
        summary: "Vous devez connecter pour postuler a une offre"
      })
    }
    else if (this.currentFormateur.cv == null) {
      this.route.navigate(["/profile"]);

      this.toast.info({
        summary: "Vous devez completer votre profil"
      })
    }

  }
  ngOnInit(): void {
    // this.service.loginRequired();
    this.userType = localStorage.getItem("User")
    this.service.getOffreByEtat(1).subscribe(offre => {
      this.listeOffres = offre;
      this.listeOffres1 = offre;

      this.nbrOffres = this.listeOffres.length
      // for (let off of this.listeOffres) {
      //   if (off.dateExpir! < this.now.toISOString().slice(0, 10)) {
      //     this.service.deleteOffre(off.id!).subscribe(() => {
      //     })
      //   }
      // }

    })
    if (this.userType == "formateur") {
      this.service.getFormateurById(this.service.userDetail().id).subscribe(forma => {
        this.currentFormateur = forma
      })
    }


  }


}

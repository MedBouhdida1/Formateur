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
  check: number = 0;
  now = new Date()
  userId: any
  nbrOffres: number = 0
  currentFormateur = new Formateur()
  page: number = 1;
  SearchedOffre = new Offres()
  offre = new Offres()
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
  apply(id: number) {
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
    else {
      this.service.getOffreById(id).subscribe(off => {

        this.offre = off
        console.log(this.offre)
        // this.offre.formateur.push(JSON.parse(JSON.stringify(this.currentFormateur)))
        // this.service.updateOffre(id, this.offre).subscribe(() => {

        // }) 
        // TODO early exit main function
        for (off of this.currentFormateur.offre) {
          if (this.offre.id == off.id) {
            this.check = 1
            this.toast.warning({
              summary: "vous avez deja postuler dans cette offre"
            })
            this.route.navigate(["/postulation"])
            return;
          }
        }
        // this.currentFormateur.offre.forEach((off) => {
        if (this.offre.dateExpir! < this.now.toISOString().slice(0, 10)) {
          this.toast.warning({
            summary: "Cette offre a ete expiré"
          })
          this.route.navigate(["/offre"])
          return;
        }

        // })
        if (this.check == 0) {
          this.currentFormateur.offre.push(this.offre)
          this.service.updateFormateur(this.currentFormateur.id!, this.currentFormateur).subscribe(() => {
            this.toast.success({
              summary: "Vous avez postuler à l'offre " + this.offre.titre + " de l'entreprise " + this.offre.entreprise?.nom
            })
            this.route.navigate(["/postulation"])

          })
        }


      })

      // this.offre.formateur.push(JSON.parse(JSON.stringify(this.currentFormateur)))
      // this.service.updateOffre(id, this.offre).subscribe(() => {

      // })
    }

  }
  ngOnInit(): void {
    // this.service.loginRequired();
    this.userType = localStorage.getItem("User")
    this.service.getOffreByEtat(1).subscribe(offre => {
      this.listeOffres = offre;
      console.log(this.listeOffres)
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

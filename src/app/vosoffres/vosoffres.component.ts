import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Offres } from '../Model/Offres.model';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-vosoffres',
  templateUrl: './vosoffres.component.html',
  styleUrls: ['./vosoffres.component.css']
})
export class VosoffresComponent implements OnInit {
  listeOffres1: Offres[] = []
  listeOffres: Offres[] = []
  numberOffres: number = 0
  userType: any;
  currentUser: any
  now = new Date()
  SearchedOffre = new Offres()
  page: number = 1;
  constructor(
    private route: Router,

    private service: CrudService,
    private toast: NgToastService

  ) { }
  supprimerOffre(offre: Offres) {
    if (confirm("Voulez vous supprimer cette Offre ?")) {
      this.service.deleteOffre(offre.id!).subscribe(() => {
        window.location.reload();
      });

    }
  }

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
    if (this.userType == "formateur") {
      this.route.navigate(["/home"]);
      this.toast.info({
        summary: "Vous ne pouvez pas accéder à cette page"
      })
    }
    // this.service.getEntrepriseById(this.service.userDetail().id).subscribe(entreprise => {
    //   this.currentUser = entreprise;
    //   this.listeOffres = this.currentUser.offre;
    //   this.listeOffres1 = this.listeOffres
    //   this.numberOffres = this.listeOffres.length
    //   console.log(this.listeOffres)
    // })
    this.service.getOffres().subscribe(offre => {
      this.listeOffres = offre
      this.listeOffres = this.listeOffres.filter(off => off.entreprise?.id == this.service.userDetail().id)
      this.listeOffres1 = this.listeOffres
      this.numberOffres = this.listeOffres.length

    })
    // this.service.getOffreByEtat(1).subscribe(offre => {
    //   this.listeOffres = offre
    //   this.numberOffres = offre.length
    //   for (let off of this.listeOffres) {

    //     if (off.dateExpir! < this.now.toISOString().slice(0, 10)) {
    //       this.service.deleteOffre(off.id!).subscribe(() => {
    //       })
    //     }
    //   }

    // })


  }

}

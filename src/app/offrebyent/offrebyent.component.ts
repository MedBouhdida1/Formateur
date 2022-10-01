import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Offres } from '../Model/Offres.model';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-offrebyent',
  templateUrl: './offrebyent.component.html',
  styleUrls: ['./offrebyent.component.css']
})
export class OffrebyentComponent implements OnInit {
  currentUser: any;
  listeOffres1: Offres[] = []
  listeOffres: Offres[] = []
  userType: any;
  id: number = 0;
  nbrOffres: number = 0;
  SearchedOffre = new Offres()
  page: number = 1

  constructor(
    private router: Router,
    private service: CrudService,
    private toast: NgToastService,
    private rout: ActivatedRoute


  ) { }
  apply() {
    if (this.userType == null) {
      this.router.navigate(["/loginformateur"]);
      this.toast.info({
        summary: "Vous devez connecter pour postuler a un offre"
      })
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
  ngOnInit(): void {
    this.id = this.rout.snapshot.params["id"];


    this.userType = localStorage.getItem("User")


    this.service.getoffresbyetatandentreprise(1, this.id).subscribe(off => {
      this.listeOffres = off
      this.listeOffres1 = this.listeOffres
      this.nbrOffres = this.listeOffres.length
    })


    // this.service.getOffres().subscribe(offre => {
    //   this.listeOffres = offre
    //   this.listeOffres = this.listeOffres.filter(off => off.entreprise?.id == this.id)
    //   this.listeOffres1 = this.listeOffres
    //   this.nbrOffres = this.listeOffres.length

    // })
  }

}

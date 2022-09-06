import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Observable, Observer, share } from 'rxjs';
import { Entreprise } from '../Model/Entreprise.model';
import { Formateur } from '../Model/Formateur.model';
import { Offres } from '../Model/Offres.model';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  SlideOptions = { items: 2, dots: true, nav: true };
  CarouselOptions = { items: 3, dots: true, nav: true };
  counter: number = 0
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
  listEntr: Entreprise[] = []
  public observable: Observable<boolean>;
  private observer!: Observer<boolean>;
  constructor(

    private route: Router,
    private service: CrudService,
    private toast: NgToastService) {
    this.observable = new Observable<boolean>((observer: any) => this.observer = observer).pipe(share());
    setTimeout(() => this.observer.next(true), 5000);
  }
  Tous() {
    this.listeOffres = this.listeOffres1;
  }
  pleinTempsOffers() {
    this.listeOffres = this.listeOffres1;
    this.listeOffres = this.listeOffres.filter(offre => offre.type == 'Plein temps')
  }
  TempsPartielOffers() {
    this.listeOffres = this.listeOffres1;
    this.listeOffres = this.listeOffres.filter(offre => offre.type == 'Temps partiel')

  }
  StageOffers() {
    this.listeOffres = this.listeOffres1;
    this.listeOffres = this.listeOffres.filter(offre => offre.type == 'Stage')

  }
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
  counterstop: any = setInterval(() => {
    this.counter++;
    if (this.counter == 250) {
      clearInterval(this.counterstop);
    }

  }, 10)

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
    this.service.getEntreprises().subscribe(entre => {
      this.listEntr = entre
      this.listEntr = this.listEntr.filter(entre => entre.etat == 1).filter(ent => ent.logo != null)
    })
    if (this.userType == "formateur") {
      this.service.getFormateurById(this.service.userDetail().id).subscribe(forma => {
        this.currentFormateur = forma
      })
    }



  }


}

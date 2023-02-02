import { Component, HostListener, OnInit } from '@angular/core';
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
  userId: any;
  nbrOffres: number = 0
  nbrEntre: number = 0
  currentFormateur = new Formateur()
  page: number = 1;
  SearchedOffre = new Offres()
  listEntr: Entreprise[] = []
  offre = new Offres()
  check: number = 0;
  listForma: Formateur[] = []
  numberForma: number = 0
  public observable: Observable<boolean>;
  private observer!: Observer<boolean>;
  constructor(

    private route: Router,
    private service: CrudService,
    private toast: NgToastService) {
    this.observable = new Observable<boolean>((observer: any) => this.observer = observer).pipe(share());
    // $(document).ready(function () {
    //   if (window.location.pathname + window.location.hash == '/index.html#contact') {
    //     this.observer.next(true)
    //   }
    // });
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
          }
        }
        // this.currentFormateur.offre.forEach((off) => {


        // })
        if (this.check == 0) {
          this.currentFormateur.offre.push(this.offre)
          this.service.updateFormateur(this.currentFormateur.id!, this.currentFormateur).subscribe(() => {
            this.route.navigate(["/postulation"])

          })
        }


      })

      // this.offre.formateur.push(JSON.parse(JSON.stringify(this.currentFormateur)))
      // this.service.updateOffre(id, this.offre).subscribe(() => {

      // })
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
    this.service.getFormateurs().subscribe(lstfor => {
      this.listForma = lstfor.filter(forma => forma.cv != null)
      this.numberForma = this.listForma.length
    })
    this.userType = localStorage.getItem("User")
    if (this.userType) {
      this.userId = this.service.userDetail().id

    }
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
      this.nbrEntre = this.listEntr.length

    })
    if (this.userType == "formateur") {
      this.service.getFormateurById(this.service.userDetail().id).subscribe(forma => {
        this.currentFormateur = forma
      })
    }



  }


}

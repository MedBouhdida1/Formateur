import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Entreprise } from '../Model/Entreprise.model';
import { Formateur } from '../Model/Formateur.model';
import { Offres } from '../Model/Offres.model';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-postulation',
  templateUrl: './postulation.component.html',
  styleUrls: ['./postulation.component.css']
})
export class PostulationComponent implements OnInit {
  now = new Date();
  x: any
  liste = new Map()
  liste1 = new Map()
  currEntre = new Subject<Entreprise>();
  listeOffresByFormateur: Offres[] = []
  user: any;
  listeOffres: Offres[] = []
  listeFormateurs: Formateur[] = []
  listeFormateursFinale: Formateur[] = []
  constructor(
    private service: CrudService
  ) { }
  openDoc(pdfUrl: any) {
    // window.open(pdfUrl, '_blank', '');
    var win = window.open();
    win!.document.write('<iframe src="' + pdfUrl + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
  }


  // async getEntreprise(id: number): Promise<Entreprise> {
  //   this.currEntre = <Entreprise>await this.service.getEntrerpisebyoffre(id).toPromise();
  //   return this.currEntre
  // }


  getEntreprise(id: number): Observable<Entreprise> {
    let entrep = new Subject<Entreprise>();
    this.service.getEntrerpisebyoffre(id).subscribe(entre => {
      entrep.next(entre)
    })
    return entrep.asObservable();
  }
  ngOnInit(): void {
    // console.log(this.getEntreprise(6).then(entre => { this.x = entre }))

    // this.getEntreprise(6).subscribe((r) => console.log(r))
    this.user = localStorage.getItem("User")
    if (this.user == "formateur")
      this.service.getOffresByFormateurId(this.service.userDetail().id).subscribe(off => {
        this.listeOffresByFormateur = off
        console.log(this.listeOffresByFormateur)
      })
    else {
      this.service.getOffresByEntreprise(this.service.userDetail().id).subscribe(off => {
        this.listeOffres = off;
      })
      // this.service.getOffres().subscribe(off => {
      //   this.listeOffres = off;
      //   this.listeOffres = this.listeOffres.filter(off => off.entreprise?.id == this.service.userDetail().id)
      //   console.log(this.listeOffres)
      // for (let offre of this.listeOffres) {
      //   this.service.getFormateursByOffreId(offre.id!).subscribe(form => {
      //     this.listeFormateurs = form;
      // this.liste.set(offre.titre, this.listeFormateurs)
      // for (let [key, value] of this.liste) {

      //   this.liste1.set(key, value)
      // }
      // for (let forma of this.listeFormateurs) {
      //   this.listeFormateursFinale.push(forma)
      // }
      //   })
      // }
      // console.log(this.listeFormateursFinale);

      // })
    }
  }

}

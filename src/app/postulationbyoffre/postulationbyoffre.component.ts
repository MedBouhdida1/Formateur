import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Entreprise } from '../Model/Entreprise.model';
import { Formateur } from '../Model/Formateur.model';
import { Offres } from '../Model/Offres.model';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-postulationbyoffre',
  templateUrl: './postulationbyoffre.component.html',
  styleUrls: ['./postulationbyoffre.component.css']
})
export class PostulationbyoffreComponent implements OnInit {
  id: number = 0;
  currentEntre = new Entreprise()
  listeForm: Formateur[] = []
  currentOffre = new Offres()
  constructor(
    private rout: ActivatedRoute,

    private route: Router,
    private service: CrudService,
    private toast: NgToastService
  ) { }
  openDoc(pdfUrl: any) {
    // window.open(pdfUrl, '_blank', '');
    var win = window.open();
    win!.document.write('<iframe src="' + pdfUrl + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
  }
  ngOnInit(): void {
    //onlyentreprise
    this.id = this.rout.snapshot.params["id"];
    this.service.getFormateursByOffreId(this.id).subscribe(form => {
      this.listeForm = form
    })
    this.service.getOffreById(this.id).subscribe(off => {
      this.service.getEntrepriseById(this.service.userDetail().id).subscribe(entre => {
        this.currentEntre = entre
        if (this.currentEntre.offre.filter(off => off.id == this.id).length != 0) {
          this.currentOffre = off
        }
        else {
          this.route.navigate(["/vosoffres"])

          this.toast.info({
            summary: "vous ne pouvez pas consulter la liste des postulation de cette offre"
          })
        }
      })
    }, err => {
      this.route.navigate(["/vosoffres"])
      this.toast.info({
        summary: "Cette offre n'existe pas ou a ete supprimer"
      })
    })
  }

}

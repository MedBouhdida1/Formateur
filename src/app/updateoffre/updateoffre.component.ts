import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Entreprise } from '../Model/Entreprise.model';
import { Offres } from '../Model/Offres.model';
import { CrudService } from '../service/crud.service';



@Component({
  selector: 'app-updateoffre',
  templateUrl: './updateoffre.component.html',
  styleUrls: ['./updateoffre.component.css']
})
export class UpdateoffreComponent implements OnInit {
  message?: String
  userType: any;

  imgURL: any
  imagePath: any
  userFile: any
  currentToken: any
  now = new Date()
  id: any;
  listRequirement: String[] = []
  listRequirement1: String[] = []
  currentOffre = new Offres()
  currentEntre = new Entreprise()
  constructor(
    private service: CrudService,
    private router: Router,
    private toast: NgToastService,

    private rout: ActivatedRoute
  ) { }

  modifierOffre() {
    this.currentOffre.requirements = this.listRequirement.toString()
    this.currentOffre.etat = 0;
    this.service.updateOffre(this.id, this.currentOffre).subscribe(() => {
      this.router.navigate(["/vosoffres"])
      this.toast.info({
        summary: "Votre offre est en cours de traitement"
      })
    })
  }
  addRequirement() {
    if (this.currentOffre.requirements != '') {
      this.listRequirement.push(this.currentOffre.requirements! + ",");
    }
    //Reset input
    console.log(this.listRequirement)
    this.currentOffre.requirements = '';
  }
  deleteRequirement(item: any) {
    let index = this.listRequirement.indexOf(item)
    this.listRequirement.splice(index, 1)
  }
  ngOnInit(): void {
    this.userType = localStorage.getItem("User")
    if (this.userType == "formateur") {
      this.router.navigate(["/home"]);
      this.toast.info({
        summary: "Vous ne pouvez pas accéder à cette page"
      })
    }
    this.id = this.rout.snapshot.params["id"];
    this.service.getEntrepriseById(this.service.userDetail().id).subscribe(entre => {
      this.currentEntre = entre
      this.currentEntre.offre = this.currentEntre.offre.filter(off => off.id == this.id)
      if (this.currentEntre.offre.length == 0) {
        this.router.navigate(["/vosoffres"])
        this.toast.info({
          summary: "Vous ne pouvez pas modifier cette offre"
        })
      }
    })
    this.service.getOffreById(this.id).subscribe(data => {
      this.currentOffre = data
      console.log(this.currentOffre)
      this.currentOffre.datePub = this.now.toISOString().slice(0, 10);
      if (this.currentOffre.requirements != null) {
        this.listRequirement = this.currentOffre.requirements!.split(",,")
        for (let requir of this.listRequirement) {
          this.listRequirement1.push(requir + ',')
        }
        this.listRequirement = this.listRequirement1
      }
      console.log(this.listRequirement)
      this.currentOffre.requirements = ''
    })
  }

}

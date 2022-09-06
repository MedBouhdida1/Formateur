import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
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
  currentOffre = new Offres()
  constructor(
    private service: CrudService,
    private router: Router,
    private toast: NgToastService,

    private rout: ActivatedRoute
  ) { }

  modifierOffre() {
    this.currentOffre.requirements = this.listRequirement.toString()
    this.currentOffre.etat == 0;
    this.service.updateOffre(this.id, this.currentOffre).subscribe(() => {
      this.router.navigate(["/vosoffres"])
      this.toast.info({
        summary: "Votre offre est en cours de traitement"
      })
    })
  }
  addRequirement() {
    if (this.currentOffre.requirements != '') {
      this.listRequirement.push(this.currentOffre.requirements!);
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
    this.service.getOffreById(this.id).subscribe(data => {
      this.currentOffre = data
      this.currentOffre.datePub = this.now.toISOString().slice(0, 10);
      this.listRequirement = this.currentOffre.requirements!.split(",")
      this.currentOffre.requirements = ''
    })
  }

}

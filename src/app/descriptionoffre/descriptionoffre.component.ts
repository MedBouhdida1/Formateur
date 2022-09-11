import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Entreprise } from '../Model/Entreprise.model';
import { Offres } from '../Model/Offres.model';
import { OffreComponent } from '../offre/offre.component';
import { CrudService } from '../service/crud.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-descriptionoffre',
  templateUrl: './descriptionoffre.component.html',
  styleUrls: ['./descriptionoffre.component.css']
})
export class DescriptionoffreComponent implements OnInit {
  id: any;
  currentOffre = new Offres()
  listRequirement?: String[] = []
  user: any
  currentUser = new Entreprise()
  constructor(
    private service: CrudService,
    private router: Router,
    private toast: NgToastService,
    private location: Location,
    private rout: ActivatedRoute

  ) { }
  findOffre(obj: Offres, list: Offres[]) {
    var i;
    for (i = 0; i < list.length; i++) {
      if (JSON.stringify(list[i]) === JSON.stringify(obj)) {
        return true;
      }
    }

    return false;
  }
  ngOnInit(): void {
    this.user = localStorage.getItem("User")
    this.id = this.rout.snapshot.params["id"];
    this.service.getOffreById(this.id).subscribe(data => {
      if (data == null) {
        this.router.navigate(["/offre"])
        this.toast.info({
          summary: "Cette offre n'existe pas ou a ete supprimer"
        })
      }
      else if (data.etat == 0) {
        if (this.user == "entreprise") {
          this.service.getEntrepriseById(this.service.userDetail().id).subscribe(entre => {
            this.currentUser = entre
            if (this.currentUser.offre.filter(off => off.id == data.id).length != 0) {
              this.currentOffre = data
            }
            else {
              // this.location.back()
              this.router.navigate(["/offre"])

              this.toast.info({
                summary: "vous ne pouvez pas consulter la description de cette offre"
              })

            }
          })
        }
      }
      else {
        this.currentOffre = data
      }

      this.listRequirement = this.currentOffre.requirements?.split(",")
      console.log(this.listRequirement?.length)
    })

  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Entreprise } from '../Model/Entreprise.model';
import { Offres } from '../Model/Offres.model';
import { OffreComponent } from '../offre/offre.component';
import { CrudService } from '../service/crud.service';
import { FormatWidth, Location } from '@angular/common';
import { Formateur } from '../Model/Formateur.model';

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
  currentFormateur = new Formateur()
  check: number = 0;

  constructor(
    private service: CrudService,
    private router: Router,
    private toast: NgToastService,
    private location: Location,
    private rout: ActivatedRoute

  ) { }

  apply() {
    if (this.user == null) {
      this.router.navigate(["/loginformateur"]);
      this.toast.info({
        summary: "Vous devez connecter pour postuler a une offre"
      })
    }
    else if (this.currentFormateur.cv == null) {
      this.router.navigate(["/profile"]);

      this.toast.info({
        summary: "Vous devez completer votre profil"
      })
    }
    else {
      this.service.getOffreById(this.id).subscribe(off => {

        this.currentOffre = off
        console.log(this.currentOffre)
        // this.offre.formateur.push(JSON.parse(JSON.stringify(this.currentFormateur)))
        // this.service.updateOffre(id, this.offre).subscribe(() => {

        // }) 
        // TODO early exit main function
        for (off of this.currentFormateur.offre) {
          if (this.currentOffre.id == off.id) {
            this.check = 1
            this.toast.warning({
              summary: "vous avez deja postuler dans cette offre"
            })
            this.router.navigate(["/postulation"])
          }
        }
        // this.currentFormateur.offre.forEach((off) => {


        // })
        if (this.check == 0) {
          this.currentFormateur.offre.push(this.currentOffre)
          this.service.updateFormateur(this.currentFormateur.id!, this.currentFormateur).subscribe(() => {
            this.router.navigate(["/postulation"])

          })
        }


      })

      // this.offre.formateur.push(JSON.parse(JSON.stringify(this.currentFormateur)))
      // this.service.updateOffre(id, this.offre).subscribe(() => {

      // })
    }

  }
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

      if (data.etat == 0) {
        if (this.user == "entreprise") {
          this.service.getEntrepriseById(this.service.userDetail().id).subscribe(entre => {
            this.currentUser = entre
            if (this.currentUser.offre.filter(off => off.id == data.id).length != 0) {
              this.currentOffre = data
              this.listRequirement = this.currentOffre.requirements?.split(",,")
              console.log(this.listRequirement)
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
        console.log(this.currentOffre)
        this.listRequirement = this.currentOffre.requirements?.split(",,")
        console.log(this.listRequirement?.length)
      }

    }, err => {
      this.router.navigate(["/offre"])
      this.toast.info({
        summary: "Cette offre n'existe pas ou a ete supprimer"
      })
    })
    if (this.user == "formateur") {
      this.service.getFormateurById(this.service.userDetail().id).subscribe(forma => {
        this.currentFormateur = forma
      })
    }

  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Offres } from '../Model/Offres.model';
import { OffreComponent } from '../offre/offre.component';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-descriptionoffre',
  templateUrl: './descriptionoffre.component.html',
  styleUrls: ['./descriptionoffre.component.css']
})
export class DescriptionoffreComponent implements OnInit {
  id: any;
  currentOffre = new Offres()
  listRequirement?: String[] = []
  constructor(
    private service: CrudService,
    private router: Router,
    private toast: NgToastService,

    private rout: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.id = this.rout.snapshot.params["id"];
    this.service.getOffreById(this.id).subscribe(data => {
      if (data == null || data.etat == 0) {
        this.router.navigate(["/offre"])
        this.toast.info({
          summary: "Cette offre n'existe pas ou a ete supprimer"
        })
      }
      this.currentOffre = data

      this.listRequirement = this.currentOffre.requirements?.split(",")
      console.log(this.listRequirement)
    })

  }

}

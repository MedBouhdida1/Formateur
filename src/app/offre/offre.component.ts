import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Offres } from '../Model/Offres.model';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.css']
})
export class OffreComponent implements OnInit {
  listeOffres: Offres[] | undefined
  numberOffres: number = 0
  constructor(
    private route: Router,

    private service: CrudService
  ) { }

  ngOnInit(): void {
    // this.service.loginRequired();
    this.service.getOffreByEtat(1).subscribe(offre => {
      this.listeOffres = offre
      this.numberOffres = offre.length
    })
  }

}

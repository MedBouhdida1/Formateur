import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Formateur } from '../Model/Formateur.model';
import { Offres } from '../Model/Offres.model';
import { Entreprise } from "../Model/Entreprise.model";
import { Observable } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Contact } from '../Model/contact.model';

const httpOption = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
@Injectable({
    providedIn: 'root'
})
export class CrudService {
    registerFormateurUrl = "http://localhost:8081/api/formateur/register"
    loginFormateurUrl = "http://localhost:8081/api/formateur/login"
    registerEntrepriseUrl = "http://localhost:8081/api/entreprise/register"
    loginEntrerpriseUrl = "http://localhost:8081/api/entreprise/login"
    apiUrl = "http://localhost:8081/api"
    OffreUrl = "http://localhost:8081/api/offres"
    contactUrl = "http://localhost:8081/api/contact"
    getByEtatUrl = "http://localhost:8081/api/offres/etat"
    helper = new JwtHelperService()

    constructor(
        private http: HttpClient,
        private router: Router,
        private toast: NgToastService,


    ) { }
    addformateur(formateur: Formateur) {
        return this.http.post<any>(this.registerFormateurUrl, formateur);
    }

    loginformateur(formateur: Formateur) {
        return this.http.post<any>(this.loginFormateurUrl, formateur);
    }
    addentreprise(entreprise: Entreprise) {
        return this.http.post<any>(this.registerEntrepriseUrl, entreprise);
    }

    loginentreprise(entreprise: Entreprise) {
        return this.http.post<any>(this.loginEntrerpriseUrl, entreprise);
    }
    getOffres(): Observable<Offres[]> {
        return this.http.get<Offres[]>(this.apiUrl + "/offres");

    }
    addOffre(offre: Offres) {
        return this.http.post<any>(this.OffreUrl, offre);

    }
    getOffreByEtat(etat: number): Observable<Offres[]> {
        return this.http.get<Offres[]>(`${this.getByEtatUrl}/${etat}`);
    }
    acessLogin() {
        let token: any = localStorage.getItem('myToken');
        if (token != null && (this.router.url == "/login" ||
            this.router.url == "/loginentreprise" ||
            this.router.url == "/loginformateur" ||
            this.router.url == "/register" ||
            this.router.url == "/registerentreprise" ||
            this.router.url == "/registerformateur")) {
            this.router.navigate(["/home"])
            this.toast.warning({
                detail: "Erreur msg !!",
                summary: "You are already loged in"
            });
        }
    }
    loginRequired() {
        let token: any = localStorage.getItem('myToken');
        if (token == null) {
            this.router.navigate(["/login"])
            this.toast.warning({
                detail: "Erreur msg !!",
                summary: "You have to login to access this page"
            });
        }

    }
    userDetail() {
        let token: any = localStorage.getItem('myToken');
        if (token != null) {
            let decodeToken = this.helper.decodeToken(token);
            return decodeToken.data
        }

    }
    addContact(contact: Contact) {
        return this.http.post<any>(this.contactUrl, contact);

    }
    public getEntrepriseById(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/entreprise/${id}`)
    }
    updateEntreprise(id: number, entreprise: Entreprise): Observable<Entreprise> {
        const URL = `${this.apiUrl + "/entreprise"}/${id}`
        return this.http.put<Entreprise>(URL, entreprise, httpOption);
    }
    updateFormateur(id: number, formateur: Formateur): Observable<Formateur> {
        const URL = `${this.apiUrl + "/formateur"}/${id}`
        return this.http.put<Formateur>(URL, formateur, httpOption);
    }
    public getFormateurById(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/formateur/${id}`)
    }
    public getOffreById(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/offres/${id}`)
    }
    deleteOffre(id: number) {
        const URL = `${this.apiUrl + "/offres"}/${id}`
        return this.http.delete(URL, httpOption)
    }
    updateOffre(id: number, offre: Offres): Observable<Offres> {
        const URL = `${this.apiUrl + "/offres"}/${id}`
        return this.http.put<Offres>(URL, offre, httpOption);
    }

}

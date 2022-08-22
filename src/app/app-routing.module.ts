import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouteroffreComponent } from './ajouteroffre/ajouteroffre.component';
import { ContactComponent } from './contact/contact.component';
import { DescriptionoffreComponent } from './descriptionoffre/descriptionoffre.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LoginentrepriseComponent } from './loginentreprise/loginentreprise.component';
import { LoginformateurComponent } from './loginformateur/loginformateur.component';
import { OffreComponent } from './offre/offre.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { RegisterentrepriseComponent } from './registerentreprise/registerentreprise.component';
import { RegisterformateurComponent } from './registerformateur/registerformateur.component';
import { AuthGuard } from './service/auth.guard';
import { UpdateoffreComponent } from './updateoffre/updateoffre.component';
import { VosoffresComponent } from './vosoffres/vosoffres.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'offre', component: OffreComponent },
  { path: 'ajouteroffre', component: AjouteroffreComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registerentreprise', component: RegisterentrepriseComponent },
  { path: 'registerformateur', component: RegisterformateurComponent },
  { path: 'loginformateur', component: LoginformateurComponent },
  { path: 'loginentreprise', component: LoginentrepriseComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'offre/:id', component: DescriptionoffreComponent, canActivate: [AuthGuard] },
  { path: 'vosoffres', component: VosoffresComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },
  { path: 'modifieroffre/:id', component: UpdateoffreComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]

})
export class AppRoutingModule { }

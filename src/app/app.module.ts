import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterentrepriseComponent } from './registerentreprise/registerentreprise.component';
import { RegisterformateurComponent } from './registerformateur/registerformateur.component';
import { LoginformateurComponent } from './loginformateur/loginformateur.component';
import { LoginentrepriseComponent } from './loginentreprise/loginentreprise.component';
import { OffreComponent } from './offre/offre.component';
import { AjouteroffreComponent } from './ajouteroffre/ajouteroffre.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileComponent } from './profile/profile.component';
import { DescriptionoffreComponent } from './descriptionoffre/descriptionoffre.component';
import { VosoffresComponent } from './vosoffres/vosoffres.component';
import { UpdateoffreComponent } from './updateoffre/updateoffre.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    RegisterentrepriseComponent,
    RegisterformateurComponent,
    LoginformateurComponent,
    LoginentrepriseComponent,
    OffreComponent,
    AjouteroffreComponent,
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    ProfileComponent,
    DescriptionoffreComponent,
    VosoffresComponent,
    UpdateoffreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignupComponent } from "./auth/signup/signup.component";
import { SigninComponent } from "./auth/signin/signin.component";
import { ArchiviUtentiComponent } from "./archivi/archivi-utenti/archivi-utenti.component";
import { AcquistiListComponent } from "./acquisti/acquisti-list/acquisti-list.component";
import { AuthGuard } from "./auth/auth-guard.service";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { ArchiviItemComponent } from "./archivi/archivi-item/archivi-item.component";
import { HomeComponent } from "./home/home.component";

const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'login', component: SigninComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'archivi', component: ArchiviUtentiComponent, canActivate: [AuthGuard]},
    { path: 'archivio', component: ArchiviItemComponent, canActivate: [AuthGuard]},
    { path: 'acquista', component: AcquistiListComponent, canActivate: [AuthGuard]},
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
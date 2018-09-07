import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignupComponent } from "./auth/signup/signup.component";
import { SigninComponent } from "./auth/signin/signin.component";
import { ArchiviListComponent } from "./archivi/archivi-list/archivi-list.component";
import { AcquistiListComponent } from "./acquisti/acquisti-list/acquisti-list.component";
import { AuthGuard } from "./auth/auth-guard.service";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const appRoutes: Routes = [
    { path: '', component: SigninComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'archivi', component: ArchiviListComponent, canActivate: [AuthGuard]},
    { path: 'acquista', component: AcquistiListComponent, canActivate: [AuthGuard]},
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
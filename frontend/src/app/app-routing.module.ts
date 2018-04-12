import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TournamentComponent} from './tournament/tournament.component';

const routes: Routes = [
  { path: '', component: TournamentComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

}

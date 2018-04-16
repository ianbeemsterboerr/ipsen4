import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TournamentComponent } from './tournament/tournament.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ScoreComponent } from './tournament/score/score.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    TournamentComponent,
    ScoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  entryComponents: [
    ScoreComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

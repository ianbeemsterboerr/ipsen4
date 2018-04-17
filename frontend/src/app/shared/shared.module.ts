import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberSpinnerComponent } from './number-spinner/number-spinner.component';
import {FormsModule} from '@angular/forms';
import {AngularFontAwesomeModule} from 'angular-font-awesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularFontAwesomeModule
  ],
  declarations: [NumberSpinnerComponent],
  entryComponents: [NumberSpinnerComponent],
  exports: [NumberSpinnerComponent]
})
export class SharedModule {
  ngDoBootstrap() {}
}

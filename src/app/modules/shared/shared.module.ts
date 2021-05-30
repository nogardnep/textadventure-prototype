import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { InformComponent } from './components/inform/inform.component';
import { CapitalizeFirstPipe } from './pipes/capitalize-first';
import { KebabCasePipe } from './pipes/kebab-case';
import { NamePipe } from './pipes/name.pipe';
import { TextPipe } from './pipes/text.pipe';

@NgModule({
  declarations: [
    NamePipe,
    TextPipe,
    InformComponent,
    CapitalizeFirstPipe,
    KebabCasePipe,
  ],

  entryComponents: [],
  imports: [CommonModule, FormsModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Storage,
  ],
  bootstrap: [],
  exports: [
    NamePipe,
    TextPipe,
    CapitalizeFirstPipe,
    KebabCasePipe,
    FormsModule,
  ],
})
export class SharedModule {}

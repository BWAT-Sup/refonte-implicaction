import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginatorModule} from 'primeng/paginator';
import {SharedModule} from '../shared/shared.module';
import {MessagesRoutingModule} from "./messages-routing.module";
import {FeatherModule} from 'angular-feather';
import {MessagesComponent} from "./messages.component";

@NgModule({
  declarations: [
    MessagesComponent
  ],
  exports: [
    MessagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MessagesRoutingModule,
    FeatherModule,
    PaginatorModule,
  ]
})
export class MessagesModule {
}

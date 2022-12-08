import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginatorModule} from 'primeng/paginator';
import {SharedModule} from '../shared/shared.module';
import {ChatPageRoutingModule} from "../chat-page/components/chat-page-routing.module";
import {FeatherModule} from 'angular-feather';
import {ChatPageComponent} from "./chat-page.component";

@NgModule({
  declarations: [
    ChatPageComponent
  ],
  exports: [
    ChatPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ChatPageRoutingModule,
    FeatherModule,
    PaginatorModule,
  ]
})
export class ChatPageModule {
}

import {Component, Input, TemplateRef} from '@angular/core';
import {Constants} from "../config/constants";
import {Univers} from "../shared/enums/univers";
import {User} from "../shared/models/user";
import { rxStompServiceFactory } from '../shared/services/rx-stomp.service.factory';
import { Message } from '@stomp/stompjs';
import { Subscription } from 'rxjs';
import {RxStompService} from "@stomp/ng2-stompjs";


@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent {

  receivedMessages: Message[] = [];
  // @ts-ignore, to suppress warning related to being undefined
  private topicSubscription: Subscription;
  constructor(private rxStompService: RxStompService ) {}
  readonly constant = Constants;
  readonly univer = Univers;

  @Input()
  user: User;

  @Input()
  innerTemplate: TemplateRef<any>;

  ngOnInit() {
    this.rxStompService = rxStompServiceFactory();
    this.topicSubscription = this.rxStompService
      .watch('/topic/demo')
      .subscribe((message: Message) => {
        this.receivedMessages.push(message);
      });
  }

  ngOnDestroy() {
    this.topicSubscription.unsubscribe();
  }


  onSendMessage() {
    let date = new Date();
    this.rxStompService.publish({
      destination: '/topic/demo',
      body: "message",
      headers:{
        user:"user",
        time:[
          date.getHours().toString().padStart(2, '0'),
          date.getMinutes().toString().padStart(2, '0'),
          date.getSeconds().toString().padStart(2, '0'),
        ].join(':')
      }
    });
  }


}

import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { RxStompService } from '../config/rx-stomp.service';
import { Message } from '@stomp/stompjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit, OnDestroy {
  receivedMessages: Message[] = [];
  // @ts-ignore, to suppress warning related to being undefined
  private topicSubscription: Subscription;
  @ViewChild('lesbogoss') bogoss: ElementRef | undefined;
  @ViewChild('message') message: ElementRef | undefined;

  constructor(private rxStompService: RxStompService ) {}

  ngOnInit() {
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
    let message = this.message?.nativeElement.value;
    let user = this.bogoss?.nativeElement.value;
    let date = new Date();
    console.log(message);
    this.rxStompService.publish({
      destination: '/topic/demo',
      body: message,
      headers:{
        user:user,
        time:[
          date.getHours().toString().padStart(2, '0'),
          date.getMinutes().toString().padStart(2, '0'),
          date.getSeconds().toString().padStart(2, '0'),
        ].join(':')
      }
    });
  }
}

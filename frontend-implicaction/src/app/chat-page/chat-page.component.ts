import {Component, Input, TemplateRef} from '@angular/core';
import {Constants} from "../config/constants";
import {Univers} from "../shared/enums/univers";
import {User} from "../shared/models/user";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent {

  readonly constant = Constants;
  readonly univer = Univers;
  @Input()
  user: User;
  @Input()
  innerTemplate: TemplateRef<any>;

  title = 'WebSocketChatRoom';
  greetings: string[] = [];
  disabled = true;
  newmessage: string;
  private stompClient = null;

  constructor() {
  }

  ngOnInit() {
    this.connect();
  }

  setConnected(connected: boolean) {
    this.disabled = !connected;
    if (connected) {
      this.greetings = [];
    }
  }

  connect() {
    const socket = new SockJS('http://localhost:8080/socket');
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.connect({}, function (frame) {
      console.log('Connected: ' + frame);
      _this.stompClient.subscribe('socket/testChat', function (hello) {
        console.log(JSON.parse(hello.body));
        _this.showMessage(JSON.parse(hello.body));
      });
    });
  }

  sendMessage() {
    this.stompClient.send(
      '/app/socket/chat',
      {},
      JSON.stringify(this.newmessage)
    );
    this.newmessage = "";
  }

  showMessage(message) {
    this.greetings.push(message);
  }

}

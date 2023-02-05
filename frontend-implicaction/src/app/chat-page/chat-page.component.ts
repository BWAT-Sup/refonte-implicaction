import {Component, Input, TemplateRef} from '@angular/core';
import {Constants} from "../config/constants";
import {Univers} from "../shared/enums/univers";
import {User} from "../shared/models/user";
import {AuthService} from '../shared/services/auth.service';
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
  messages:  string[] = [];

  private stompClient = null;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.connect();
  }

  connect() {
    const socket = new SockJS('http://localhost:8080/socket');
    this.stompClient = Stomp.over(socket);
    const _this = this;  this.stompClient.connect({},
      function (frame) {
      console.log('Connected: ' + frame);
      _this.stompClient.subscribe('socket/testChat', function (hello) {
        console.log(JSON.parse(hello.body) + "les probleme");
        _this.showMessage(JSON.parse(hello.body));
      });
    });
  }

  sendMessage() {
    this.stompClient.send('/app/socket/chat',{}, JSON.stringify(this.newmessage)  );
    this.newmessage = "";

    console.log("send");
  }

 showMessage(message) {
    this.greetings.push(message);
    console.log(" this.greetings");
  }

  /*async connect() {
    this.client = new Client({
      brokerURL: 'ws://localhost:8080/socket',
      connectHeaders: {
        Authorization: `Bearer ${this.authService.getJwtToken()}`
      },
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });

    await this.client.activate();

    return new Promise((resolve, reject) => {
      this.client.onConnect = (frame) => {
        resolve(frame);
      };
    });
  }

  subscribe(){
    this.client.subscribe('socket/chat', (message) => {
      console.log(message.body);
      this.messages.push(message.body);
    }, { id: "test" });
  }

  sendMessage() {
    this.client.publish({destination: '/app/socket/chat', body: this.newmessage});
    this.stompClient.send('/app/socket/chat',{},JSON.stringify(this.newmessage));
    this.newmessage = "";
  }

  showMessage(message) {
    this.greetings.push(message)
  }*/

}

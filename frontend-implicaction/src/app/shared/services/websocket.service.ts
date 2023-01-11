import {Injectable} from "@angular/core";
import * as Stomp from "stompjs";
import * as SockJS from "sockjs-client";
import {SERVER_API_URL} from "../../app.constants";

@Injectable() export class WebsocketService {

  private serverUrl = `${SERVER_API_URL}socket`;
  private stompClient;
  public mapEndpointSubscription: Map<string, any> = new Map();

  public async initWebSocket() {
    return new Promise((resolve) => {
      if (!this.stompClient) {
        const ws = new SockJS(this.serverUrl);
        this.stompClient = Stomp.over(ws);
        this.stompClient.connect({}, resolve);
      } else {
        resolve();
      }
    })
  }
}

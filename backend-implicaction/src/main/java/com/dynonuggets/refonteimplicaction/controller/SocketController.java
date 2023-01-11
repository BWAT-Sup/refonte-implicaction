package com.dynonuggets.refonteimplicaction.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.core.MessageSendingOperations;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin("*")
public class SocketController {

    private MessageSendingOperations<String> wsTemplate;

    @Autowired
    public void WebSocketController(MessageSendingOperations<String> wsTemplate) {
        this.wsTemplate = wsTemplate;
    }

    public SocketController(MessageSendingOperations<String> wsTemplate) {
        this.wsTemplate = wsTemplate;
    }

    @MessageMapping("topic/demo")
    @SendTo("/topic/demo")
    public String chat(String msg) {
        System.out.println(msg);
        wsTemplate.convertAndSend("/topic/test", msg);
        return msg;
    }
}
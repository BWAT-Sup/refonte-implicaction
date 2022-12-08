package com.dynonuggets.refonteimplicaction.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.core.MessageSendingOperations;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin("*")
public class WebSocketController {

    private final MessageSendingOperations<String> wsTemplate;

    @Autowired
    public WebSocketController(MessageSendingOperations<String> wsTemplate) {
        this.wsTemplate = wsTemplate;
    }

    @MessageMapping("socket/chat")
    @SendTo("/socket/chat")
    public String chat(String msg) {
        System.out.println(msg);
        wsTemplate.convertAndSend("/socket/testChat", msg);
        return msg;
    }
}
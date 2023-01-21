package com.dynonuggets.refonteimplicaction.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.core.MessageSendingOperations;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class SocketController {

    @MessageMapping("/secured/chat")
    @SendTo("/secured/history")
    public String send(String msg) {
        System.out.println(msg);
        return msg;
    }
    //new SimpleDateFormat("HH:mm").format(new Date()));
}
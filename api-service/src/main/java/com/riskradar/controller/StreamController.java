package com.riskradar.controller;

import com.riskradar.service.SseService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/api/v1/stream")
public class StreamController {

    private final SseService sseService;

    public StreamController(SseService sseService) {
        this.sseService = sseService;
    }

    @GetMapping(produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter streamRiskUpdates() {
        return sseService.registerClient();
    }
}

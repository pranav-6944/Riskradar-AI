package com.riskradar.controller;

import com.riskradar.model.RiskEvent;
import com.riskradar.service.RiskStoreService;
import com.riskradar.service.SseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/internal")
public class InternalController {

    private final RiskStoreService riskStoreService;
    private final SseService sseService;

    public InternalController(RiskStoreService riskStoreService, SseService sseService) {
        this.riskStoreService = riskStoreService;
        this.sseService = sseService;
    }

    @PostMapping("/event")
    public ResponseEntity<?> receiveEventFromPython(@RequestBody RiskEvent event) {
        if (event == null || event.getCompany() == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid event payload"));
        }

        // 1. Process in Spring Boot in-memory concurrent risk store
        riskStoreService.processIngestedEvent(event);

        // 2. Broadcast via SSE to all active browser dashboards
        sseService.broadcastRiskEvent(event);
        sseService.broadcastScoreboardUpdate(riskStoreService.getAllCompanies());

        return ResponseEntity.ok(Map.of("status", "received_and_broadcasted", "id", event.getId()));
    }
}

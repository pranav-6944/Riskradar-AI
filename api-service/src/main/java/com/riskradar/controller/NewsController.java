package com.riskradar.controller;

import com.riskradar.model.RiskEvent;
import com.riskradar.service.RiskStoreService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/news")
public class NewsController {

    private final RiskStoreService riskStoreService;

    public NewsController(RiskStoreService riskStoreService) {
        this.riskStoreService = riskStoreService;
    }

    @GetMapping
    public ResponseEntity<List<RiskEvent>> getRecentNews() {
        return ResponseEntity.ok(riskStoreService.getGlobalEventFeed());
    }
}

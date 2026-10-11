package com.riskradar.controller;

import com.riskradar.model.CompanyRiskData;
import com.riskradar.service.AiServiceClient;
import com.riskradar.service.RiskStoreService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.Collection;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/companies")
public class CompanyController {

    private final RiskStoreService riskStoreService;
    private final AiServiceClient aiServiceClient;

    public CompanyController(RiskStoreService riskStoreService, AiServiceClient aiServiceClient) {
        this.riskStoreService = riskStoreService;
        this.aiServiceClient = aiServiceClient;
    }

    @GetMapping
    public ResponseEntity<Collection<CompanyRiskData>> getAllCompanies() {
        return ResponseEntity.ok(riskStoreService.getAllCompanies());
    }

    @GetMapping("/{ticker}")
    public ResponseEntity<?> getCompanyByTicker(@PathVariable String ticker) {
        return riskStoreService.getCompanyByTicker(ticker)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{ticker}/explanation")
    public Mono<ResponseEntity<Map<String, Object>>> getCompanyExplanation(@PathVariable String ticker) {
        return Mono.justOrEmpty(riskStoreService.getCompanyByTicker(ticker))
                .flatMap(company -> aiServiceClient.getExplanation(company.getCompany()))
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PostMapping("/analyze")
    public Mono<ResponseEntity<Map<String, Object>>> analyzeAdHoc(@RequestBody Map<String, String> payload) {
        String text = payload.get("text");
        String company = payload.get("company");
        if (text == null || company == null) {
            Map<String, Object> err = Map.of("error", "text and company are required");
            return Mono.just(ResponseEntity.badRequest().body(err));
        }
        return aiServiceClient.analyzeText(text, company)
                .map(ResponseEntity::ok);
    }
}

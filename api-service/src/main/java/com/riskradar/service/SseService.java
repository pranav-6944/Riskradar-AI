package com.riskradar.service;

import com.riskradar.model.CompanyRiskData;
import com.riskradar.model.RiskEvent;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
@EnableScheduling
public class SseService {

    private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();
    private final RiskStoreService riskStoreService;

    public SseService(RiskStoreService riskStoreService) {
        this.riskStoreService = riskStoreService;
    }

    public SseEmitter registerClient() {
        // 30-minute timeout for client session
        SseEmitter emitter = new SseEmitter(1800000L);
        emitters.add(emitter);

        emitter.onCompletion(() -> emitters.remove(emitter));
        emitter.onTimeout(() -> {
            emitter.complete();
            emitters.remove(emitter);
        });
        emitter.onError((e) -> emitters.remove(emitter));

        // Send initial connect handshake with full scoreboard snapshot
        try {
            emitter.send(SseEmitter.event()
                    .name("init-connection")
                    .data(riskStoreService.getAllCompanies()));
        } catch (IOException e) {
            emitters.remove(emitter);
        }

        return emitter;
    }

    public void broadcastRiskEvent(RiskEvent event) {
        for (SseEmitter emitter : emitters) {
            try {
                emitter.send(SseEmitter.event()
                        .name("risk-event")
                        .data(event));
            } catch (IOException e) {
                emitters.remove(emitter);
            }
        }
    }

    public void broadcastScoreboardUpdate(Collection<CompanyRiskData> companies) {
        for (SseEmitter emitter : emitters) {
            try {
                emitter.send(SseEmitter.event()
                        .name("scoreboard-update")
                        .data(companies));
            } catch (IOException e) {
                emitters.remove(emitter);
            }
        }
    }

    // Periodic heartbeat every 15s to maintain active SSE connections and sync snapshot
    @Scheduled(fixedRate = 15000)
    public void sendHeartbeat() {
        Collection<CompanyRiskData> all = riskStoreService.getAllCompanies();
        broadcastScoreboardUpdate(all);
    }
}

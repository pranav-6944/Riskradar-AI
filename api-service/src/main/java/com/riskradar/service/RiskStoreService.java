package com.riskradar.service;

import com.riskradar.model.CompanyRiskData;
import com.riskradar.model.HistoryPoint;
import com.riskradar.model.RiskEvent;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class RiskStoreService {

    private final Map<String, CompanyRiskData> companyStore = new ConcurrentHashMap<>();
    private final Map<String, String> tickerToCompanyMap = new ConcurrentHashMap<>();
    private final List<RiskEvent> globalEventFeed = new CopyOnWriteArrayList<>();

    public RiskStoreService() {
        initDefaultCompanies();
    }

    private void initDefaultCompanies() {
        registerCompany("JPMorgan Chase", "JPM", "Global Diversified Banking", 32.4, "stable");
        registerCompany("Goldman Sachs", "GS", "Investment Banking & Markets", 68.5, "rising");
        registerCompany("Wells Fargo", "WFC", "Retail & Consumer Lending", 54.2, "rising");
        registerCompany("Citigroup", "C", "International Transaction Banking", 26.5, "falling");
        registerCompany("Bank of America", "BAC", "Retail & Commercial Banking", 29.0, "stable");
    }

    private void registerCompany(String name, String ticker, String sector, double initialScore, String trend) {
        CompanyRiskData data = new CompanyRiskData(name, ticker, sector, initialScore, trend);
        
        // Seed initial category scores
        Map<String, Double> cats = new HashMap<>();
        cats.put("legal", Math.round((initialScore * 0.9 + (Math.random() * 8)) * 10.0) / 10.0);
        cats.put("compliance", Math.round((initialScore * 0.8 + (Math.random() * 6)) * 10.0) / 10.0);
        cats.put("financial", Math.round((initialScore * 0.85 + (Math.random() * 7)) * 10.0) / 10.0);
        cats.put("operational", Math.round((initialScore * 0.7 + (Math.random() * 5)) * 10.0) / 10.0);
        cats.put("reputational", Math.round((initialScore * 0.75 + (Math.random() * 6)) * 10.0) / 10.0);
        data.setCategoryScores(cats);

        // Pre-fill 30 historical timepoints
        LocalTime now = LocalTime.now();
        List<HistoryPoint> history = new ArrayList<>();
        for (int i = 30; i >= 0; i--) {
            LocalTime t = now.minusMinutes(i);
            double noise = (Math.random() * 6.0) - 3.0;
            double score = Math.max(5.0, Math.min(95.0, initialScore + noise));
            history.add(new HistoryPoint(t.format(DateTimeFormatter.ofPattern("HH:mm:ss")), Math.round(score * 10.0) / 10.0));
        }
        data.setHistory(history);
        data.setExplanation("Baseline regulatory surveillance active for " + name + " (" + ticker + "). No critical sanction alerts pending.");

        companyStore.put(name, data);
        tickerToCompanyMap.put(ticker.toUpperCase(), name);
    }

    public Collection<CompanyRiskData> getAllCompanies() {
        return companyStore.values();
    }

    public Optional<CompanyRiskData> getCompanyByTicker(String ticker) {
        if (ticker == null) return Optional.empty();
        String name = tickerToCompanyMap.get(ticker.toUpperCase());
        if (name == null) {
            // Also check if ticker passed was actually company name
            name = ticker;
        }
        return Optional.ofNullable(companyStore.get(name));
    }

    public synchronized void processIngestedEvent(RiskEvent event) {
        String company = event.getCompany();
        CompanyRiskData data = companyStore.get(company);
        if (data == null) {
            // Check by ticker
            String mappedName = tickerToCompanyMap.get(event.getTicker() != null ? event.getTicker().toUpperCase() : "");
            if (mappedName != null) {
                data = companyStore.get(mappedName);
            }
        }

        if (data != null) {
            // Apply rolling mean-reversion CRI equation
            double oldScore = data.getScore();
            double baseline = 25.0;
            double decay = 0.05;
            double delta = event.getRiskDelta();

            double newScore = (oldScore * (1.0 - decay)) + (baseline * decay) + delta;
            newScore = Math.max(5.0, Math.min(98.0, newScore));
            data.setScore(Math.round(newScore * 10.0) / 10.0);

            // Add history point
            String currentTime = LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss"));
            List<HistoryPoint> hist = data.getHistory();
            hist.add(new HistoryPoint(currentTime, data.getScore()));
            if (hist.size() > 60) {
                hist.remove(0);
            }

            // Add event to front
            List<RiskEvent> events = data.getEvents();
            events.add(0, event);
            if (events.size() > 25) {
                events.remove(events.size() - 1);
            }

            // Calculate updated trend
            updateTrend(data);
            if (event.getSummary() != null && !event.getSummary().isBlank()) {
                data.setExplanation(event.getSummary());
            }
        }

        // Add to global event stream
        globalEventFeed.add(0, event);
        if (globalEventFeed.size() > 100) {
            globalEventFeed.remove(globalEventFeed.size() - 1);
        }
    }

    private void updateTrend(CompanyRiskData data) {
        List<HistoryPoint> h = data.getHistory();
        if (h.size() < 4) {
            data.setTrend("stable");
            return;
        }
        double recent = 0;
        int count = Math.min(3, h.size());
        for (int i = h.size() - count; i < h.size(); i++) {
            recent += h.get(i).getScore();
        }
        recent /= count;

        double older = h.get(Math.max(0, h.size() - 6)).getScore();
        double diff = recent - older;
        if (diff > 2.0) {
            data.setTrend("rising");
        } else if (diff < -2.0) {
            data.setTrend("falling");
        } else {
            data.setTrend("stable");
        }
    }

    public List<RiskEvent> getGlobalEventFeed() {
        return Collections.unmodifiableList(globalEventFeed);
    }
}

package com.riskradar.service;

import com.riskradar.entity.CompanyScoreEntity;
import com.riskradar.entity.RiskEventEntity;
import com.riskradar.model.CompanyRiskData;
import com.riskradar.model.HistoryPoint;
import com.riskradar.model.RiskEvent;
import com.riskradar.repository.CompanyScoreRepository;
import com.riskradar.repository.RiskEventRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class RiskStoreService {

    private final RiskEventRepository riskEventRepository;
    private final CompanyScoreRepository companyScoreRepository;

    private final Map<String, CompanyRiskData> companyStore = new ConcurrentHashMap<>();
    private final Map<String, String> tickerToCompanyMap = new ConcurrentHashMap<>();
    private final List<RiskEvent> globalEventFeed = new CopyOnWriteArrayList<>();

    public RiskStoreService(RiskEventRepository riskEventRepository, CompanyScoreRepository companyScoreRepository) {
        this.riskEventRepository = riskEventRepository;
        this.companyScoreRepository = companyScoreRepository;
        initDefaultCompanies();
        loadHistoricalEventsFromDb();
    }

    private void initDefaultCompanies() {
        registerCompany("JPMorgan Chase", "JPM", "Global Diversified Banking", 32.4, "stable");
        registerCompany("Goldman Sachs", "GS", "Investment Banking & Markets", 68.5, "rising");
        registerCompany("Wells Fargo", "WFC", "Retail & Consumer Lending", 54.2, "rising");
        registerCompany("Citigroup", "C", "International Transaction Banking", 26.5, "falling");
        registerCompany("Bank of America", "BAC", "Retail & Commercial Banking", 29.0, "stable");
    }

    private void registerCompany(String name, String ticker, String sector, double initialScore, String trend) {
        // Check if database has saved score
        Optional<CompanyScoreEntity> savedScore = companyScoreRepository.findByTickerIgnoreCase(ticker);
        double actualScore = savedScore.map(CompanyScoreEntity::getScore).orElse(initialScore);
        String actualTrend = savedScore.map(CompanyScoreEntity::getTrend).orElse(trend);

        CompanyRiskData data = new CompanyRiskData(name, ticker, sector, actualScore, actualTrend);
        
        // Seed initial category scores
        Map<String, Double> cats = new HashMap<>();
        cats.put("legal", Math.round((actualScore * 0.9 + (Math.random() * 8)) * 10.0) / 10.0);
        cats.put("compliance", Math.round((actualScore * 0.8 + (Math.random() * 6)) * 10.0) / 10.0);
        cats.put("financial", Math.round((actualScore * 0.85 + (Math.random() * 7)) * 10.0) / 10.0);
        cats.put("operational", Math.round((actualScore * 0.7 + (Math.random() * 5)) * 10.0) / 10.0);
        cats.put("reputational", Math.round((actualScore * 0.75 + (Math.random() * 6)) * 10.0) / 10.0);
        data.setCategoryScores(cats);

        // Pre-fill historical timepoints
        LocalTime now = LocalTime.now();
        List<HistoryPoint> history = new ArrayList<>();
        for (int i = 30; i >= 0; i--) {
            LocalTime t = now.minusMinutes(i);
            double noise = (Math.random() * 6.0) - 3.0;
            double score = Math.max(5.0, Math.min(95.0, actualScore + noise));
            history.add(new HistoryPoint(t.format(DateTimeFormatter.ofPattern("HH:mm:ss")), Math.round(score * 10.0) / 10.0));
        }
        data.setHistory(history);
        data.setExplanation("Baseline regulatory surveillance active for " + name + " (" + ticker + "). No critical sanction alerts pending.");

        companyStore.put(name, data);
        tickerToCompanyMap.put(ticker.toUpperCase(), name);

        // Ensure record in database
        if (savedScore.isEmpty()) {
            companyScoreRepository.save(new CompanyScoreEntity(
                    ticker.toUpperCase(),
                    name,
                    sector,
                    actualScore,
                    actualTrend,
                    Instant.now()
            ));
        }
    }

    private void loadHistoricalEventsFromDb() {
        try {
            List<RiskEventEntity> entities = riskEventRepository.findTop50ByOrderByTimestampDesc();
            for (RiskEventEntity ent : entities) {
                RiskEvent evt = new RiskEvent(
                        ent.getId(),
                        ent.getCompany(),
                        ent.getTicker(),
                        ent.getTimestamp(),
                        ent.getSource(),
                        ent.getText(),
                        ent.isHighRisk(),
                        ent.getRiskDelta(),
                        ent.getCategories() != null ? Arrays.asList(ent.getCategories().split(",")) : Collections.emptyList(),
                        ent.getSummary(),
                        ent.getSeverity()
                );
                globalEventFeed.add(evt);
            }
        } catch (Exception ignored) {}
    }

    public Collection<CompanyRiskData> getAllCompanies() {
        return companyStore.values();
    }

    public Optional<CompanyRiskData> getCompanyByTicker(String ticker) {
        if (ticker == null) return Optional.empty();
        String name = tickerToCompanyMap.get(ticker.toUpperCase());
        if (name == null) {
            name = ticker;
        }
        return Optional.ofNullable(companyStore.get(name));
    }

    public synchronized void processIngestedEvent(RiskEvent event) {
        String company = event.getCompany();
        CompanyRiskData data = companyStore.get(company);
        if (data == null) {
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

            // Save updated company score to database
            companyScoreRepository.save(new CompanyScoreEntity(
                    data.getTicker(),
                    data.getCompany(),
                    data.getSector(),
                    data.getScore(),
                    data.getTrend(),
                    Instant.now()
            ));
        }

        // Add to global event stream
        globalEventFeed.add(0, event);
        if (globalEventFeed.size() > 100) {
            globalEventFeed.remove(globalEventFeed.size() - 1);
        }

        // Persist event into database table risk_events
        try {
            String catsStr = event.getCategories() != null ? String.join(",", event.getCategories()) : "";
            riskEventRepository.save(new RiskEventEntity(
                    event.getId() != null ? event.getId() : UUID.randomUUID().toString(),
                    event.getCompany(),
                    event.getTicker(),
                    event.getTimestamp() != null ? event.getTimestamp() : LocalTime.now().toString(),
                    event.getSource(),
                    event.getText(),
                    event.isHighRisk(),
                    event.getRiskDelta(),
                    catsStr,
                    event.getSummary(),
                    event.getSeverity()
            ));
        } catch (Exception e) {
            // Ignore DB transient save error to keep live stream active
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

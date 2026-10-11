package com.riskradar.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CompanyRiskData {
    private String company;
    private String ticker;
    private String sector;
    private double score;
    private String trend;
    private List<HistoryPoint> history = new ArrayList<>();
    private Map<String, Double> categoryScores = new HashMap<>();
    private List<RiskEvent> events = new ArrayList<>();
    private String explanation;

    public CompanyRiskData() {}

    public CompanyRiskData(String company, String ticker, String sector, double score, String trend) {
        this.company = company;
        this.ticker = ticker;
        this.sector = sector;
        this.score = score;
        this.trend = trend;
    }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public String getTicker() { return ticker; }
    public void setTicker(String ticker) { this.ticker = ticker; }

    public String getSector() { return sector; }
    public void setSector(String sector) { this.sector = sector; }

    public double getScore() { return score; }
    public void setScore(double score) { this.score = score; }

    public String getTrend() { return trend; }
    public void setTrend(String trend) { this.trend = trend; }

    public List<HistoryPoint> getHistory() { return history; }
    public void setHistory(List<HistoryPoint> history) { this.history = history; }

    public Map<String, Double> getCategoryScores() { return categoryScores; }
    public void setCategoryScores(Map<String, Double> categoryScores) { this.categoryScores = categoryScores; }

    public List<RiskEvent> getEvents() { return events; }
    public void setEvents(List<RiskEvent> events) { this.events = events; }

    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }
}

package com.riskradar.model;

import java.util.List;

public class RiskEvent {
    private String id;
    private String company;
    private String ticker;
    private String timestamp;
    private String source;
    private String text;
    private boolean highRisk;
    private double riskDelta;
    private List<String> categories;
    private String summary;
    private double severity;

    public RiskEvent() {}

    public RiskEvent(String id, String company, String ticker, String timestamp, String source, 
                     String text, boolean highRisk, double riskDelta, List<String> categories, 
                     String summary, double severity) {
        this.id = id;
        this.company = company;
        this.ticker = ticker;
        this.timestamp = timestamp;
        this.source = source;
        this.text = text;
        this.highRisk = highRisk;
        this.riskDelta = riskDelta;
        this.categories = categories;
        this.summary = summary;
        this.severity = severity;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public String getTicker() { return ticker; }
    public void setTicker(String ticker) { this.ticker = ticker; }

    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public boolean isHighRisk() { return highRisk; }
    public void setHighRisk(boolean highRisk) { this.highRisk = highRisk; }

    public double getRiskDelta() { return riskDelta; }
    public void setRiskDelta(double riskDelta) { this.riskDelta = riskDelta; }

    public List<String> getCategories() { return categories; }
    public void setCategories(List<String> categories) { this.categories = categories; }

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }

    public double getSeverity() { return severity; }
    public void setSeverity(double severity) { this.severity = severity; }
}

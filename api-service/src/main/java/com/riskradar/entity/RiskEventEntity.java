package com.riskradar.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "risk_events")
public class RiskEventEntity {

    @Id
    private String id;

    @Column(nullable = false)
    private String company;

    @Column(nullable = false)
    private String ticker;

    @Column(nullable = false)
    private String timestamp;

    private String source;

    @Column(length = 2048)
    private String text;

    private boolean highRisk;

    private double riskDelta;

    private String categories; // Comma separated

    @Column(length = 1024)
    private String summary;

    private double severity;

    public RiskEventEntity() {}

    public RiskEventEntity(String id, String company, String ticker, String timestamp, String source, 
                           String text, boolean highRisk, double riskDelta, String categories, 
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

    public String getCategories() { return categories; }
    public void setCategories(String categories) { this.categories = categories; }

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }

    public double getSeverity() { return severity; }
    public void setSeverity(double severity) { this.severity = severity; }
}

package com.riskradar.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "company_scores")
public class CompanyScoreEntity {

    @Id
    private String ticker;

    @Column(nullable = false)
    private String companyName;

    @Column(nullable = false)
    private String sector;

    @Column(nullable = false)
    private double score;

    @Column(nullable = false)
    private String trend;

    private Instant lastUpdated;

    public CompanyScoreEntity() {}

    public CompanyScoreEntity(String ticker, String companyName, String sector, double score, String trend, Instant lastUpdated) {
        this.ticker = ticker;
        this.companyName = companyName;
        this.sector = sector;
        this.score = score;
        this.trend = trend;
        this.lastUpdated = lastUpdated;
    }

    public String getTicker() { return ticker; }
    public void setTicker(String ticker) { this.ticker = ticker; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getSector() { return sector; }
    public void setSector(String sector) { this.sector = sector; }

    public double getScore() { return score; }
    public void setScore(double score) { this.score = score; }

    public String getTrend() { return trend; }
    public void setTrend(String trend) { this.trend = trend; }

    public Instant getLastUpdated() { return lastUpdated; }
    public void setLastUpdated(Instant lastUpdated) { this.lastUpdated = lastUpdated; }
}

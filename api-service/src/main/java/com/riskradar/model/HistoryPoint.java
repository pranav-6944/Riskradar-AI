package com.riskradar.model;

public class HistoryPoint {
    private String time;
    private double score;

    public HistoryPoint() {}

    public HistoryPoint(String time, double score) {
        this.time = time;
        this.score = score;
    }

    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }

    public double getScore() { return score; }
    public void setScore(double score) { this.score = score; }
}

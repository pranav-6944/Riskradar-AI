package com.riskradar.repository;

import com.riskradar.entity.CompanyScoreEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompanyScoreRepository extends JpaRepository<CompanyScoreEntity, String> {
    Optional<CompanyScoreEntity> findByTickerIgnoreCase(String ticker);
}

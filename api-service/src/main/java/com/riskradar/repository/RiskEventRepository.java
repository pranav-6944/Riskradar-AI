package com.riskradar.repository;

import com.riskradar.entity.RiskEventEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RiskEventRepository extends JpaRepository<RiskEventEntity, String> {
    List<RiskEventEntity> findByCompanyOrderByTimestampDesc(String company);
    List<RiskEventEntity> findTop50ByOrderByTimestampDesc();
}

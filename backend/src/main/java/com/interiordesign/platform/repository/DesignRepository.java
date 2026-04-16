package com.interiordesign.platform.repository;

import com.interiordesign.platform.entity.Design;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DesignRepository extends JpaRepository<Design, Long> {
    List<Design> findByUserId(Long userId);
}
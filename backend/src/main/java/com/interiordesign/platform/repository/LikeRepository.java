package com.interiordesign.platform.repository;

import com.interiordesign.platform.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {

    Optional<Like> findByUserIdAndDesignId(Long userId, Long designId);

    long countByDesignId(Long designId);
}

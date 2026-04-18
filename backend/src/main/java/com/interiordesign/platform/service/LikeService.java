package com.interiordesign.platform.service;

import com.interiordesign.platform.entity.Like;
import com.interiordesign.platform.repository.LikeRepository;
import org.springframework.stereotype.Service;

@Service
public class LikeService {

    private final LikeRepository likeRepository;

    public LikeService(LikeRepository likeRepository) {
        this.likeRepository = likeRepository;
    }

    public void toggleLike(Long userId, Long designId) {
        var existing = likeRepository.findByUserIdAndDesignId(userId, designId);

        if (existing.isPresent()) {
            likeRepository.delete(existing.get());
        } else {
            likeRepository.save(new Like(userId, designId));
        }
    }

    public long getLikeCount(Long designId) {
        return likeRepository.countByDesignId(designId);
    }
}

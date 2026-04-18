package com.interiordesign.platform.controller;

import com.interiordesign.platform.service.LikeService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/likes")
@CrossOrigin(origins = "*")
public class LikeController {

    private final LikeService likeService;

    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    @PostMapping("/{designId}/{userId}")
    public void toggleLike(@PathVariable Long designId, @PathVariable Long userId) {
        likeService.toggleLike(userId, designId);
    }

    @GetMapping("/{designId}")
    public long getLikes(@PathVariable Long designId) {
        return likeService.getLikeCount(designId);
    }
}

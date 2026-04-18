package com.interiordesign.platform.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "likes")
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private Long designId;

    public Like() {}

    public Like(Long userId, Long designId) {
        this.userId = userId;
        this.designId = designId;
    }

    public Long getId() { return id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getDesignId() { return designId; }
    public void setDesignId(Long designId) { this.designId = designId; }
}

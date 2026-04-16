package com.interiordesign.platform.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "designs")
public class Design {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is required")
    @Size(min = 2, max = 150, message = "Title must be between 2 and 150 characters")
    @Column(nullable = false)
    private String title;

    @NotBlank(message = "Description is required")
    @Size(min = 5, max = 1000, message = "Description must be between 5 and 1000 characters")
    @Column(nullable = false, length = 1000)
    private String description;

    @NotBlank(message = "Category is required")
    @Size(min = 2, max = 100, message = "Category must be between 2 and 100 characters")
    @Column(nullable = false)
    private String category;

    @NotBlank(message = "Image path is required")
    @Column(nullable = false)
    private String imagePath;

    @NotNull(message = "User ID is required")
    @Column(nullable = false)
    private Long userId;

    public Design() {
    }

    public Design(Long id, String title, String description, String category, String imagePath, Long userId) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.imagePath = imagePath;
        this.userId = userId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public @NotBlank(message = "Title is required") @Size(min = 2, max = 150, message = "Title must be between 2 and 150 characters") String getTitle() {
        return title;
    }

    public void setTitle(@NotBlank(message = "Title is required") @Size(min = 2, max = 150, message = "Title must be between 2 and 150 characters") String title) {
        this.title = title;
    }

    public @NotBlank(message = "Description is required") @Size(min = 5, max = 1000, message = "Description must be between 5 and 1000 characters") String getDescription() {
        return description;
    }

    public void setDescription(@NotBlank(message = "Description is required") @Size(min = 5, max = 1000, message = "Description must be between 5 and 1000 characters") String description) {
        this.description = description;
    }

    public @NotBlank(message = "Category is required") @Size(min = 2, max = 100, message = "Category must be between 2 and 100 characters") String getCategory() {
        return category;
    }

    public void setCategory(@NotBlank(message = "Category is required") @Size(min = 2, max = 100, message = "Category must be between 2 and 100 characters") String category) {
        this.category = category;
    }

    public @NotBlank(message = "Image path is required") String getImagePath() {
        return imagePath;
    }

    public void setImagePath(@NotBlank(message = "Image path is required") String imagePath) {
        this.imagePath = imagePath;
    }

    public @NotNull(message = "User ID is required") Long getUserId() {
        return userId;
    }

    public void setUserId(@NotNull(message = "User ID is required") Long userId) {
        this.userId = userId;
    }
}
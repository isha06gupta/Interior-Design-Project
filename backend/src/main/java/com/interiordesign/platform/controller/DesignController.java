package com.interiordesign.platform.controller;

import com.interiordesign.platform.entity.Design;
import com.interiordesign.platform.service.DesignService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/designs")
@CrossOrigin(origins = "*")
public class DesignController {

    private final DesignService designService;
    private final Path uploadDir = Paths.get("uploads");

    public DesignController(DesignService designService) {
        this.designService = designService;
    }

    @GetMapping("/public")
    public ResponseEntity<List<Design>> getPublicDesigns() {
        return ResponseEntity.ok(designService.getPublicDesigns());
    }

    @GetMapping
    public ResponseEntity<List<Design>> getAllDesigns(@RequestParam Long userId) {
        return ResponseEntity.ok(designService.getAllDesigns(userId));
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<Design> createDesign(
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam String category,
            @RequestParam Long userId,
            @RequestParam("image") MultipartFile image
    ) throws IOException {
        if (image.isEmpty()) {
            throw new IllegalArgumentException("Image file is required");
        }

        Files.createDirectories(uploadDir);

        String originalName = StringUtils.cleanPath(image.getOriginalFilename());
        String fileName = UUID.randomUUID() + "_" + originalName;
        Path targetPath = uploadDir.resolve(fileName);

        Files.copy(image.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

        Design design = new Design();
        design.setTitle(title);
        design.setDescription(description);
        design.setCategory(category);
        design.setUserId(userId);
        design.setImagePath(fileName);

        return new ResponseEntity<>(designService.createDesign(design), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Design> updateDesign(@PathVariable Long id, @Valid @RequestBody Design design) {
        return ResponseEntity.ok(designService.updateDesign(id, design));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDesign(@PathVariable Long id) {
        designService.deleteDesign(id);
        return ResponseEntity.noContent().build();
    }
}
package com.interiordesign.platform.service.impl;

import com.interiordesign.platform.entity.Design;
import com.interiordesign.platform.exception.ResourceNotFoundException;
import com.interiordesign.platform.repository.DesignRepository;
import com.interiordesign.platform.service.DesignService;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class DesignServiceImpl implements DesignService {

    private final DesignRepository designRepository;

    public DesignServiceImpl(DesignRepository designRepository) {
        this.designRepository = designRepository;
    }

    @Override
    public List<Design> getPublicDesigns() {
        return designRepository.findAll();
    }

    @Override
    public List<Design> getAllDesigns(Long userId) {
        return designRepository.findByUserId(userId);
    }

    @Override
    public Design createDesign(Design design) {
        return designRepository.save(design);
    }

    @Override
    public Design updateDesign(Long id, Design design) {
        Design existing = designRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Design not found with id: " + id));

        existing.setTitle(design.getTitle());
        existing.setDescription(design.getDescription());
        existing.setCategory(design.getCategory());
        existing.setImagePath(design.getImagePath());
        existing.setUserId(design.getUserId());

        return designRepository.save(existing);
    }

    @Override
    public void deleteDesign(Long id) {
        Design existing = designRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Design not found with id: " + id));

        Path imagePath = Paths.get("uploads", existing.getImagePath());
        try {
            Files.deleteIfExists(imagePath);
        } catch (IOException ignored) {
        }

        designRepository.delete(existing);
    }
}
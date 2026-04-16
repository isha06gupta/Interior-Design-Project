package com.interiordesign.platform.service;

import com.interiordesign.platform.entity.Design;

import java.util.List;

public interface DesignService {
    List<Design> getAllDesigns(Long userId);
    Design createDesign(Design design);
    Design updateDesign(Long id, Design design);
    void deleteDesign(Long id);
}
package com.example.backend.controller;

import com.example.backend.model.Photo;
import com.example.backend.model.PhotoDTO;
import com.example.backend.service.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/photos")
public class PhotoController {

    private final PhotoService service;

    @Autowired
    public PhotoController(PhotoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Photo> getAllPhotos() {
        return service.getAllPhotos();
    }
    @PostMapping
    public Photo addNewPhoto(@RequestBody PhotoDTO photoWithoutId) {
    return service.addNewPhoto(photoWithoutId);
    }
}

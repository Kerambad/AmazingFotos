package com.example.backend.service;

import com.example.backend.model.Photo;
import com.example.backend.repository.PhotoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhotoService {
    private final PhotoRepo repo;

    @Autowired
    public PhotoService(PhotoRepo repo) {
        this.repo = repo;
    }

    public List<Photo> getAllPhotos() {
        return repo.findAll();
    }
}

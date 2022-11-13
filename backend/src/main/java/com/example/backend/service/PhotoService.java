package com.example.backend.service;

import com.example.backend.model.Photo;
import com.example.backend.model.PhotoDTO;
import com.example.backend.repository.PhotoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhotoService {
    private final PhotoRepo repo;
    private final IdService idService;

    @Autowired
    public PhotoService(PhotoRepo repo, IdService idService) {
        this.repo = repo;
        this.idService = idService;
    }

    public List<Photo> getAllPhotos() {
        return repo.findAll();
    }

    public Photo addNewPhoto(PhotoDTO photoWithoutId) {
        Photo newPhotoWithId = new Photo(
                idService.createRandomId(),
                photoWithoutId.getSource(),
                photoWithoutId.getName(),
                photoWithoutId.getTags()
        );
        return repo.save(newPhotoWithId);
    }
}

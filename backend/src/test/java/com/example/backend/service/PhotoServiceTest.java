package com.example.backend.service;

import com.example.backend.model.Photo;
import com.example.backend.model.PhotoDTO;
import com.example.backend.repository.PhotoRepo;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class PhotoServiceTest {

    private final PhotoRepo testRepo = mock(PhotoRepo.class);
    private final IdService testIdService = mock(IdService.class);
    private final PhotoService testService = new PhotoService(testRepo, testIdService);


    Photo testPhoto1 = new Photo("1", "2", "3", new String[]{"1", "2"});
    PhotoDTO testPhotoDTO = new PhotoDTO("2", "3", new String[]{"1", "2"});
    Photo testPhoto2 = new Photo("11", "12", "13", new String[]{"11", "12"});
    Photo testPhoto1Expected = new Photo("1", "2", "3", new String[]{"1", "2"});
    Photo testPhoto2Expected = new Photo("11", "12", "13", new String[]{"11", "12"});

    @Test
    void getCompleteHistory_ShouldReturnListOfPhotos() {
        //GIVEN
        when(testRepo.findAll()).thenReturn(List.of(testPhoto1, testPhoto2));
        //WHEN
        List<Photo> actual = testService.getAllPhotos();
        //THEN
        List<Photo> expected = List.of(testPhoto1Expected,
                testPhoto2Expected);
        assertEquals(expected, actual);
    }

    @Test
    void addNewPhoto_ShouldReturnSuccessfullyAddedPhoto() {
        //GIVEN
        when(testRepo.save(testPhoto1)).thenReturn(testPhoto1);
        when(testIdService.createRandomId()).thenReturn("1");
        //WHEN
        Photo actual = testService.addNewPhoto(testPhotoDTO);
        //THEN
        assertEquals(testPhoto1Expected, actual);
    }
}
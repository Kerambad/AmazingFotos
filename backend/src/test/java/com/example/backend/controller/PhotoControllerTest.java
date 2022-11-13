package com.example.backend.controller;

import com.example.backend.model.Photo;
import com.example.backend.repository.PhotoRepo;
import com.example.backend.service.IdService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class VideoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private PhotoRepo testRepo;

    @MockBean
    private IdService testIdService;

    private final Photo testPhoto1 = new Photo("1", "2", "3", new String[]{"1", "2"});
    private final Photo testPhoto2 = new Photo("11", "12", "13", new String[]{"11", "12"});


    String validTestDTOJSON = """ 
                {
                "source": "test",
                "name": "test123",
                "tags": ["tag1","tag2"]
                }
                """;

    String expectedJson = """
                {
                "photoId": "1",
                "source": "test",
                "name": "test123",
                "tags": ["tag1","tag2"]
                }
                """;
    @Test
    @DirtiesContext
    void getAllPhotos_ShouldReturnListOfAllPhotos() throws Exception {
        //GIVEN
        testRepo.saveAll(List.of(testPhoto1, testPhoto2));
        String expectedJson = """
                [
                {
                "photoId":"1",
                "source": "2",
                "name": "3",
                "tags": ["1","2"]
                },
                {
                "photoId":"11",
                "source": "12",
                "name": "13",
                "tags": ["11","12"]
                }
                ]
                """;
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/photos"))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedJson));
        //THEN

    }
    @Test
    @DirtiesContext
    void addNewPhoto_shouldReturnSuccessfullyAddedPhoto() throws Exception {
        //GIVEN
        content().json(validTestDTOJSON);
        when(testIdService.createRandomId()).thenReturn("1");
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.post("/api/photos")
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                        .content(validTestDTOJSON))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedJson));
        //THEN

    }
}
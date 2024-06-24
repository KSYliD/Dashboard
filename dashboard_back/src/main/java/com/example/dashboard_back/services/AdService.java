package com.example.dashboard_back.services;


import com.example.dashboard_back.entities.Ad;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class AdService {

    public List<Ad> getAllAds() {
        return Arrays.asList(
                new Ad("Ad1", 100),
                new Ad("Ad2", 200),
                new Ad("Ad3", 150)
        );
    }
}
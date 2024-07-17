package com.qima.QimaStore.dtos;

import com.qima.QimaStore.entities.Category;
import jakarta.persistence.*;

import java.util.List;

public record ProductDTO(Long id, String name, String description, Double price, Boolean available,
                         CategoryAndSubCategoryDTO categoryChain) {}


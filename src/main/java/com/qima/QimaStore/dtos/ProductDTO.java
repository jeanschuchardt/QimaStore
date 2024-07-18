package com.qima.QimaStore.dtos;

public record ProductDTO(Long id, String name, String description, Double price, Boolean available,
                         CategoryAndSubCategoryDTO categoryChain) {}


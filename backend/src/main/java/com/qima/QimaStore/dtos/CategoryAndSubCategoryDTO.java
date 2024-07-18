package com.qima.QimaStore.dtos;

import java.util.List;

public record CategoryAndSubCategoryDTO(Long id, String name, List<CategoryAndSubCategoryDTO> subcategories) {}


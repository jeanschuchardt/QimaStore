package com.qima.QimaStore.services;

import com.qima.QimaStore.dtos.CategoryAndSubCategoryDTO;
import com.qima.QimaStore.dtos.CategoryDTO;
import com.qima.QimaStore.entities.Category;
import com.qima.QimaStore.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;


    public List<CategoryDTO> getAllCategories() {
        List<Category> allCategories = categoryRepository.findAll();
        List<CategoryDTO> list = allCategories.stream().map(category -> new CategoryDTO(category.getId(), category.getName())).toList();
        return list;
    }

    public CategoryAndSubCategoryDTO getCategoryChain(Long categoryId) {
        Category category = categoryRepository.findById(categoryId).orElse(null);

        if (category != null) {
            if (category.getParent() != null) {
                return new CategoryAndSubCategoryDTO(category.getId(), category.getName(), List.of(getCategoryChain(category.getParent().getId())));
            }else{
                return new CategoryAndSubCategoryDTO(category.getId(), category.getName(), new ArrayList<>());
            }
        }
        throw new RuntimeException("Category not found");
    }


}

package com.qima.QimaStore.services;

import com.qima.QimaStore.dtos.CategoryAndSubCategoryDTO;
import com.qima.QimaStore.dtos.ProductDTO;
import com.qima.QimaStore.entities.Product;
import com.qima.QimaStore.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryService categoryService;


    public ProductDTO getProductById(Long productId) {
        Product product = productRepository.findById(productId).orElse(null);
        CategoryAndSubCategoryDTO categoryChain = categoryService.getCategoryChain(product.getCategoryId());
        return new ProductDTO(product.getId(), product.getName(), product.getDescription(), product.getPrice(), product.getAvailable(), categoryChain);
    }

    public List<ProductDTO> getAllProducts() {
        List<Product> all = productRepository.findAll();
        List<ProductDTO> list = all
                .stream()
                .map(product -> {
                    CategoryAndSubCategoryDTO categoryChain = categoryService.getCategoryChain(product.getCategoryId());

                    return new ProductDTO(product.getId(),
                            product.getName(), product.getDescription(),
                            product.getPrice(),
                            product.getAvailable(),
                            categoryChain);


                })
                .toList();

        return list;
    }
}
